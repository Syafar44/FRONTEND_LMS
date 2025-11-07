import { ToasterContext } from "@/contexts/ToasterContext";
import ikServices from "@/services/ik.service";

import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteItModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteIk = async (id: string) => {
    const res = await ikServices.deleteIk(id)
    return res;
  };

  const {
    mutate: mutateDeleteIk,
    isPending: isPendingMutateDeleteIk,
    isSuccess: isSuccessMutateDeleteIk,
  } = useMutation({
    mutationFn: deleteIk,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete Ik success",
      });
    },
  });

  return {
    mutateDeleteIk,
    isPendingMutateDeleteIk,
    isSuccessMutateDeleteIk,
  };
};

export default useDeleteItModal;
