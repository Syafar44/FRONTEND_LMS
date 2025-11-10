import { ToasterContext } from "@/contexts/ToasterContext";
import kuisKajianServices from "@/services/kuisKajian.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteKuisModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteKuis = async (id: string) => {
    const res = await kuisKajianServices.deleteKuisKajian(id)
    return res;
  };

  const {
    mutate: mutateDeleteKuis,
    isPending: isPendingMutateDeleteKuis,
    isSuccess: isSuccessMutateDeleteKuis,
  } = useMutation({
    mutationFn: deleteKuis,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete Kuis success",
      });
    },
  });

  return {
    mutateDeleteKuis,
    isPendingMutateDeleteKuis,
    isSuccessMutateDeleteKuis,
  };
};

export default useDeleteKuisModal;
