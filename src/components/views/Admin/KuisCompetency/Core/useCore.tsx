import kuisCompetencyServices from "@/services/kuisCompetency.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useCore = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { id } = router.query

  const getAllKuisCompetencyBySubCompetency = async () => {
    const res = await kuisCompetencyServices.getKuisCompetencyBySubCompetency(`${id}`)
    const { data } = res;
    return data;
  };

  const {
    data: dataKuisCore,
    isLoading: isLoadingKuisCore,
    isRefetching: isRefetchingKuisCore,
    refetch: refetchKuisCore,
  } = useQuery({
    queryKey: ["KuisCompetency"],
    queryFn: () => getAllKuisCompetencyBySubCompetency(),
    enabled: router.isReady && !!id,
  });

  return {
    dataKuisCore,
    isLoadingKuisCore,
    isRefetchingKuisCore,
    refetchKuisCore,

    selectedId,
    setSelectedId,

    id
  };
};

export default useCore;
