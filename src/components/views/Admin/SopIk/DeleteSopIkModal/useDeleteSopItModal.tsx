import { ToasterContext } from "@/contexts/ToasterContext";
import sopIkServices from "@/services/sopIk.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteSopItModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteSopIk = async (id: string) => {
    const res = await sopIkServices.deleteSopIk(id)
    return res;
  };

  const {
    mutate: mutateDeleteSopIk,
    isPending: isPendingMutateDeleteSopIk,
    isSuccess: isSuccessMutateDeleteSopIk,
  } = useMutation({
    mutationFn: deleteSopIk,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete SopIk success",
      });
    },
  });

  return {
    mutateDeleteSopIk,
    isPendingMutateDeleteSopIk,
    isSuccessMutateDeleteSopIk,
  };
};

export default useDeleteSopItModal;
