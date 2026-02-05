import { ToasterContext } from "@/contexts/ToasterContext";
import partAsesmenServices from "@/services/partAsesmen.service";

import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeletePartAsesmenModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deletePartAsesmen = async (id: string) => {
    const res = await partAsesmenServices.deletePartAsesmen(id)
    return res;
  };

  const {
    mutate: mutateDeletePartAsesmen,
    isPending: isPendingMutateDeletePartAsesmen,
    isSuccess: isSuccessMutateDeletePartAsesmen,
  } = useMutation({
    mutationFn: deletePartAsesmen,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete PartAsesmen success",
      });
    },
  });

  return {
    mutateDeletePartAsesmen,
    isPendingMutateDeletePartAsesmen,
    isSuccessMutateDeletePartAsesmen,
  };
};

export default useDeletePartAsesmenModal;
