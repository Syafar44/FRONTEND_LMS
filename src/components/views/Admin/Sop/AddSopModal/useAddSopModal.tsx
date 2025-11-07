import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import sopServices from "@/services/sop.service";
import { ISop } from "@/types/Sop";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Please input title"),
  description: yup.string().required("Please input description"),
  file: yup.string().required("Please input file"),
  duration: yup.string().required("Please input duration"),
  countdown: yup.string().required("Please input countdown"),
});

const useAddSopModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });


  const addSop = async (payload: ISop) => {
    const res = await sopServices.addSop({
      ...payload,
    })
    return res;
  };

  const {
    mutate: mutateAddSop,
    isPending: isPendingMutateAddSop,
    isSuccess: isSuccessMutateAddSop,
  } = useMutation({
    mutationFn: addSop,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add Sop",
      });
      reset();
    },
  });

  const extractDriveId = (url: string): string | undefined => {
    const match = url.match(/(?:drive\.google\.com\/file\/d\/)([^/]+)/);
    return match ? match[1] : undefined;
  };

  const handleAddSop = (data: ISop) => {
    const payload = {
      ...data,
      file: `https://drive.google.com/uc?export=download&id=${extractDriveId(`${data.file}`)}`,
      duration: String(Number(data.duration) * 60),
      countdown: String(Number(data.countdown) * 60),
    }
    mutateAddSop(payload)
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddSop,
    isPendingMutateAddSop,
    isSuccessMutateAddSop,
  };
};

export default useAddSopModal;
