import { ToasterContext } from "@/contexts/ToasterContext";
import competencyServices from "@/services/competency.service";
import kajianServices from "@/services/kajian.service";

import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteKajianModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteKajian = async (id: string) => {
    const res = await kajianServices.deleteKajian(id)
    return res;
  };

  const {
    mutate: mutateDeleteKajian,
    isPending: isPendingMutateDeleteKajian,
    isSuccess: isSuccessMutateDeleteKajian,
  } = useMutation({
    mutationFn: deleteKajian,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete Kajian success",
      });
    },
  });

  return {
    mutateDeleteKajian,
    isPendingMutateDeleteKajian,
    isSuccessMutateDeleteKajian,
  };
};

export default useDeleteKajianModal;
