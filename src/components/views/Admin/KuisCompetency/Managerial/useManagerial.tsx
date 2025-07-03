import kuisCompetencyServices from "@/services/kuisCompetency.service";
import subCompetencyServices from "@/services/subCompetency.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useManagerial = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { id } = router.query

  const getAllKuisCompetencyBySubCompetency = async () => {
    const res = await kuisCompetencyServices.getKuisCompetencyBySubCompetency(`${id}`)
    const { data } = res;
    return data;
  };

  const {
    data: dataKuisManagerial,
    isLoading: isLoadingKuisManagerial,
    isRefetching: isRefetchingKuisManagerial,
    refetch: refetchKuisManagerial,
  } = useQuery({
    queryKey: ["KuisCompetency"],
    queryFn: () => getAllKuisCompetencyBySubCompetency(),
    enabled: router.isReady && !!id,
  });

  const getSubCompetency = async () => {
    const res = await subCompetencyServices.getSubCompetencyById(`${id}`)
    const { data } = res;
    return data.data;
  };

  const {
    data: dataSubCompetency,
    isPending: isPendingSubCompetency,
  } = useQuery({
    queryKey: ["SubCompetency", id],
    queryFn: () => getSubCompetency(),
    enabled: router.isReady && !!id,
  });

  return {
    dataKuisManagerial,
    isLoadingKuisManagerial,
    isRefetchingKuisManagerial,
    refetchKuisManagerial,

    selectedId,
    setSelectedId,

    dataSubCompetency,
    isPendingSubCompetency,
  };
};

export default useManagerial;
