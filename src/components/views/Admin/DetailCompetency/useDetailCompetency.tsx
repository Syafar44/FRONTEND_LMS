import { ToasterContext } from "@/contexts/ToasterContext";
import competencyServices from "@/services/competency.service";
import { ICompetency } from "@/types/Competency";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailCompetency = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getCompetencyById = async () => {
    const { data } = await competencyServices.getCompetencyById(`${query.id}`);
    return data.data;
  };

  const { data: dataCompetency, refetch: refetchCompetency } = useQuery({
    queryKey: ["Competency"],
    queryFn: getCompetencyById,
    enabled: isReady,
  });

  const updateCompetency = async (payload: ICompetency) => {
    const { data } = await competencyServices.updateCompetency(
      `${query.id}`,
      payload,
    );
    return data.data;
  };

  const {
    mutate: mutateUpdateCompetency,
    isPending: isPendingMutateUpdateCompetency,
    isSuccess: isSuccessMutateUpdateCompetency,
  } = useMutation({
    mutationFn: (payload: ICompetency) => updateCompetency(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchCompetency();
      setToaster({
        type: "success",
        message: "Success update Competency",
      });
    },
  });

  const handleUpdateCompetency = (data: ICompetency) => {
    const payload = {
      ...data,
    }
    mutateUpdateCompetency(payload)
  };

  return {
    dataCompetency,
    handleUpdateCompetency,
    isPendingMutateUpdateCompetency,
    isSuccessMutateUpdateCompetency,
  };
};

export default useDetailCompetency;
