import { ToasterContext } from "@/contexts/ToasterContext";
import authServices from "@/services/auth.service";
import { IProfile, IUpdatePasswordByAdmin } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateInfo = yup.object().shape({
  newPassword: yup.string().required("Please input title"),
});

const usePasswordTab = () => {
  const { query } = useRouter()
  const { setToaster } = useContext(ToasterContext);

  const {
      control: controlUpdateInfo,
      handleSubmit: handleSubmitUpdateInfo,
      formState: { errors: errorsUpdateInfo },
      reset: resetUpdateInfo,
      setValue: setValueUpdateInfo,
    } = useForm({
      resolver: yupResolver(schemaUpdateInfo),
    });

  const updatePassword = async (payload: IUpdatePasswordByAdmin) => {
    const res = await authServices.updatePasswordByAdmin(`${query.id}`, payload)
  }

  const {
    mutate: mutateUpdateUser,
    isPending: isPendingMutateUpdateUser,
    isSuccess: isSuccessMutateUpdateUser,
  } = useMutation({
    mutationFn: (payload: IUpdatePasswordByAdmin) => updatePassword(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success update User",
      });
    },
  });

  const handleUpdateUser = (data: IUpdatePasswordByAdmin) => {
    const payload = {
      ...data,
    }
    mutateUpdateUser(payload)
  };

  return {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
    handleUpdateUser,
    isPendingMutateUpdateUser,
    isSuccessMutateUpdateUser,
  };
};

export default usePasswordTab;
