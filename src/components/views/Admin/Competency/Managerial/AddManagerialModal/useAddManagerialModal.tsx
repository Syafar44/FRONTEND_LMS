import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import competencyServices from "@/services/competency.service";
import { ICompetency } from "@/types/Competency";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  main_competency: yup.string(),
  title: yup.string().required("Please input title"),
  description: yup.string().required("Please input description"),
  access: yup.array().of(yup.string()).required("Please select access"),
  image: yup.mixed<FileList | string>().required("Please input image"),
});

const useAddManagerialModal = () => {
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

  const addManagerial = async (payload: ICompetency) => {
    const res = await competencyServices.addCompetency({
      ...payload,
      main_competency: "managerial",
      access
    })
    return res;
  };

  const {
    mutate: mutateAddManagerial,
    isPending: isPendingMutateAddManagerial,
    isSuccess: isSuccessMutateAddManagerial,
  } = useMutation({
    mutationFn: addManagerial,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add Managerial",
      });
      reset();
    },
  });

  const handleAddManagerial = (data: ICompetency) => mutateAddManagerial(data);

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddManagerial,
    isPendingMutateAddManagerial,
    isSuccessMutateAddManagerial,

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

export default useAddManagerialModal;
