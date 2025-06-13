import { ToasterContext } from "@/contexts/ToasterContext";
import kuisCompetencyServices from "@/services/kuisCompetency.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteFunctionalModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteFunctional = async (id: string) => {
    const res = await kuisCompetencyServices.deleteKuisCompetency(id)
    return res;
  };

  const {
    mutate: mutateDeleteFunctional,
    isPending: isPendingMutateDeleteFunctional,
    isSuccess: isSuccessMutateDeleteFunctional,
  } = useMutation({
    mutationFn: deleteFunctional,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete Functional success",
      });
    },
  });

  return {
    mutateDeleteFunctional,
    isPendingMutateDeleteFunctional,
    isSuccessMutateDeleteFunctional,
  };
};

export default useDeleteFunctionalModal;
