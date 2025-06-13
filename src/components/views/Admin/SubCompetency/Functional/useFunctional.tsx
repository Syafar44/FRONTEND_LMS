import useChangeUrl from "@/hooks/useChangeUrl";
import competencyServices from "@/services/competency.service";
import subCompetencyServices from "@/services/subCompetency.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useFunctional = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { slug } = router.query
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getCompetency = async () => {
    const res = await competencyServices.getCompetencyBySlug(`${slug}`)
    const { data } = res;
    return data.data;
  };
  
  const {
    data: dataFunctional,
    isLoading: isLoadingFunctional,
    isRefetching: isRefetchingFunctional,
    refetch: refetchFunctional,
  } = useQuery({
    queryKey: ["Competency"],
    queryFn: () => getCompetency(),
    enabled: router.isReady,
  });

  
  const getAllSubCompetencyByCompetency = async () => {
    const idCompetency = dataFunctional?._id
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await subCompetencyServices.getSubCompetencyByCompetency(`${idCompetency}`, params)
    const { data } = res;
    return data;
  };

  const {
    data: dataSubFunctional,
    isLoading: isLoadingSubFunctional,
    isRefetching: isRefetchingSubFunctional,
    refetch: refetchSubFunctional,
  } = useQuery({
    queryKey: ["SubCompetency"],
    queryFn: () => getAllSubCompetencyByCompetency(),
    enabled: router.isReady && !!dataFunctional?._id,
  });

  return {
    dataFunctional,
    isLoadingFunctional,
    isRefetchingFunctional,
    refetchFunctional,

    dataSubFunctional,
    isLoadingSubFunctional,
    isRefetchingSubFunctional,
    refetchSubFunctional,

    selectedId,
    setSelectedId,

    slug,
  };
};

export default useFunctional;
