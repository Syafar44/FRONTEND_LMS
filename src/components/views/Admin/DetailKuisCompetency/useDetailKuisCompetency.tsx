import { ToasterContext } from "@/contexts/ToasterContext";
import kuisCompetencyServices from "@/services/kuisCompetency.service";
import { IKuisCompetency } from "@/types/Competency";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const DetailKuisCompetency = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getKuisCompetencyById = async () => {
    const { data } = await kuisCompetencyServices.getKuisCompetencyById(`${query.id}`);
    return data.data;
  };

  const { data: dataKuisCompetency, refetch: refetchKuisCompetency } = useQuery({
    queryKey: ["KuisCompetency"],
    queryFn: getKuisCompetencyById,
    enabled: isReady,
  });

  const updateKuisCompetency = async (payload: IKuisCompetency) => {
    const { data } = await kuisCompetencyServices.updateKuisCompetency(
      `${query.id}`,
      payload,
    );
    return data.data;
  };

  const {
    mutate: mutateUpdateKuisCompetency,
    isPending: isPendingMutateUpdateKuisCompetency,
    isSuccess: isSuccessMutateUpdateKuisCompetency,
  } = useMutation({
    mutationFn: (payload: IKuisCompetency) => updateKuisCompetency(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchKuisCompetency();
      setToaster({
        type: "success",
        message: "Success update Kuis Competency",
      });
    },
  });

  const handleUpdateKuisCompetency = (data: IKuisCompetency) => {
    const payload = {
      ...data,
    }
    mutateUpdateKuisCompetency(payload)
  };

  return {
    dataKuisCompetency,
    handleUpdateKuisCompetency,
    isPendingMutateUpdateKuisCompetency,
    isSuccessMutateUpdateKuisCompetency,
  };
};

export default DetailKuisCompetency;
