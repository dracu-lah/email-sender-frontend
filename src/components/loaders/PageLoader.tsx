import { Loader } from "lucide-react";

const PageLoader = ({ size = "14" }) => {
  return (
    <div className="flex w-full items-center justify-center">
      <Loader className={`text-primary size-${size} animate-spin`} />
    </div>
  );
};

export default PageLoader;
