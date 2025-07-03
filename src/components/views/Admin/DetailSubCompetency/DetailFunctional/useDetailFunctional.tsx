import { ToasterContext } from "@/contexts/ToasterContext";
import subCompetencyServices from "@/services/subCompetency.service";
import { ISubCompetency } from "@/types/Competency";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailFunctional = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getFunctionalById = async () => {
    const { data } = await subCompetencyServices.getSubCompetencyById(`${query.id}`);
    return data.data;
  };

  const { data: dataFunctional, refetch: refetchFunctional } = useQuery({
    queryKey: ["Functional"],
    queryFn: getFunctionalById,
    enabled: isReady,
  });

  const updateFunctional = async (payload: ISubCompetency) => {
    const { data } = await subCompetencyServices.updateSubCompetency(
      `${query.id}`,
      payload,
    );
    return data.data;
  };

  const extractYouTubeId = (url: string): string | null => {
    const match = url.match(
      /(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([^&#?/]+)/,
    );
    return match ? match[1] : null;
  };

  const {
    mutate: mutateUpdateFunctional,
    isPending: isPendingMutateUpdateFunctional,
    isSuccess: isSuccessMutateUpdateFunctional,
  } = useMutation({
    mutationFn: (payload: ISubCompetency) => updateFunctional(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchFunctional();
      setToaster({
        type: "success",
        message: "Success update Functional",
      });
    },
  });

  const handleUpdateFunctional = (data: ISubCompetency) => {
    const videoId = extractYouTubeId(`${data.video}`);
    const payload = {
      ...data,
      video: `${videoId}`
    }
    mutateUpdateFunctional(payload)
  };

  return {
    dataFunctional,
    handleUpdateFunctional,
    isPendingMutateUpdateFunctional,
    isSuccessMutateUpdateFunctional,
  };
};

export default useDetailFunctional;
