import { ToasterContext } from "@/contexts/ToasterContext";
import competencyServices from "@/services/competency.service";

import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteManagerialModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteManagerial = async (id: string) => {
    const res = await competencyServices.deleteCompetency(id)
    return res;
  };

  const {
    mutate: mutateDeleteManagerial,
    isPending: isPendingMutateDeleteManagerial,
    isSuccess: isSuccessMutateDeleteManagerial,
  } = useMutation({
    mutationFn: deleteManagerial,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete Managerial success",
      });
    },
  });

  return {
    mutateDeleteManagerial,
    isPendingMutateDeleteManagerial,
    isSuccessMutateDeleteManagerial,
  };
};

export default useDeleteManagerialModal;
