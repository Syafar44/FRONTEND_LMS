import useChangeUrl from "@/hooks/useChangeUrl";
import sopIkServices from "@/services/sopIk.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useSopIk = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const pathSegments = router.pathname.split('/');
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getSopIk = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await sopIkServices.getAllSopIk(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataSopIk,
    isLoading: isLoadingSopIk,
    isRefetching: isRefetchingSopIk,
    refetch: refetchSopIk,
  } = useQuery({
    queryKey: ["SopIk", currentPage, currentLimit, currentSearch],
    queryFn: () => getSopIk(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataSopIk,
    isLoadingSopIk,
    isRefetchingSopIk,
    refetchSopIk,

    selectedId,
    setSelectedId,

    pathSegments,
  };
};

export default useSopIk;
