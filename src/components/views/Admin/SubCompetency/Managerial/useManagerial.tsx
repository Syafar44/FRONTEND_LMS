import useChangeUrl from "@/hooks/useChangeUrl";
import competencyServices from "@/services/competency.service";
import subCompetencyServices from "@/services/subCompetency.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useManagerial = () => {
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
    data: dataManagerial,
    isLoading: isLoadingManagerial,
    isRefetching: isRefetchingManagerial,
    refetch: refetchManagerial,
  } = useQuery({
    queryKey: ["Competency"],
    queryFn: () => getCompetency(),
    enabled: router.isReady,
  });

  
  const getAllSubCompetencyByCompetency = async () => {
    const idCompetency = dataManagerial?._id
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await subCompetencyServices.getSubCompetencyByCompetency(`${idCompetency}`, params)
    const { data } = res;
    return data;
  };

  const {
    data: dataSubManagerial,
    isLoading: isLoadingSubManagerial,
    isRefetching: isRefetchingSubManagerial,
    refetch: refetchSubManagerial,
  } = useQuery({
    queryKey: ["SubCompetency"],
    queryFn: () => getAllSubCompetencyByCompetency(),
    enabled: router.isReady && !!dataManagerial?._id,
  });

  return {
    dataManagerial,
    isLoadingManagerial,
    isRefetchingManagerial,
    refetchManagerial,

    dataSubManagerial,
    isLoadingSubManagerial,
    isRefetchingSubManagerial,
    refetchSubManagerial,

    selectedId,
    setSelectedId,

    slug,
  };
};

export default useManagerial;
