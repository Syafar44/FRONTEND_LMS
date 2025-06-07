import useChangeUrl from "@/hooks/useChangeUrl";
import competencyServices from "@/services/competency.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useCore = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getCompetency = async () => {
    const competency = "core"
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await competencyServices.getCompetencyByMainCompetency(competency, params);
    const { data } = res;
    return data;
  };

  const {
    data: dataCore,
    isLoading: isLoadingCore,
    isRefetching: isRefetchingCore,
    refetch: refetchCore,
  } = useQuery({
    queryKey: ["Competency", currentPage, currentLimit, currentSearch],
    queryFn: () => getCompetency(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataCore,
    isLoadingCore,
    isRefetchingCore,
    refetchCore,

    selectedId,
    setSelectedId,
  };
};

export default useCore;
