import useChangeUrl from "@/hooks/useChangeUrl";
import asesmenServices from "@/services/asesmen.service";
import kuisAsesmenServices from "@/services/kuisAsesmen.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useKuisAsesmen = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const pathSegments = router.pathname.split('/');
  const { id } = router.query
  const { currentLimit, currentPage, currentSearch } = useChangeUrl()

  const getAllKuisByIdAsesmen = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await kuisAsesmenServices.getKuisAsesmenByAsesmen(`${id}`, params)
    const { data } = res;
    return data;
  };

  const {
    data: dataKuis,
    isLoading: isLoadingKuis,
    isRefetching: isRefetchingKuis,
    refetch: refetchKuis,
  } = useQuery({
    queryKey: ["KuisAsesmen", id, currentLimit, currentPage, currentSearch],
    queryFn: getAllKuisByIdAsesmen,
    enabled: router.isReady && !!id,
  });

  const getAsesmen = async () => {
    const res = await asesmenServices.getAsesmenById(`${id}`)
    const { data } = res;
    return data.data;
  };

  const {
    data: dataAsesmen,
    isPending: isPendingAsesmen,
  } = useQuery({
    queryKey: ["Asesmen", id],
    queryFn: () => getAsesmen(),
    enabled: router.isReady && !!id
  });

  return {
    dataKuis,
    isLoadingKuis,
    isRefetchingKuis,
    refetchKuis,

    selectedId,
    setSelectedId,

    dataAsesmen,
    isPendingAsesmen,

    pathSegments,

    isReady: router.isReady,
  };
};

export default useKuisAsesmen;
