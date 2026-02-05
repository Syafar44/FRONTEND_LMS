import { ToasterContext } from "@/contexts/ToasterContext";
import kuisAsesmenServices from "@/services/kuisAsesmen.service";
import { IKuisAsesmen } from "@/types/Asesmen";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailKuisAsesmen = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getKuisAsesmenById = async () => {
    const { data } = await kuisAsesmenServices.getKuisAsesmenById(`${query.id}`);
    return data.data;
  };

  const { data: dataKuisAsesmen, refetch: refetchKuisAsesmen } = useQuery({
    queryKey: ["KuisAsesmen"],
    queryFn: getKuisAsesmenById,
    enabled: isReady,
  });

  const updateKuisAsesmen = async (payload: IKuisAsesmen) => {
    const { data } = await kuisAsesmenServices.updateKuisAsesmen(
      `${query.id}`,
      payload,
    );
    return data.data;
  };

  const {
    mutate: mutateUpdateKuisAsesmen,
    isPending: isPendingMutateUpdateKuisAsesmen,
    isSuccess: isSuccessMutateUpdateKuisAsesmen,
  } = useMutation({
    mutationFn: (payload: IKuisAsesmen) => updateKuisAsesmen(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchKuisAsesmen();
      setToaster({
        type: "success",
        message: "Success update Kuis Asesmen",
      });
    },
  });

  const handleUpdateKuisAsesmen = (data: IKuisAsesmen) => mutateUpdateKuisAsesmen(data)

  return {
    dataKuisAsesmen,
    handleUpdateKuisAsesmen,
    isPendingMutateUpdateKuisAsesmen,
    isSuccessMutateUpdateKuisAsesmen,
  };
};

export default useDetailKuisAsesmen;
