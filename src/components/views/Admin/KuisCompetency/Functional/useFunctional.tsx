import kuisCompetencyServices from "@/services/kuisCompetency.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useFunctional = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { id } = router.query

  const getAllKuisCompetencyBySubCompetency = async () => {
    const res = await kuisCompetencyServices.getKuisCompetencyBySubCompetency(`${id}`)
    const { data } = res;
    return data;
  };

  const {
    data: dataKuisFunctional,
    isLoading: isLoadingKuisFunctional,
    isRefetching: isRefetchingKuisFunctional,
    refetch: refetchKuisFunctional,
  } = useQuery({
    queryKey: ["KuisCompetency"],
    queryFn: () => getAllKuisCompetencyBySubCompetency(),
    enabled: router.isReady && !!id,
  });

  return {
    dataKuisFunctional,
    isLoadingKuisFunctional,
    isRefetchingKuisFunctional,
    refetchKuisFunctional,

    selectedId,
    setSelectedId,

    id
  };
};

export default useFunctional;
