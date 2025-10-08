"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import RemoveUserModal from "./components/RemoveUserModal";
import BasicFormField from "@/components/FormElements/BasicFormField";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { UpdateUserPasswordAPI } from "@/services/api";
import showErrorAlert from "@/utils/functions/showErrorAlert";
import { toast } from "sonner";

// Zod validation schema
const schema = z
  .object({
    username: z.string(),
    password: z.string().min(4, "Password must be at least 4 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ManageUserModal = ({ userName, id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const formMethods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: userName,
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: UpdateUserPasswordAPI,
    onSuccess: (data) => {
      toast.success("Updated!");
      setIsOpen(false);
    },
    onError: ({ response }) => {
      showErrorAlert(response.data);
    },
  });
  const onSubmit = (data) => {
    mutation.mutate({ NewPassword: data.password, userID: id });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gray-500 text-white hover:bg-gray-600">
          Update password
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Update password
          </DialogTitle>
          <FormProvider {...formMethods}>
            <form
              onSubmit={formMethods.handleSubmit(onSubmit)}
              className="grid items-center gap-2 space-y-2"
            >
              <BasicFormField
                name="username"
                label=" Username"
                placeholder="Enter new username"
                disabled
              />
              <BasicFormField
                name="password"
                label="Change Password"
                type="password"
                placeholder="Enter your password"
                required
              />
              <BasicFormField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Re-enter password"
                required
              />
              {/* <RemoveUserModal /> */}
              <Button type="submit" className="mt-2">
                Save Changes
              </Button>
            </form>
          </FormProvider>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ManageUserModal;
