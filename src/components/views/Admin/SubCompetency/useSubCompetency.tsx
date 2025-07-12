import useChangeUrl from "@/hooks/useChangeUrl";
import competencyServices from "@/services/competency.service";
import subCompetencyServices from "@/services/subCompetency.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useSubCompetency = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const pathSegments = router.pathname.split('/');
  const { slug } = router.query
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getCompetency = async () => {
    const res = await competencyServices.getCompetencyBySlug(`${slug}`)
    const { data } = res;
    return data.data;
  };
  
  const {
    data: dataCompetency,
    isLoading: isLoadingCompetency,
    isRefetching: isRefetchingCompetency,
    refetch: refetchCompetency,
  } = useQuery({
    queryKey: ["Competency"],
    queryFn: () => getCompetency(),
    enabled: !!router.isReady,
  });

  
  const getAllSubCompetencyByCompetency = async () => {
    const idCompetency = dataCompetency?._id
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await subCompetencyServices.getSubCompetencyByCompetency(`${idCompetency}`, params)
    const { data } = res;
    return data;
  };

  const {
    data: dataSubCompetency,
    isLoading: isLoadingSubCompetency,
    isRefetching: isRefetchingSubCompetency,
    refetch: refetchSubCompetency,
  } = useQuery({
    queryKey: ["SubCompetency", dataCompetency?._id],
    queryFn: () => getAllSubCompetencyByCompetency(),
    enabled: !!dataCompetency?._id,
  });

  return {
    dataCompetency,
    isLoadingCompetency,
    isRefetchingCompetency,
    refetchCompetency,

    dataSubCompetency,
    isLoadingSubCompetency,
    isRefetchingSubCompetency,
    refetchSubCompetency,

    selectedId,
    setSelectedId,

    slug,
    pathSegments,
  };
};

export default useSubCompetency;
