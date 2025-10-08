import { Link, useRouteError } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bug,
  FileQuestion,
  HomeIcon,
  Server,
  AlertTriangle,
} from "lucide-react";

const ErrorPage = () => {
  const error = useRouteError();

  // Function to determine error type and details
  const getErrorDetails = () => {
    if (error.status === 404) {
      return {
        title: "404 - Page Not Found",
        description:
          "The page you're looking for doesn't exist or has been moved.",
        icon: FileQuestion,
        color: "text-yellow-600 dark:text-yellow-400",
      };
    } else if (error.status >= 500) {
      return {
        title: `${error.status} - Server Error`,
        description:
          "There was a problem with the server. Please try again later.",
        icon: Server,
        color: "text-red-600 dark:text-red-400",
      };
    } else if (error instanceof Error) {
      return {
        title: "Application Error",
        description: "An unexpected error occurred in the application.",
        icon: Bug,
        color: "text-orange-600 dark:text-orange-400",
      };
    } else {
      return {
        title: "Unexpected Error",
        description: "Something went wrong. Please try again.",
        icon: AlertTriangle,
        color: "text-red-600 dark:text-red-400",
      };
    }
  };

  const errorDetails = getErrorDetails();
  const IconComponent = errorDetails.icon;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <Card className="w-full max-w-2xl dark:border-gray-700 dark:bg-gray-800">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 p-3 dark:bg-gray-700">
            <IconComponent className={`h-8 w-8 ${errorDetails.color}`} />
          </div>
          <CardTitle className="text-2xl font-bold dark:text-white">
            {errorDetails.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="dark:border-gray-600 dark:bg-gray-700">
            <AlertTitle className="dark:text-white">Error Details</AlertTitle>
            <AlertDescription className="dark:text-gray-300">
              {errorDetails.description}
            </AlertDescription>
          </Alert>
          {/* Show technical details for developers if available */}
          {(error.statusText || error.message || error.stack) && (
            <div className="max-h-48 overflow-auto rounded-lg bg-gray-100 p-4 font-mono text-sm dark:bg-gray-700 dark:text-gray-300">
              {error.statusText && (
                <p className="mb-2">Status: {error.statusText}</p>
              )}
              {error.message && (
                <p className="mb-2">Message: {error.message}</p>
              )}
              {error.stack && (
                <details className="cursor-pointer">
                  <summary className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                    Stack Trace
                  </summary>
                  <pre className="mt-2 whitespace-pre-wrap text-xs dark:text-gray-300">
                    {error.stack}
                  </pre>
                </details>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <AlertTriangle className="h-4 w-4" />
            Try Again
          </Button>
          <Button asChild variant="default" className="flex items-center gap-2">
            <Link to="/">
              <HomeIcon className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ErrorPage;
