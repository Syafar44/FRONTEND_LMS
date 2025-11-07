import useChangeUrl from "@/hooks/useChangeUrl";
import ikServices from "@/services/ik.service";
import kuisIkServices from "@/services/kuisIk.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useKuisIk = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const pathSegments = router.pathname.split('/');
  const { id } = router.query
  const { currentLimit, currentPage, currentSearch } = useChangeUrl()

  const getAllKuisByIdIk = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await kuisIkServices.getKuisIkByIk(`${id}`, params)
    const { data } = res;
    return data;
  };

  const {
    data: dataKuis,
    isLoading: isLoadingKuis,
    isRefetching: isRefetchingKuis,
    refetch: refetchKuis,
  } = useQuery({
    queryKey: ["KuisIk", id, currentLimit, currentPage, currentSearch],
    queryFn: getAllKuisByIdIk,
    enabled: router.isReady && !!id,
  });

  const getIk = async () => {
    const res = await ikServices.getIkById(`${id}`)
    const { data } = res;
    return data.data;
  };

  const {
    data: dataIk,
    isPending: isPendingIk,
  } = useQuery({
    queryKey: ["Ik", id],
    queryFn: () => getIk(),
    enabled: router.isReady && !!id
  });

  return {
    dataKuis,
    isLoadingKuis,
    isRefetchingKuis,
    refetchKuis,

    selectedId,
    setSelectedId,

    dataIk,
    isPendingIk,

    pathSegments,

    isReady: router.isReady,
  };
};

export default useKuisIk;
