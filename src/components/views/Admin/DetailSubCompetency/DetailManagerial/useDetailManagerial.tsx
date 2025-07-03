import { ToasterContext } from "@/contexts/ToasterContext";
import subCompetencyServices from "@/services/subCompetency.service";
import { ISubCompetency } from "@/types/Competency";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailManagerial = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getManagerialById = async () => {
    const { data } = await subCompetencyServices.getSubCompetencyById(`${query.id}`);
    return data.data;
  };

  const { data: dataManagerial, refetch: refetchManagerial } = useQuery({
    queryKey: ["Managerial"],
    queryFn: getManagerialById,
    enabled: isReady,
  });

  const updateManagerial = async (payload: ISubCompetency) => {
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
    mutate: mutateUpdateManagerial,
    isPending: isPendingMutateUpdateManagerial,
    isSuccess: isSuccessMutateUpdateManagerial,
  } = useMutation({
    mutationFn: (payload: ISubCompetency) => updateManagerial(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchManagerial();
      setToaster({
        type: "success",
        message: "Success update Managerial",
      });
    },
  });

  const handleUpdateManagerial = (data: ISubCompetency) => {
    const videoId = extractYouTubeId(`${data.video}`);
    const payload = {
      ...data,
    video: `${videoId}`,
    }
    mutateUpdateManagerial(payload)
  };

  return {
    dataManagerial,
    handleUpdateManagerial,
    isPendingMutateUpdateManagerial,
    isSuccessMutateUpdateManagerial,
  };
};

export default useDetailManagerial;
