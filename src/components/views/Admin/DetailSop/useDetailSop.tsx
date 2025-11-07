import { ToasterContext } from "@/contexts/ToasterContext";
import sopServices from "@/services/sop.service";
import { ISop } from "@/types/Sop";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailSop = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getSopById = async () => {
    const { data } = await sopServices.getSopById(`${query.id}`);
    return data.data;
  };

  const { data: dataSop, refetch: refetchSop } = useQuery({
    queryKey: ["Sop"],
    queryFn: getSopById,
    enabled: isReady,
  });

  const updateSop = async (payload: ISop) => {
    const { data } = await sopServices.updateSop(
      `${query.id}`,
      payload,
    );
    return data.data;
  };

  const {
    mutate: mutateUpdateSop,
    isPending: isPendingMutateUpdateSop,
    isSuccess: isSuccessMutateUpdateSop,
  } = useMutation({
    mutationFn: (payload: ISop) => updateSop(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchSop();
      setToaster({
        type: "success",
        message: "Success update SOP & IK",
      });
    },
  });

  const extractDriveId = (url: string): string | undefined => {
    const match = url.match(/(?:drive\.google\.com\/file\/d\/)([^/]+)/);
    return match ? match[1] : undefined;
  };

  const handleUpdateSop = (data: ISop) => {
    const payload = {
      ...data,
      file: `https://drive.google.com/uc?export=download&id=${extractDriveId(`${data.file}`)}`,
    }
    mutateUpdateSop(payload)
  }

  return {
    dataSop,
    handleUpdateSop,
    isPendingMutateUpdateSop,
    isSuccessMutateUpdateSop,
  };
};

export default useDetailSop;
