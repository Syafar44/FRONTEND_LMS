import useChangeUrl from "@/hooks/useChangeUrl";
import authServices from "@/services/auth.service";
import { exportToExcel } from "@/utils/exportExcel";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useTabUser = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getTabUser = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await authServices.getAllUsers(params)
    const { data } = res;
    return data;
  }

  const {
    data: dataTabUser,
    isLoading: isLoadingTabUser,
    isRefetching: isRefetchingTabUser,
    refetch: refetchTabUser,
  } = useQuery({
    queryKey: ["Competency", currentPage, currentLimit, currentSearch],
    queryFn: () => getTabUser(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  const handleDownloadExcel = async () => {
    try {
      const res = await authServices.getAllUsers("limit=10000&page=1");
      const data = res.data?.data || [];

      const formatted = data.map((user: any) => ({
        Nama: user.fullName,
        Email: user.email,
        Access: user.access,
        Role: user.role,
      }));

      exportToExcel(formatted, "Data-User");
    } catch (error) {
      console.error("Gagal download:", error);
    }
  };

  return {
    dataTabUser,
    isLoadingTabUser,
    isRefetchingTabUser,
    refetchTabUser,

    selectedId,
    setSelectedId,

    handleDownloadExcel,
  };
};

export default useTabUser;
