import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateVideo = yup.object().shape({
  video: yup.string().required("Please input link video"),
});

const useVideoTab = () => {

  const {
    control: controlUpdateVideo,
    handleSubmit: handleSubmitUpdateVideo,
    formState: { errors: errorsUpdateVideo },
    reset: resetUpdateVideo,
    getValues: getValuesUpdateVideo,
    setValue: setValueUpdateVideo,
  } = useForm({
    resolver: yupResolver(schemaUpdateVideo),
  });

  return {
    controlUpdateVideo,
    errorsUpdateVideo,
    handleSubmitUpdateVideo,
    resetUpdateVideo,

    getValuesUpdateVideo,
    setValueUpdateVideo,
  };
};

export default useVideoTab;
