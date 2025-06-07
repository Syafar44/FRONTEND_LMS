import { ToasterContext } from "@/contexts/ToasterContext";
import competencyServices from "@/services/competency.service";
import { ICompetency } from "@/types/Competency";


import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailCore = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getCoreById = async () => {
    const { data } = await competencyServices.getCompetencyById(`${query.id}`);
    return data.data;
  };

  const { data: dataCore, refetch: refetchCore } = useQuery({
    queryKey: ["Core"],
    queryFn: getCoreById,
    enabled: isReady,
  });

  const updateCore = async (payload: ICompetency) => {
    const { data } = await competencyServices.updateCompetency(
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
    mutationFn: (payload: ICompetency) => updateCore(payload),
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

  const handleUpdateCore = (data: ICompetency) => {
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
