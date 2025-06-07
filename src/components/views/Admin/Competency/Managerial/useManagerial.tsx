import useChangeUrl from "@/hooks/useChangeUrl";
import competencyServices from "@/services/competency.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useManagerial = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getCategories = async () => {
    const competency = "managerial"
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await competencyServices.getCompetencyByMainCompetency(competency, params);
    const { data } = res;
    return data;
  };

  const {
    data: dataManagerial,
    isLoading: isLoadingManagerial,
    isRefetching: isRefetchingManagerial,
    refetch: refetchManagerial,
  } = useQuery({
    queryKey: ["Categories", currentPage, currentLimit, currentSearch],
    queryFn: () => getCategories(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataManagerial,
    isLoadingManagerial,
    isRefetchingManagerial,
    refetchManagerial,

    selectedId,
    setSelectedId,
  };
};

export default useManagerial;
