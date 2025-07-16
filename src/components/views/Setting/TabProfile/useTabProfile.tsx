import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import authServices from "@/services/auth.service";
import { IProfile, IUpdatePassword } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateImage = yup.object().shape({
  image: yup.mixed<FileList | string>().required("Please input image"),
});

const useTabProfile = () => {
    const { setToaster } = useContext(ToasterContext);
    const router = useRouter();
    const {
        handleUploadFile,
        isPendingMutateUploadFile,
        handleDeleteFile,
        isPendingMutateDeleteFile,
    } = useMediaHandling();

    const {
        control,
        handleSubmit: handleSubmitForm,
        formState: { errors },
        reset,
        watch: watchUpdateImage,
        getValues: getValuesUpdateImage,
        setValue: setValueUpdateImage,
        } = useForm({
            resolver: yupResolver(schemaUpdateImage),
    });

    const preview = watchUpdateImage("image");
    const fileUrl = getValuesUpdateImage("image");

    const handleUploadImage = (
        files: FileList,
        onChange: (files: FileList | undefined) => void,
    ) => {
        handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
        if (fileUrl) {
            setValueUpdateImage("image", fileUrl);
        }
        });
    };

    const handleDeleteImage = (
        onChange: (files: FileList | undefined) => void,
    ) => {
        handleDeleteFile(fileUrl, () => onChange(undefined));
    };

    const update = async (payload: IProfile) => {
        const res = await authServices.updateImage({
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

    const onUpdate = (data: IProfile) => mutateUpdate(data);

    const getProfile = async () => {
        const res = await authServices.getProfile()
        const { data } = res;
        return data.data
    }

    const {
        data: dataProfile,
        isPending: isPendingProfile,
        refetch: refetchProfile,
    } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
        enabled: !!router.isReady,
    });

    return {
        control,
        errors,
        onUpdate,
        isPendingMutateUpdate,
        handleSubmitForm,
        handleDeleteImage,
        handleUploadImage,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,
        preview,
        dataProfile,
        isPendingProfile,
        refetchProfile,
    }
}

export default useTabProfile