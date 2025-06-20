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

const useAddCoreModal = (competencyId: string) => {
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

  const addCore = async (payload: ISubCompetency) => {
    const res = await subCompetencyServices.addSubCompetency({
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

  const handleAddCore = (data: ISubCompetency) => {
    const videoId = extractYouTubeId(`${data.video}`);

    const payload = {
      ...data, 
      video: `${videoId}`,
      byCompetency: competencyId,
    }
    mutateAddCore(payload)
  };

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
