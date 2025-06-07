import { ToasterContext } from "@/contexts/ToasterContext";
import competencyServices from "@/services/competency.service";
import { ICompetency } from "@/types/Competency";


import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailManagerial = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getManagerialById = async () => {
    const { data } = await competencyServices.getCompetencyById(`${query.id}`);
    return data.data;
  };

  const { data: dataManagerial, refetch: refetchManagerial } = useQuery({
    queryKey: ["Managerial"],
    queryFn: getManagerialById,
    enabled: isReady,
  });

  const updateManagerial = async (payload: ICompetency) => {
    const { data } = await competencyServices.updateCompetency(
      `${query.id}`,
      payload,
    );
    return data.data;
  };

  const {
    mutate: mutateUpdateManagerial,
    isPending: isPendingMutateUpdateManagerial,
    isSuccess: isSuccessMutateUpdateManagerial,
  } = useMutation({
    mutationFn: (payload: ICompetency) => updateManagerial(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchManagerial();
      setToaster({
        type: "success",
        message: "Success update Managerial",
      });
    },
  });

  const handleUpdateManagerial = (data: ICompetency) => {
    const payload = {
      ...data,
    }
    mutateUpdateManagerial(payload)
  };

  return {
    dataManagerial,
    handleUpdateManagerial,
    isPendingMutateUpdateManagerial,
    isSuccessMutateUpdateManagerial,
  };
};

export default useDetailManagerial;
