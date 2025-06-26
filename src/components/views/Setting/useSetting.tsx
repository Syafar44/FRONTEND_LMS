import { ToasterContext } from "@/contexts/ToasterContext";
import authServices from "@/services/auth.service";
import { IUpdatePassword } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
    currentPassword: yup.string().required("Please input current Password"),
    newPassword: yup.string().required("Please input new password"),
    confirmPassword: yup.string().required("Please input confirm password"),
});

const useSetting = () => {
    const { setToaster } = useContext(ToasterContext);

    const {
        control,
        handleSubmit: handleSubmitForm,
        formState: { errors },
        reset,
      } = useForm({
        resolver: yupResolver(schema),
      });

    const update = async (payload: IUpdatePassword) => {
        const res = await authServices.updatePassword({
        ...payload,
        })
        return res;
    };

    const {
        mutate: mutateUpdate,
        isPending: isPendingMutateUpdate,
    } = useMutation({
        mutationFn: update,
        onError: (error) => {
        setToaster({
            type: "error",
            message: error.message,
        });
        },
        onSuccess: () => {
        setToaster({
            type: "success",
            message: "Success Update",
        });
        reset();
        },
    });

    const handleUpdateCore = (data: IUpdatePassword) => mutateUpdate(data);

    console.log(errors)

    return {
        control,
        errors,
        handleUpdateCore,
        isPendingMutateUpdate,
        handleSubmitForm,
    }
}

export default useSetting