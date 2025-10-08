import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import showErrorAlert from "@/utils/functions/showErrorAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function DeleteDialog({ id, setModal, api, redirect, invalidate = [] }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: api,
    onSuccess: () => {
      redirect && navigate(redirect);
      setModal && setModal(false);
      toast.success("Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: invalidate });
    },
    onError: ({ response }) => {
      showErrorAlert(response.data);
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-500 duration-300 hover:bg-red-600">
          <TrashIcon className="text-slate-200" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            content.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white duration-300 hover:bg-red-600"
            onClick={() => mutation.mutate({ id })}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
