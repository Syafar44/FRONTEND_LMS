import { ToasterContext } from "@/contexts/ToasterContext";
import competencyServices from "@/services/competency.service";
import subCompetencyServices from "@/services/subCompetency.service";
import { ISubCompetency } from "@/types/Competency";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailSubCompetency = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getSubCompetencyById = async () => {
    const { data } = await subCompetencyServices.getSubCompetencyById(`${query.id}`);
    return data.data;
  };

  const { data: dataSubCompetency, refetch: refetchSubCompetency } = useQuery({
    queryKey: ["SubCompetency"],
    queryFn: getSubCompetencyById,
    enabled: isReady,
  });

  const updateSubCompetency = async (payload: ISubCompetency) => {
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
    mutate: mutateUpdateSubCompetency,
    isPending: isPendingMutateUpdateSubCompetency,
    isSuccess: isSuccessMutateUpdateSubCompetency,
  } = useMutation({
    mutationFn: (payload: ISubCompetency) => updateSubCompetency(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchSubCompetency();
      setToaster({
        type: "success",
        message: "Success update SubCompetency",
      });
    },
  });

  const handleUpdateSubCompetency = (data: ISubCompetency) => {
    const videoId = extractYouTubeId(`${data.video}`);
    const payload = {
      ...data,
      video: `${videoId}`
    }
    mutateUpdateSubCompetency(payload)
  };

  return {
    dataSubCompetency,
    handleUpdateSubCompetency,
    isPendingMutateUpdateSubCompetency,
    isSuccessMutateUpdateSubCompetency,
  };
};

export default useDetailSubCompetency;
