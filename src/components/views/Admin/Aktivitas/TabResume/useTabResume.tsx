import useChangeUrl from "@/hooks/useChangeUrl";
import authServices from "@/services/auth.service";
import kajianServices from "@/services/kajian.service";
import resumeServices from "@/services/resume.service";
import { IResume } from "@/types/Resume";
import { exportToExcel } from "@/utils/exportExcel";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useTabResume = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const [kajian, setKajian] = useState<string | undefined>(undefined);
  const { currentLimit, currentPage, currentFullName } = useChangeUrl();

  const getResume = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (kajian) {
      params += `&kajian=${kajian}`;
    }
    if (currentFullName) {
      params += `&fullName=${currentFullName}`;
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
    queryKey: ["Resume", currentPage, currentLimit, currentFullName, kajian],
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
    enabled: !!router.isReady,
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

  const getResumeExport = async () => {
    let params = `kajian=${kajian}`
    const res = await resumeServices.exportResume(params)
    const { data } = res;
    return data.data;
  }

  const {
    data: dataExport,
    refetch: refetchResumeExport,
  } = useQuery({
    queryKey: ["EXPORT", kajian],
    queryFn: () => getResumeExport(),
    enabled: !!router.isReady,
  });

  const handleDownloadExcel = () => {
    if (!dataExport || dataExport.length === 0) return;
    const formatted = dataExport.map((resume: IResume) => ({
      "JUDUL": resume?.kajianTitle ?? "-",
      "RESUME": resume?.resume ?? "-",
      "PUBLISH": resume?.publishDate ? new Date(resume.publishDate).toLocaleString() : "-",
      "USER": resume?.fullName ?? "-",
      "DEPARTMENT": resume?.department ?? "-",
    }));

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
    handleDownloadExcel,

    currentFullName,

    refetchResumeExport,
    kajian,
    setKajian,
  };
};

export default useTabResume;
