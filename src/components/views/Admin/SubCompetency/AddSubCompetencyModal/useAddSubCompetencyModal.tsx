import { ToasterContext } from "@/contexts/ToasterContext";
import subCompetencyServices from "@/services/subCompetency.service";
import { ISubCompetency } from "@/types/Competency";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  byCompetency: yup.string(),
  title: yup.string().required("Please input title"),
  description: yup.string().required("Please input description"),
  video: yup.string(),
});

const useAddSubCompetencyModal = (competencyId: string) => {
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const extractYouTubeId = (url: string): string | null => {
    const match = url.match(
      /(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([^&#?/]+)/,
    );
    return match ? match[1] : null;
  };

  const addSubCompetency = async (payload: ISubCompetency) => {
    const res = await subCompetencyServices.addSubCompetency({
      ...payload,
    })
    return res;
  };

  const {
    mutate: mutateAddSubCompetency,
    isPending: isPendingMutateAddSubCompetency,
    isSuccess: isSuccessMutateAddSubCompetency,
  } = useMutation({
    mutationFn: addSubCompetency,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add SubCompetency",
      });
      reset();
    },
  });

  const handleAddSubCompetency = (data: ISubCompetency) => {
    const videoId = extractYouTubeId(`${data.video}`);

    const payload = {
      ...data, 
      video: `${videoId}`,
      byCompetency: competencyId,
    }
    mutateAddSubCompetency(payload)
  };

  console.log(errors)

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddSubCompetency,
    isPendingMutateAddSubCompetency,
    isSuccessMutateAddSubCompetency,
  };
};

export default useAddSubCompetencyModal;
