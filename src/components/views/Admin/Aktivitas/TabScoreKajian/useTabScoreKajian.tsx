import useChangeUrl from "@/hooks/useChangeUrl";
import kajianServices from "@/services/kajian.service";
import scoreKajianServices from "@/services/scoreKajian.service";
import { exportToExcel } from "@/utils/exportExcel";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useTabScoreKajian = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();

  const { currentLimit, currentPage} = useChangeUrl();
  const [kajian, setKajian] = useState<string | undefined>(undefined);

  const getScore = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (kajian) {
      params += `&kajian=${kajian}`;
    }
    const res = await scoreKajianServices.getScoreAll(params)
    const { data } = res;
    return data;
  };

  const {
    data: dataScore,
    isPending: isPendingScore,
    isRefetching: isRefetchingScore,
    refetch: refetchScore
  } = useQuery({
    queryKey: ["ScoreKajian", currentPage, currentLimit, kajian],
    queryFn: () => getScore(),
    enabled: !!router.isReady && !!currentPage && !!currentLimit,
  });

  const getKajian = async() => {
    const res = await kajianServices.getKajian()
    const { data } = res
    return data
  } 

  const {
    data: dataKajian,
    isPending: isPendingKajian,
    isRefetching: isRefetchingKajian,
  } = useQuery({
    queryKey: ["Kajian"],
    queryFn: () => getKajian(),
    enabled: !!router.isReady,
  });

  const getScoreExport = async () => {
    let params = "limit=9999&page=1";
    if (kajian) {
      params += `&kajian=${kajian}`;
    }
    const res = await scoreKajianServices.getExportScore(params)
    const { data } = res;
    return data.data;
  }

  const {
    data: dataExport,
    refetch: refetchExport,
  } = useQuery({
    queryKey: ["EXPORT", kajian],
    queryFn: () => getScoreExport(),
    enabled: !!router.isReady,
  });

  useEffect(() => {
    if (isRefetchingKajian) {
      refetchExport();
    }
  })
  console.log("kajian", kajian);
  console.log("dataExport", dataExport);

  const handleDownloadExcel = () => {
  if (!dataExport || dataExport.length === 0) return;

  const formatted = dataExport.flatMap((user: any) => {
    // Jika user punya data skor
    if (Array.isArray(user.scoreData) && user.scoreData.length > 0) {
      return user.scoreData.map((score: any) => {
        const poin =
          Number(score.total_question) > 0
            ? (Number(score.total_score) / Number(score.total_question)) * 100
            : 0;

        return {
          USER: user.fullName || "-",
          DEPARTMENT: user.department || "-",
          "Kajian": score.KajianData?.title || "-", // disesuaikan dengan field hasil aggregate kamu
          POIN: Number.isFinite(poin) ? poin.toFixed(0) : "0",
          STATUS: score.isPass ? "Lulus" : "Tidak Lulus",
          PUBLISH: score.createdAt
            ? new Date(score.createdAt).toLocaleString()
            : "-",
        };
      });
    }

    // Jika user belum punya skor sama sekali
    return [
      {
        USER: user.fullName || "-",
        DEPARTMENT: user.department || "-",
        "Kajian": "-",
        POIN: "0",
        STATUS: "Belum Mengerjakan",
        PUBLISH: "-",
      },
    ];
  });

  exportToExcel([{ name: "Data Kuis Kajian", data: formatted }], "Data-Kuis Kajian");
};


  return {
    dataScore,
    isPendingScore,
    isRefetchingScore,
    refetchScore,

    selectedId,
    setSelectedId,

    dataKajian,
    isPendingKajian,

    handleDownloadExcel,

    kajian,
    setKajian,
  };
};

export default useTabScoreKajian;
