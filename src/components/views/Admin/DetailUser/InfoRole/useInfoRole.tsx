import { ToasterContext } from "@/contexts/ToasterContext";
import authServices from "@/services/auth.service";
import { IProfile } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  role: yup.string().required("Please input role"),
});

const useInfoRole = (refetchUser: () => void) => {
  const { query } = useRouter()
  const { setToaster } = useContext(ToasterContext);

  const {
    control: control,
    handleSubmit: handleSubmit,
    formState: { errors: errors },
    reset: reset,
    setValue: setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const updateRole = async(payload: IProfile) => {
    const res = await authServices.updateRole(`${query?.id}`, payload)
  }

  const {
      mutate: mutateUpdate,
      isPending: isPendingMutateUpdate,
      isSuccess: isSuccessMutateUpdate,
    } = useMutation({
      mutationFn: (payload: IProfile) => updateRole(payload),
      onError: (error) => {
        setToaster({
          type: "error",
          message: error.message,
        });
      },
      onSuccess: () => {
        refetchUser()
        setToaster({
          type: "success",
          message: "Success update Role",
        });
      },
    });

  const handleUpdateUser = (data: IProfile) => mutateUpdate(data);

  return {
    control,
    errors,
    handleSubmit,
    reset,
    setValue,
    isPendingMutateUpdate,
    isSuccessMutateUpdate,
    handleUpdateUser,
  };
};

export default useInfoRole;
