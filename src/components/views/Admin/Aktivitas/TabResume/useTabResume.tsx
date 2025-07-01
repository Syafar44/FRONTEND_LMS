import useChangeUrl from "@/hooks/useChangeUrl";
import authServices from "@/services/auth.service";
import kajianServices from "@/services/kajian.service";
import resumeServices from "@/services/resume.service";
import { IProfile } from "@/types/Auth";
import { IKajian } from "@/types/Kajian";
import { IResume } from "@/types/Resume";
import { exportToExcel } from "@/utils/exportExcel";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

const useTabResume = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getResume = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await resumeServices.getResumeAll(params)
    const { data } = res;
    return data;
  };

  const {
    data: dataResume,
    isPending: isPendingResume,
    isRefetching: isRefetchingResume,
    refetch: refetchResume
  } = useQuery({
    queryKey: ["Resume", currentPage, currentLimit, currentSearch],
    queryFn: () => getResume(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  const getKajian = async() => {
    const res = await kajianServices.getKajian()
    const { data } = res
    return data
  } 

  const {
    data: dataKajian,
    isPending: isPendingKajian,
  } = useQuery({
    queryKey: ["Kajian"],
    queryFn: () => getKajian(),
    enabled: router.isReady,
  });

  const getUser = async () => {
    const res = await authServices.getAllUsers()
    const { data } = res;
    return data;
  }

  const {
    data: dataUser,
    isPending: isPendingUser,
    isRefetching: isRefetchingUser,
  } = useQuery({
    queryKey: ["Users"],
    queryFn: () => getUser(),
    enabled: router.isReady,
  });

  const [searchUser, setSearchUser] = useState("");
  const [searchKajian, setSearchKajian] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredData = useMemo(() => {
    if (!dataResume?.data || !dataUser?.data || !dataKajian?.data) return [];

    return dataResume.data
      .filter((resume: IResume) => {
        const user: IProfile | undefined = dataUser.data.find((u: IProfile) => u._id === resume.createdBy);
        const kajian = dataKajian.data.find((k: IKajian) => k._id === resume.kajian);
        const matchUser = user?.fullName?.toLowerCase().includes(searchUser.toLowerCase());
        const matchKajian = kajian?.title?.toLowerCase().includes(searchKajian.toLowerCase());
        return matchUser && matchKajian;
      })
      .sort((a: IResume, b: IResume) => {
        const dateA = new Date(a.createdAt as string).getTime();
        const dateB = new Date(b.createdAt as string).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
  }, [dataResume, dataUser, dataKajian, searchUser, searchKajian, sortOrder]);

  const handleDownloadExcel = () => {
  if (!filteredData || filteredData.length === 0) return;

  const formatted = filteredData.map((resume: IResume) => {
    const user = dataUser?.data?.find((u: IProfile) => u._id === resume.createdBy);
    const kajian = dataKajian?.data?.find((k: IKajian) => k._id === resume.kajian);

    return {
      "JUDUL": kajian?.title || "-",
      "RESUME": resume.resume || "-",
      "PUBLISH": new Date(resume.createdAt!).toLocaleString(),
      "USER": user?.fullName || "-",
    };
  });

  exportToExcel(formatted, "Data-Resume");
};


  return {
    dataResume,
    isPendingResume,
    isRefetchingResume,
    refetchResume,

    selectedId,
    setSelectedId,

    dataKajian,
    isPendingKajian,

    dataUser,
    isPendingUser,
    isRefetchingUser,

    filteredData,

    searchKajian,
    searchUser,
    sortOrder,
    setSearchKajian,
    setSearchUser,
    setSortOrder,
    handleDownloadExcel,
  };
};

export default useTabResume;
