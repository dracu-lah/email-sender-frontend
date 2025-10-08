import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateRoleAPI } from "@/services/api";
import { toast } from "sonner";

// Define the validation schema with zod
const schema = z.object({
  roleName: z.string().nonempty("Role name is required"),
});

const CreateRoleDialog = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: CreateRoleAPI,
    onSuccess: (data) => {
      toast.success("Role created successfully:", data);

      queryClient.invalidateQueries({ queryKey: "GetRolesAPI" });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
      console.error("Error creating role:", error);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({ roleName: data.roleName });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Role</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <CardTitle className="flex justify-center">Create New Role</CardTitle>
          <CardDescription className="flex justify-center">
            Define the Role
          </CardDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-4 flex w-full flex-col gap-y-4">
            <div>
              <Label htmlFor="roleName">Role Name</Label>
              <Input id="roleName" type="text" {...register("roleName")} />
              {errors.roleName && <p>{errors.roleName.message}</p>}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="w-1/2" type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button className="w-1/2" type="submit">
              Create Role
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoleDialog;
