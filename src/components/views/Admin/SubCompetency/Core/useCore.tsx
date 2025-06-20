import useChangeUrl from "@/hooks/useChangeUrl";
import competencyServices from "@/services/competency.service";
import subCompetencyServices from "@/services/subCompetency.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useCore = () => {
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
    data: dataCore,
    isLoading: isLoadingCore,
    isRefetching: isRefetchingCore,
    refetch: refetchCore,
  } = useQuery({
    queryKey: ["Competency"],
    queryFn: () => getCompetency(),
    enabled: router.isReady,
  });

  
  const getAllSubCompetencyByCompetency = async () => {
    const idCompetency = dataCore?._id
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await subCompetencyServices.getSubCompetencyByCompetency(`${idCompetency}`, params)
    const { data } = res;
    return data;
  };

  const {
    data: dataSubCore,
    isLoading: isLoadingSubCore,
    isRefetching: isRefetchingSubCore,
    refetch: refetchSubCore,
  } = useQuery({
    queryKey: ["SubCompetency", dataCore?._id],
    queryFn: () => getAllSubCompetencyByCompetency(),
    enabled: !!dataCore?._id,
  });

  return {
    dataCore,
    isLoadingCore,
    isRefetchingCore,
    refetchCore,

    dataSubCore,
    isLoadingSubCore,
    isRefetchingSubCore,
    refetchSubCore,

    selectedId,
    setSelectedId,

    slug,
  };
};

export default useCore;
