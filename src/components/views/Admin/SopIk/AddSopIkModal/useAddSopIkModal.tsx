import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import sopIkServices from "@/services/sopIk.service";
import { ISopIk } from "@/types/SopIk";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Please input title"),
  description: yup.string().required("Please input description"),
});

const useAddSopIkModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const router = useRouter();

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


  const addSopIk = async (payload: ISopIk) => {
    const res = await sopIkServices.addSopIk({
      ...payload,
    })
    return res;
  };

  const {
    mutate: mutateAddSopIk,
    isPending: isPendingMutateAddSopIk,
    isSuccess: isSuccessMutateAddSopIk,
  } = useMutation({
    mutationFn: addSopIk,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add SopIk",
      });
      reset();
    },
  });

  const handleAddSopIk = (data: ISopIk) => mutateAddSopIk(data);

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddSopIk,
    isPendingMutateAddSopIk,
    isSuccessMutateAddSopIk,
  };
};

export default useAddSopIkModal;
