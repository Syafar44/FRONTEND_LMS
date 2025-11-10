import useChangeUrl from "@/hooks/useChangeUrl";
import kajianServices from "@/services/kajian.service";
import kuisKajianServices from "@/services/kuisKajian.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useKuisKajian = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const pathSegments = router.pathname.split('/');
  const { id } = router.query
  const { currentLimit, currentPage, currentSearch } = useChangeUrl()

  const getAllKuisByIdKajian = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await kuisKajianServices.getKuisKajianByKajian(`${id}`, params)
    const { data } = res;
    return data;
  };

  const {
    data: dataKuis,
    isLoading: isLoadingKuis,
    isRefetching: isRefetchingKuis,
    refetch: refetchKuis,
  } = useQuery({
    queryKey: ["KuisKajian", id, currentLimit, currentPage, currentSearch],
    queryFn: getAllKuisByIdKajian,
    enabled: router.isReady && !!id,
  });

  const getKajian = async () => {
    const res = await kajianServices.getKajianById(`${id}`)
    const { data } = res;
    return data.data;
  };

  const {
    data: dataKajian,
    isPending: isPendingKajian,
  } = useQuery({
    queryKey: ["Kajian", id],
    queryFn: () => getKajian(),
    enabled: router.isReady && !!id
  });

  return {
    dataKuis,
    isLoadingKuis,
    isRefetchingKuis,
    refetchKuis,

    selectedId,
    setSelectedId,

    dataKajian,
    isPendingKajian,

    pathSegments,

    isReady: router.isReady,
  };
};

export default useKuisKajian;
