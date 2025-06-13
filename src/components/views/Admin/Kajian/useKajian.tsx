import useChangeUrl from "@/hooks/useChangeUrl";
import kajianServices from "@/services/kajian.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useKajian = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const Kajian = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await kajianServices.getKajian(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataKajian,
    isLoading: isLoadingKajian,
    isRefetching: isRefetchingKajian,
    refetch: refetchKajian,
  } = useQuery({
    queryKey: ["Kajian", currentPage, currentLimit, currentSearch],
    queryFn: () => Kajian(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataKajian,
    isLoadingKajian,
    isRefetchingKajian,
    refetchKajian,

    selectedId,
    setSelectedId,
  };
};

export default useKajian;
