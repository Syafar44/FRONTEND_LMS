import { ToasterContext } from "@/contexts/ToasterContext";
import kuisCompetencyServices from "@/services/kuisCompetency.service";
import subCompetencyServices from "@/services/subCompetency.service";

import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteCoreModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteCore = async (id: string) => {
    const res = await kuisCompetencyServices.deleteKuisCompetency(id)
    return res;
  };

  const {
    mutate: mutateDeleteCore,
    isPending: isPendingMutateDeleteCore,
    isSuccess: isSuccessMutateDeleteCore,
  } = useMutation({
    mutationFn: deleteCore,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete Core success",
      });
    },
  });

  return {
    mutateDeleteCore,
    isPendingMutateDeleteCore,
    isSuccessMutateDeleteCore,
  };
};

export default useDeleteCoreModal;
