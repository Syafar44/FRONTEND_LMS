import { ToasterContext } from "@/contexts/ToasterContext";
import authServices from "@/services/auth.service";
import competencyServices from "@/services/competency.service";

import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteUserModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteUser = async (id: string) => {
    const res = await authServices.deleteUser(id)
    return res;
  };

  const {
    mutate: mutateDeleteUser,
    isPending: isPendingMutateDeleteUser,
    isSuccess: isSuccessMutateDeleteUser,
  } = useMutation({
    mutationFn: deleteUser,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete User success",
      });
    },
  });

  return {
    mutateDeleteUser,
    isPendingMutateDeleteUser,
    isSuccessMutateDeleteUser,
  };
};

export default useDeleteUserModal;
