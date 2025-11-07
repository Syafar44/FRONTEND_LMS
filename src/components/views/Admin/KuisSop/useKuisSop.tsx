import useChangeUrl from "@/hooks/useChangeUrl";
import kuisSopServices from "@/services/kuisSop.service";
import sopServices from "@/services/sop.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useKuisSop = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const pathSegments = router.pathname.split('/');
  const { id } = router.query
  const { currentLimit, currentPage, currentSearch } = useChangeUrl()

  const getAllKuisByIdSop = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await kuisSopServices.getKuisSopBySop(`${id}`, params)
    const { data } = res;
    return data;
  };

  const {
    data: dataKuis,
    isLoading: isLoadingKuis,
    isRefetching: isRefetchingKuis,
    refetch: refetchKuis,
  } = useQuery({
    queryKey: ["KuisSop", id, currentLimit, currentPage, currentSearch],
    queryFn: getAllKuisByIdSop,
    enabled: router.isReady && !!id,
  });

  console.log("dataKuis", dataKuis?.data)

  const getSop = async () => {
    const res = await sopServices.getSopById(`${id}`)
    const { data } = res;
    return data.data;
  };

  const {
    data: dataSop,
    isPending: isPendingSop,
  } = useQuery({
    queryKey: ["Sop", id],
    queryFn: () => getSop(),
    enabled: router.isReady && !!id
  });

  return {
    dataKuis,
    isLoadingKuis,
    isRefetchingKuis,
    refetchKuis,

    selectedId,
    setSelectedId,

    dataSop,
    isPendingSop,

    pathSegments,

    isReady: router.isReady,
  };
};

export default useKuisSop;
