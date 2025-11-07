import { ToasterContext } from "@/contexts/ToasterContext";
import sopServices from "@/services/sop.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteSopModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteSop = async (id: string) => {
    const res = await sopServices.deleteSop(id)
    return res;
  };

  const {
    mutate: mutateDeleteSop,
    isPending: isPendingMutateDeleteSop,
    isSuccess: isSuccessMutateDeleteSop,
  } = useMutation({
    mutationFn: deleteSop,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete Sop success",
      });
    },
  });

  return {
    mutateDeleteSop,
    isPendingMutateDeleteSop,
    isSuccessMutateDeleteSop,
  };
};

export default useDeleteSopModal;
