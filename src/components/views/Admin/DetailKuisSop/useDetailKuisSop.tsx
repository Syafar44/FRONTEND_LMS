import { ToasterContext } from "@/contexts/ToasterContext";
import kuisSopServices from "@/services/kuisSop.service";
import { IKuisSop } from "@/types/Sop";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailKuisSop = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getKuisSopById = async () => {
    const { data } = await kuisSopServices.getKuisSopById(`${query.id}`);
    return data.data;
  };

  const { data: dataKuisSop, refetch: refetchKuisSop } = useQuery({
    queryKey: ["KuisSop"],
    queryFn: getKuisSopById,
    enabled: isReady,
  });

  const updateKuisSop = async (payload: IKuisSop) => {
    const { data } = await kuisSopServices.updateKuisSop(
      `${query.id}`,
      payload,
    );
    return data.data;
  };

  const {
    mutate: mutateUpdateKuisSop,
    isPending: isPendingMutateUpdateKuisSop,
    isSuccess: isSuccessMutateUpdateKuisSop,
  } = useMutation({
    mutationFn: (payload: IKuisSop) => updateKuisSop(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchKuisSop();
      setToaster({
        type: "success",
        message: "Success update Kuis SOP",
      });
    },
  });

  const handleUpdateKuisSop = (data: IKuisSop) => mutateUpdateKuisSop(data)

  return {
    dataKuisSop,
    handleUpdateKuisSop,
    isPendingMutateUpdateKuisSop,
    isSuccessMutateUpdateKuisSop,
  };
};

export default useDetailKuisSop;
