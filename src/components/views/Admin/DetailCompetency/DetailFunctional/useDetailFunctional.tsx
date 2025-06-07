import { ToasterContext } from "@/contexts/ToasterContext";
import competencyServices from "@/services/competency.service";
import { ICompetency } from "@/types/Competency";


import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailFunctional = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getFunctionalById = async () => {
    const { data } = await competencyServices.getCompetencyById(`${query.id}`);
    return data.data;
  };

  const { data: dataFunctional, refetch: refetchFunctional } = useQuery({
    queryKey: ["Functional"],
    queryFn: getFunctionalById,
    enabled: isReady,
  });

  const updateFunctional = async (payload: ICompetency) => {
    const { data } = await competencyServices.updateCompetency(
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
    mutationFn: (payload: ICompetency) => updateFunctional(payload),
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

  const handleUpdateFunctional = (data: ICompetency) => {
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
