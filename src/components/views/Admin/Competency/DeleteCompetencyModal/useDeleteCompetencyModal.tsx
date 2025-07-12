import { ToasterContext } from "@/contexts/ToasterContext";
import competencyServices from "@/services/competency.service";

import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteCompetencyModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteCompetency = async (id: string) => {
    const res = await competencyServices.deleteCompetency(id)
    return res;
  };

  const {
    mutate: mutateDeleteCompetency,
    isPending: isPendingMutateDeleteCompetency,
    isSuccess: isSuccessMutateDeleteCompetency,
  } = useMutation({
    mutationFn: deleteCompetency,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete Competency success",
      });
    },
  });

  return {
    mutateDeleteCompetency,
    isPendingMutateDeleteCompetency,
    isSuccessMutateDeleteCompetency,
  };
};

export default useDeleteCompetencyModal;
