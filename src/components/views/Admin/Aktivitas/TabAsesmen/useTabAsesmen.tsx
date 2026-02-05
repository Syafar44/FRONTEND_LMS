import useChangeUrl from "@/hooks/useChangeUrl";
import asesmenServices from "@/services/asesmen.service";
import partAsesmenServices from "@/services/partAsesmen.service";
import retAsesmenServices from "@/services/retAsesmen.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useTabAsesmen = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string>();

  const { currentLimit, currentPage, currentSearch, } = useChangeUrl();
  
  const getPartAsesmen = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await partAsesmenServices.getPartAsesmen(params)
    const { data } = res;
    return data;
  };

  const {
    data: dataPartAsesmen,
    isPending: isPendingPartAsesmen,
    isRefetching: isRefetchingPartAsesmen,
    refetch: refetchPartAsesmen
  } = useQuery({
    queryKey: ["PartAsesmen", currentPage, currentLimit, currentSearch],
    queryFn: () => getPartAsesmen(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  const getRetAsesmenByUserId = async () => {
    const res = await retAsesmenServices.getRetAsesmenByUserId(`${selectedId}`)
    const { data } = res;
    return data;
  };

  const {
    data: dataRetAsesmen,
    isPending: isPendingRetAsesmen,
  } = useQuery({
    queryKey: ["RetAsesmen", selectedId],
    queryFn: () => getRetAsesmenByUserId(),
    enabled: router.isReady && !!selectedId,
  });

  const getAsesmen = async () => {
    const res = await asesmenServices.getAsesmen()
    const { data } = res;
    return data;
  };

  const {
    data: dataAsesmen,
    isPending: isPendingAsesmen,
  } = useQuery({
    queryKey: ["Asesmen"],
    queryFn: () => getAsesmen(),
    enabled: router.isReady
  });

  const getPartUserAsesmen = async () => {
    const res = await partAsesmenServices.getPartAsesmenById(`${selectedId}`)
    const { data } = res;
    return data.data;
  };

  const {
    data: dataPartUserAsesmen,
    isPending: isPendingPartUserAsesmen,
  } = useQuery({
    queryKey: ["UserAsesmen", selectedId],
    queryFn: () => getPartUserAsesmen(),
    enabled: router.isReady && !selectedId
  });

  return {
    dataPartAsesmen,
    isPendingPartAsesmen,
    isRefetchingPartAsesmen,
    refetchPartAsesmen,
    selectedId,
    setSelectedId,
    isPendingRetAsesmen,
    dataRetAsesmen,
    isPendingAsesmen,
    dataAsesmen,
    dataPartUserAsesmen,
    isPendingPartUserAsesmen,
  };
};

export default useTabAsesmen;
