import { ToasterContext } from "@/contexts/ToasterContext";
import kuisSopIkServices from "@/services/kuisSopIk.service";
import { IKuisSopIk } from "@/types/SopIk";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailKuisSopIK = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getKuisSopIkById = async () => {
    const { data } = await kuisSopIkServices.getKuisSopIkById(`${query.id}`);
    return data.data;
  };

  const { data: dataKuisSopIk, refetch: refetchKuisSopIk } = useQuery({
    queryKey: ["KuisSopIk"],
    queryFn: getKuisSopIkById,
    enabled: isReady,
  });

  const updateKuisSopIk = async (payload: IKuisSopIk) => {
    const { data } = await kuisSopIkServices.updateKuisSopIk(
      `${query.id}`,
      payload,
    );
    return data.data;
  };

  const {
    mutate: mutateUpdateKuisSopIk,
    isPending: isPendingMutateUpdateKuisSopIk,
    isSuccess: isSuccessMutateUpdateKuisSopIk,
  } = useMutation({
    mutationFn: (payload: IKuisSopIk) => updateKuisSopIk(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchKuisSopIk();
      setToaster({
        type: "success",
        message: "Success update Kuis",
      });
    },
  });

  const handleUpdateKuisSopIk = (data: IKuisSopIk) => mutateUpdateKuisSopIk(data)

  return {
    dataKuisSopIk,
    handleUpdateKuisSopIk,
    isPendingMutateUpdateKuisSopIk,
    isSuccessMutateUpdateKuisSopIk,
  };
};

export default useDetailKuisSopIK;
