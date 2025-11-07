import { ToasterContext } from "@/contexts/ToasterContext";
import ikServices from "@/services/ik.service";
import { IIk } from "@/types/Ik";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailIk = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getIkById = async () => {
    const { data } = await ikServices.getIkById(`${query.id}`);
    return data.data;
  };

  const { data: dataIk, refetch: refetchIk } = useQuery({
    queryKey: ["Ik"],
    queryFn: getIkById,
    enabled: isReady,
  });

  const updateIk = async (payload: IIk) => {
    const { data } = await ikServices.updateIk(
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
    mutate: mutateUpdateIk,
    isPending: isPendingMutateUpdateIk,
    isSuccess: isSuccessMutateUpdateIk,
  } = useMutation({
    mutationFn: (payload: IIk) => updateIk(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchIk();
      setToaster({
        type: "success",
        message: "Success update Ik",
      });
    },
  });

  const handleUpdateIk = (data: IIk) => {
    const videoId = extractYouTubeId(`${data.video}`);
    const payload = {
      ...data,
      video: `${videoId}`,
    }
    mutateUpdateIk(payload)
  };

  return {
    dataIk,
    handleUpdateIk,
    isPendingMutateUpdateIk,
    isSuccessMutateUpdateIk,
  };
};

export default useDetailIk;
