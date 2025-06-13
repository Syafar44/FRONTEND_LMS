import { ToasterContext } from "@/contexts/ToasterContext";
import kuisCompetencyServices from "@/services/kuisCompetency.service";
import { IKuisCompetency } from "@/types/Competency";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailCore = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getCoreById = async () => {
    const { data } = await kuisCompetencyServices.getKuisCompetencyById(`${query.id}`);
    return data.data;
  };

  const { data: dataCore, refetch: refetchCore } = useQuery({
    queryKey: ["Core"],
    queryFn: getCoreById,
    enabled: isReady,
  });

  const updateCore = async (payload: IKuisCompetency) => {
    const { data } = await kuisCompetencyServices.updateKuisCompetency(
      `${query.id}`,
      payload,
    );
    return data.data;
  };

  const {
    mutate: mutateUpdateCore,
    isPending: isPendingMutateUpdateCore,
    isSuccess: isSuccessMutateUpdateCore,
  } = useMutation({
    mutationFn: (payload: IKuisCompetency) => updateCore(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchCore();
      setToaster({
        type: "success",
        message: "Success update Core",
      });
    },
  });

  const handleUpdateCore = (data: IKuisCompetency) => {
    const payload = {
      ...data,
    }
    mutateUpdateCore(payload)
  };

  return {
    dataCore,
    handleUpdateCore,
    isPendingMutateUpdateCore,
    isSuccessMutateUpdateCore,
  };
};

export default useDetailCore;
