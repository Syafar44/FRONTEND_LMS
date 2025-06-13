import { ToasterContext } from "@/contexts/ToasterContext";
import kuisCompetencyServices from "@/services/kuisCompetency.service";
import { IKuisCompetency } from "@/types/Competency";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailFunctional = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getFunctionalById = async () => {
    const { data } = await kuisCompetencyServices.getKuisCompetencyById(`${query.id}`);
    return data.data;
  };

  const { data: dataFunctional, refetch: refetchFunctional } = useQuery({
    queryKey: ["Functional"],
    queryFn: getFunctionalById,
    enabled: isReady,
  });

  const updateFunctional = async (payload: IKuisCompetency) => {
    const { data } = await kuisCompetencyServices.updateKuisCompetency(
      `${query.id}`,
      payload,
    );
    return data.data;
  };

  const {
    mutate: mutateUpdateFunctional,
    isPending: isPendingMutateUpdateFunctional,
    isSuccess: isSuccessMutateUpdateFunctional,
  } = useMutation({
    mutationFn: (payload: IKuisCompetency) => updateFunctional(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchFunctional();
      setToaster({
        type: "success",
        message: "Success update Functional",
      });
    },
  });

  const handleUpdateFunctional = (data: IKuisCompetency) => {
    const payload = {
      ...data,
    }
    mutateUpdateFunctional(payload)
  };

  return {
    dataFunctional,
    handleUpdateFunctional,
    isPendingMutateUpdateFunctional,
    isSuccessMutateUpdateFunctional,
  };
};

export default useDetailFunctional;
