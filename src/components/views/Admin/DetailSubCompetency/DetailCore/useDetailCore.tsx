import { ToasterContext } from "@/contexts/ToasterContext";
import competencyServices from "@/services/competency.service";
import subCompetencyServices from "@/services/subCompetency.service";
import { ISubCompetency } from "@/types/Competency";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailCore = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getCoreById = async () => {
    const { data } = await subCompetencyServices.getSubCompetencyById(`${query.id}`);
    return data.data;
  };

  const { data: dataCore, refetch: refetchCore } = useQuery({
    queryKey: ["Core"],
    queryFn: getCoreById,
    enabled: isReady,
  });

  const updateCore = async (payload: ISubCompetency) => {
    const { data } = await subCompetencyServices.updateSubCompetency(
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
    mutationFn: (payload: ISubCompetency) => updateCore(payload),
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

  const handleUpdateCore = (data: ISubCompetency) => {
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
