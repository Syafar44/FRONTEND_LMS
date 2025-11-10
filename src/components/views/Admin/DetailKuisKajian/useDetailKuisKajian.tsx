import { ToasterContext } from "@/contexts/ToasterContext";
import kuisKajianServices from "@/services/kuisKajian.service";
import { IKuisKajian } from "@/types/Kajian";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailKuisKajian = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getKuisKajianById = async () => {
    const { data } = await kuisKajianServices.getKuisKajianById(`${query.id}`);
    return data.data;
  };

  const { data: dataKuisKajian, refetch: refetchKuisKajian } = useQuery({
    queryKey: ["KuisKajian"],
    queryFn: getKuisKajianById,
    enabled: isReady,
  });

  const updateKuisKajian = async (payload: IKuisKajian) => {
    const { data } = await kuisKajianServices.updateKuisKajian(
      `${query.id}`,
      payload,
    );
    return data.data;
  };

  const {
    mutate: mutateUpdateKuisKajian,
    isPending: isPendingMutateUpdateKuisKajian,
    isSuccess: isSuccessMutateUpdateKuisKajian,
  } = useMutation({
    mutationFn: (payload: IKuisKajian) => updateKuisKajian(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchKuisKajian();
      setToaster({
        type: "success",
        message: "Success update Kuis Kajian",
      });
    },
  });

  const handleUpdateKuisKajian = (data: IKuisKajian) => mutateUpdateKuisKajian(data)

  return {
    dataKuisKajian,
    handleUpdateKuisKajian,
    isPendingMutateUpdateKuisKajian,
    isSuccessMutateUpdateKuisKajian,
  };
};

export default useDetailKuisKajian;
