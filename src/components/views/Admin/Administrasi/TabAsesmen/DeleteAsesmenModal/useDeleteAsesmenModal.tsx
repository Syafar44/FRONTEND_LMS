import { ToasterContext } from "@/contexts/ToasterContext";
import asesmenServices from "@/services/asesmen.service";

import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteAsesmenModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteAsesmen = async (id: string) => {
    const res = await asesmenServices.deleteAsesmen(id)
    return res;
  };

  const {
    mutate: mutateDeleteAsesmen,
    isPending: isPendingMutateDeleteAsesmen,
    isSuccess: isSuccessMutateDeleteAsesmen,
  } = useMutation({
    mutationFn: deleteAsesmen,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete Asesmen success",
      });
    },
  });

  return {
    mutateDeleteAsesmen,
    isPendingMutateDeleteAsesmen,
    isSuccessMutateDeleteAsesmen,
  };
};

export default useDeleteAsesmenModal;
