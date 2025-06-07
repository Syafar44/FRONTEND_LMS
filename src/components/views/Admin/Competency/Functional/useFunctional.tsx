import useChangeUrl from "@/hooks/useChangeUrl";
import competencyServices from "@/services/competency.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useFunctional = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getCategories = async () => {
    const competency = "functional"
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await competencyServices.getCompetencyByMainCompetency(competency, params);
    const { data } = res;
    return data;
  };

  const {
    data: dataFunctional,
    isLoading: isLoadingFunctional,
    isRefetching: isRefetchingFunctional,
    refetch: refetchFunctional,
  } = useQuery({
    queryKey: ["Categories", currentPage, currentLimit, currentSearch],
    queryFn: () => getCategories(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataFunctional,
    isLoadingFunctional,
    isRefetchingFunctional,
    refetchFunctional,

    selectedId,
    setSelectedId,
  };
};

export default useFunctional;
