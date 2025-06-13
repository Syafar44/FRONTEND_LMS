import { ToasterContext } from "@/contexts/ToasterContext";
import kuisCompetencyServices from "@/services/kuisCompetency.service";

import { IKuisCompetency } from "@/types/Competency";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  bySubCompetency: yup.string(),
  question: yup.string().required("Please input question"),
  option1: yup.string().required("Please input option1"),
  option2: yup.string().required("Please input option2"),
  option3: yup.string().required("Please input option3"),
  option4: yup.string().required("Please input option4"),
  optionValid: yup.string().required("Please input optionValid"),
});

const useAddCoreModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const router = useRouter();
  const { id } = router.query;

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addCore = async (payload: IKuisCompetency) => {
    const res = await kuisCompetencyServices.addKuisCompetency({
      ...payload,
    })
    return res;
  };

  const {
    mutate: mutateAddCore,
    isPending: isPendingMutateAddCore,
    isSuccess: isSuccessMutateAddCore,
  } = useMutation({
    mutationFn: addCore,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add Core",
      });
      reset();
    },
  });

  const handleAddCore = (data: IKuisCompetency) => {
    const payload = {
      ...data, 
      bySubCompetency: `${id}`,
      optionValid: Number(data.optionValid)
    }
    mutateAddCore(payload)
  };

  console.log(errors)

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddCore,
    isPendingMutateAddCore,
    isSuccessMutateAddCore,
  };
};

export default useAddCoreModal;
