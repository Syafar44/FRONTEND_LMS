import { ToasterContext } from "@/contexts/ToasterContext";
import partAsesmenServices from "@/services/partAsesmen.service";
import { IPartAsesmen } from "@/types/Asesmen";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Please input title"),
  type: yup.string().required("Please select type"),
});

const useAddPartAsesmenModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const router = useRouter();
  const pathSegments = router.pathname.split('/');

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

  const addPartAsesmen = async (payload: IPartAsesmen) => {
    const res = await partAsesmenServices.addPartAsesmen({
      ...payload,
    })
    return res;
  };

  const {
    mutate: mutateAddPartAsesmen,
    isPending: isPendingMutateAddPartAsesmen,
    isSuccess: isSuccessMutateAddPartAsesmen,
  } = useMutation({
    mutationFn: addPartAsesmen,
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

  const handleAddPartAsesmen = (data: IPartAsesmen) => mutateAddPartAsesmen(data);

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddPartAsesmen,
    isPendingMutateAddPartAsesmen,
    isSuccessMutateAddPartAsesmen,
  };
};

export default useAddPartAsesmenModal;
