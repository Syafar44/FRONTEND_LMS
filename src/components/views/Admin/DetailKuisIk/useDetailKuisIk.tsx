import { ToasterContext } from "@/contexts/ToasterContext";
import kuisIkServices from "@/services/kuisIk.service";
import { IKuisIk } from "@/types/Ik";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailKuisIK = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getKuisIkById = async () => {
    const { data } = await kuisIkServices.getKuisIkById(`${query.id}`);
    return data.data;
  };

  const { data: dataKuisIk, refetch: refetchKuisIk } = useQuery({
    queryKey: ["KuisIk"],
    queryFn: getKuisIkById,
    enabled: isReady,
  });

  const updateKuisIk = async (payload: IKuisIk) => {
    const { data } = await kuisIkServices.updateKuisIk(
      `${query.id}`,
      payload,
    );
    return data.data;
  };

  const {
    mutate: mutateUpdateKuisIk,
    isPending: isPendingMutateUpdateKuisIk,
    isSuccess: isSuccessMutateUpdateKuisIk,
  } = useMutation({
    mutationFn: (payload: IKuisIk) => updateKuisIk(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchKuisIk();
      setToaster({
        type: "success",
        message: "Success update Kuis SOP & IK",
      });
    },
  });

  const handleUpdateKuisIk = (data: IKuisIk) => mutateUpdateKuisIk(data)

  return {
    dataKuisIk,
    handleUpdateKuisIk,
    isPendingMutateUpdateKuisIk,
    isSuccessMutateUpdateKuisIk,
  };
};

export default useDetailKuisIK;
