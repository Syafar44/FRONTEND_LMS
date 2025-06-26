import { ToasterContext } from "@/contexts/ToasterContext";
import authServices from "@/services/auth.service";
import { IProfile } from "@/types/Auth";


import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const usePasswordTab = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getUserById = async () => {
    const { data } = await authServices.getUserById(`${query.id}`);
    return data.data;
  };

  const { data: dataUser, refetch: refetchUser } = useQuery({
    queryKey: ["User"],
    queryFn: getUserById,
    enabled: isReady,
  });

  const updateUser = async (payload: IProfile) => {
    const { data } = await authServices.updateUser(
      `${query.id}`,
      payload,
    );
    return data.data;
  };

  const {
    mutate: mutateUpdateUser,
    isPending: isPendingMutateUpdateUser,
    isSuccess: isSuccessMutateUpdateUser,
  } = useMutation({
    mutationFn: (payload: IProfile) => updateUser(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchUser();
      setToaster({
        type: "success",
        message: "Success update User",
      });
    },
  });

  const handleUpdateUser = (data: IProfile) => {
    const payload = {
      ...data,
    }
    mutateUpdateUser(payload)
  };

  return {
    dataUser,
    handleUpdateUser,
    isPendingMutateUpdateUser,
    isSuccessMutateUpdateUser,
    refetchUser,
  };
};

export default usePasswordTab;
