import useChangeUrl from "@/hooks/useChangeUrl";
import ikServices from "@/services/ik.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useIk = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getIk = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await ikServices.getAllIk(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataIk,
    isLoading: isLoadingIk,
    isRefetching: isRefetchingIk,
    refetch: refetchIk,
  } = useQuery({
    queryKey: ["Ik", currentPage, currentLimit, currentSearch],
    queryFn: () => getIk(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataIk,
    isLoadingIk,
    isRefetchingIk,
    refetchIk,

    selectedId,
    setSelectedId,
  };
};

export default useIk;
