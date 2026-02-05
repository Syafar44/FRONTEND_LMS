import { ToasterContext } from "@/contexts/ToasterContext";
import asesmenServices from "@/services/asesmen.service";
import { IAsesmen } from "@/types/Asesmen";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Please input title"),
  type: yup.string().required("Please select type"),
  duration: yup.string().required("Please input duration"),
});

const useAddAsesmenModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addAsesmen = async (payload: IAsesmen) => {
    const res = await asesmenServices.addAsesmen({
      ...payload,
    })
    return res;
  };

  const {
    mutate: mutateAddAsesmen,
    isPending: isPendingMutateAddAsesmen,
    isSuccess: isSuccessMutateAddAsesmen,
  } = useMutation({
    mutationFn: addAsesmen,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add Asesmen",
      });
      reset();
    },
  });

  const handleAddAsesmen = (data: IAsesmen) => {
    const payload = {
      ...data,
      duration: String(Number(data.duration) * 60),
    }
    mutateAddAsesmen(payload)
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddAsesmen,
    isPendingMutateAddAsesmen,
    isSuccessMutateAddAsesmen,
  };
};

export default useAddAsesmenModal;
