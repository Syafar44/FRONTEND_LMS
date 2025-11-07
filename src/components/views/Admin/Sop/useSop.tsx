import useChangeUrl from "@/hooks/useChangeUrl";
import sopServices from "@/services/sop.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useSop = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getSop = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await sopServices.getAllSop(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataSop,
    isLoading: isLoadingSop,
    isRefetching: isRefetchingSop,
    refetch: refetchSop,
  } = useQuery({
    queryKey: ["Sop", currentPage, currentLimit, currentSearch],
    queryFn: () => getSop(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataSop,
    isLoadingSop,
    isRefetchingSop,
    refetchSop,

    selectedId,
    setSelectedId,
  };
};

export default useSop;
