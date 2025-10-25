import kuisCompetencyServices from "@/services/kuisCompetency.service";
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

  const getAllKuisByIdSopIk = async () => {
    const res = await kuisSopIkServices.getKuisSopIkBySopIk(`${id}`)
    const { data } = res;
    return data;
  };

  const {
    data: dataKuis,
    isLoading: isLoadingKuis,
    isRefetching: isRefetchingKuis,
    refetch: refetchKuis,
  } = useQuery({
    queryKey: ["KuisSopIk", id],
    queryFn: getAllKuisByIdSopIk,
    enabled: router.isReady && !!id,
  });

  console.log("dataKuis", dataKuis?.data)

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
  };
};

export default useKuisSopIk;
