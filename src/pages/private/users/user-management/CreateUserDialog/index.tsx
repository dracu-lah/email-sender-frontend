import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import BasicFormField from "@/components/FormElements/BasicFormField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateUserAPI, GetRolesAPI } from "@/services/api";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import ComboboxFormField from "@/components/FormElements/ComboboxFormField";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import showErrorAlert from "@/utils/functions/showErrorAlert";

// Define the validation schema with zod
const formSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    userRole: z.string().min(1, "User role is required"),
    userName: z
      .string()
      .min(1, "Username is required")
      .regex(/^\S*$/, "Username must not contain spaces"),
    email: z.string().regex(/^([A-Z0-9._%+-]+)@([A-Z0-9.-]+\.[A-Z]{2,})$/i, {
      message: "Invalid email address.",
    }),

    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number format"),
    password: z.string().min(4, "Password must be at least 4 characters"),

    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

const defaultValues = {
  firstName: "",
  lastName: "",
  userRole: "",
  userName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

const CreateUserDialog = () => {
  const [open, setOpen] = useState(false);

  const [property, setProperty] = useState(0);
  const [outlet, setOutlet] = useState(0);
  const form = useForm({
    defaultValues,
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  // Fetch user roles
  const rolesQuery = useQuery({
    queryKey: ["GetRolesAPI"],
    queryFn: () => GetRolesAPI(),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  const userRoles =
    rolesQuery.data?.data?.map((role) => ({
      label: role.roleName,
      value: role.roleName,
    })) || [];

  const mutation = useMutation({
    mutationFn: CreateUserAPI,
    onSuccess: () => {
      setProperty(0);
      setOutlet(0);
      setOpen(false);
      toast.success("User created successfully");
      form.reset();
    },
    onError: ({ response }) => {
      showErrorAlert(response.data);
    },
  });

  const onSubmit = (data) => {
    // Remove confirmPassword from the data before sending it to the API
    const { confirmPassword, ...payload } = data;

    mutation.mutate({
      ...payload,
      // outletID: form.watch("userRole") === "OutletManager" ? outlet : null,
      outletID: outlet,
      propertyID: property,
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <CardTitle className="flex justify-center">Create New User</CardTitle>
          <CardDescription className="flex justify-center">
            Fill in the details to create a new user account
          </CardDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <BasicFormField
                name="firstName"
                label="First Name"
                placeholder="John"
                type="text"
              />

              <BasicFormField
                name="lastName"
                label="Last Name"
                placeholder="Doe"
                type="text"
              />
            </div>

            <ComboboxFormField
              className="w-full"
              name="userRole"
              label="User Role"
              placeholder="Select role"
              items={userRoles}
            />

            <BasicFormField
              name="phoneNumber"
              label="Phone Number"
              placeholder="+1234567890"
              type="tel"
            />
            <div className="flex items-center justify-between gap-2">
              <BasicFormField
                name="userName"
                label="Username"
                placeholder="johndoe"
                type="text"
              />

              <BasicFormField
                name="email"
                label="Email"
                placeholder="john.doe@example.com"
                type="email"
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              <BasicFormField
                name="password"
                label="Password"
                placeholder="Enter password"
                type="password"
              />

              <BasicFormField
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
              />
            </div>

            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button className="w-1/2" type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                className="w-1/2"
                type="submit"
                disabled={mutation.isPending || rolesQuery.isLoading}
              >
                {mutation.isPending ? (
                  <LoaderIcon className="size-4 animate-spin" />
                ) : (
                  "Create User"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;
