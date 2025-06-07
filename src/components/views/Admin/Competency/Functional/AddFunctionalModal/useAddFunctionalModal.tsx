import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import competencyServices from "@/services/competency.service";
import { ICompetency } from "@/types/Competency";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { use, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  main_competency: yup.string(),
  title: yup.string().required("Please input title"),
  description: yup.string().required("Please input description"),
  access: yup.array().of(yup.string()).required("Please select access"),
  image: yup.mixed<FileList | string>().required("Please input image"),
});

const useAddFunctionalModal = () => {
  const { setToaster } = useContext(ToasterContext);
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
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch("image");
  const fileUrl = getValues("image");

  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("image", fileUrl);
      }
    });
  };

  const handleDeleteImage = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const [access, setAccess] = useState<string[]>([])

  const addFunctional = async (payload: ICompetency) => {
    const res = await competencyServices.addCompetency({
      ...payload,
      main_competency: "functional",
      access
    })
    return res;
  };

  const {
    mutate: mutateAddFunctional,
    isPending: isPendingMutateAddFunctional,
    isSuccess: isSuccessMutateAddFunctional,
  } = useMutation({
    mutationFn: addFunctional,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add Functional",
      });
      reset();
    },
  });

  const handleAddFunctional = (data: ICompetency) => mutateAddFunctional(data);

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddFunctional,
    isPendingMutateAddFunctional,
    isSuccessMutateAddFunctional,

    preview,
    handleUploadImage,
    isPendingMutateUploadFile,
    handleDeleteImage,
    isPendingMutateDeleteFile,
    handleOnClose,
    access,
    setAccess,
  };
};

export default useAddFunctionalModal;
