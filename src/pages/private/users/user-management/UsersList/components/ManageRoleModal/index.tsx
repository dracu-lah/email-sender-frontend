import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import ComboboxFormField from "@/components/FormElements/ComboboxFormField";
import { AssignUserAPI, GetRolesAPI } from "@/services/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import showErrorAlert from "@/utils/functions/showErrorAlert";
import { useEffect } from "react";

// Define the validation schema
const FormSchema = z.object({
  role: z.string().nonempty({ message: "Please select a role." }),
});

const ManageRoleModal = ({ userName, roleName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const rolesQuery = useQuery({
    queryKey: ["GetRolesAPI"],
    queryFn: GetRolesAPI,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  const roles =
    rolesQuery.data?.data?.map((role) => ({
      label: role.roleName,
      value: role.roleName,
    })) || [];
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    form.setValue("role", roleName);
  }, []);
  const { control, handleSubmit } = form;

  const mutation = useMutation({
    mutationFn: AssignUserAPI,
    onSuccess: () => {
      setIsOpen(false);
      toast.success("User assigned successfully");
      form.reset();
    },
    onError: ({ response }) => {
      showErrorAlert(response.data);
    },
  });
  const handleSave = (data) => {
    mutation.mutate({ roleName: data.role, userName });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gray-500 text-white hover:bg-gray-600">
          Update Role
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Update User Role
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(handleSave)}>
            <div className="mt-4">
              <ComboboxFormField
                required
                disabled={false}
                name="role"
                placeholder="Select a Role"
                label="User Role"
                items={roles}
                control={control}
                className="w-full"
                description="Select the role that will be assigned to the user."
              />
            </div>
            <DialogFooter className="mt-4 flex justify-between">
              <DialogClose asChild>
                <Button className="w-1/2" type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button className="w-1/2" type="submit">
                Save Role
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ManageRoleModal;
