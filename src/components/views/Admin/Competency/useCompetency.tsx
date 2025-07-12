import useChangeUrl from "@/hooks/useChangeUrl";
import competencyServices from "@/services/competency.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useCompetency = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const pathSegments = router.pathname.split('/');
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getCompetency = async () => {
    const competency = `${pathSegments[3]}`
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await competencyServices.getCompetencyByMainCompetency(competency, params);
    const { data } = res;
    return data;
  };

  const {
    data: dataCompetency,
    isLoading: isLoadingCompetency,
    isRefetching: isRefetchingCompetency,
    refetch: refetchCompetency,
  } = useQuery({
    queryKey: ["Competency", currentPage, currentLimit, currentSearch],
    queryFn: () => getCompetency(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataCompetency,
    isLoadingCompetency,
    isRefetchingCompetency,
    refetchCompetency,

    selectedId,
    setSelectedId,

    pathSegments,
  };
};

export default useCompetency;
