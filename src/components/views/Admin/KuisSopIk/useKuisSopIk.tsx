import useChangeUrl from "@/hooks/useChangeUrl";
import kuisSopIkServices from "@/services/kuisSopIk.service";
import sopIkServices from "@/services/sopIk.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useKuisSopIk = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const pathSegments = router.pathname.split('/');
  const { id } = router.query
  const { currentLimit, currentPage, currentSearch } = useChangeUrl()

  const getAllKuisByIdSopIk = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await kuisSopIkServices.getKuisSopIkBySopIk(`${id}`, params)
    const { data } = res;
    return data;
  };

  const {
    data: dataKuis,
    isLoading: isLoadingKuis,
    isRefetching: isRefetchingKuis,
    refetch: refetchKuis,
  } = useQuery({
    queryKey: ["KuisSopIk", id, currentLimit, currentPage, currentSearch],
    queryFn: getAllKuisByIdSopIk,
    enabled: router.isReady && !!id,
  });

  const getSopIk = async () => {
    const res = await sopIkServices.getSopIkById(`${id}`)
    const { data } = res;
    return data.data;
  };

  const {
    data: dataSopIk,
    isPending: isPendingSopIk,
  } = useQuery({
    queryKey: ["SopIk", id],
    queryFn: () => getSopIk(),
    enabled: router.isReady && !!id
  });

  return {
    dataKuis,
    isLoadingKuis,
    isRefetchingKuis,
    refetchKuis,

    selectedId,
    setSelectedId,

    dataSopIk,
    isPendingSopIk,

    pathSegments,

    isReady: router.isReady,
  };
};

export default useKuisSopIk;
