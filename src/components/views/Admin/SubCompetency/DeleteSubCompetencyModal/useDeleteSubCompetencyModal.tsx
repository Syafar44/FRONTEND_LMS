import { ToasterContext } from "@/contexts/ToasterContext";
import subCompetencyServices from "@/services/subCompetency.service";

import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteSubCompetencyModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteSubCompetency = async (id: string) => {
    const res = await subCompetencyServices.deleteSubCompetency(id)
    return res;
  };

  const {
    mutate: mutateDeleteSubCompetency,
    isPending: isPendingMutateDeleteSubCompetency,
    isSuccess: isSuccessMutateDeleteSubCompetency,
  } = useMutation({
    mutationFn: deleteSubCompetency,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete Sub Competency success",
      });
    },
  });

  return {
    mutateDeleteSubCompetency,
    isPendingMutateDeleteSubCompetency,
    isSuccessMutateDeleteSubCompetency,
  };
};

export default useDeleteSubCompetencyModal;
