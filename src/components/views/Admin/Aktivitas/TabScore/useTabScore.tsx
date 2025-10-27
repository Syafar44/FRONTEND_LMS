import useChangeUrl from "@/hooks/useChangeUrl";
import scoreSopIkServices from "@/services/scoreSopIk.service";
import sopIkServices from "@/services/sopIk.service";
import { exportToExcel } from "@/utils/exportExcel";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useTabScore = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();

  const { currentLimit, currentPage} = useChangeUrl();
  const [sopik, setSopik] = useState<string | undefined>(undefined);

  const getScore = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (sopik) {
      params += `&sopik=${sopik}`;
    }
    const res = await scoreSopIkServices.getScoreAll(params)
    const { data } = res;
    return data;
  };

  const {
    data: dataScore,
    isPending: isPendingScore,
    isRefetching: isRefetchingScore,
    refetch: refetchScore
  } = useQuery({
    queryKey: ["ScoreSopIK", currentPage, currentLimit, sopik],
    queryFn: () => getScore(),
    enabled: !!router.isReady && !!currentPage && !!currentLimit,
  });

  const getCompetency = async() => {
    const res = await sopIkServices.getAllSopIk()
    const { data } = res
    return data
  } 

  const {
    data: dataCompetency,
    isPending: isPendingCompetency,
    isRefetching: isRefetchingCompetency,
  } = useQuery({
    queryKey: ["Competency"],
    queryFn: () => getCompetency(),
    enabled: !!router.isReady,
  });

  const getScoreExport = async () => {
    let params = "limit=9999&page=1";
    if (sopik) {
      params += `&sopik=${sopik}`;
    }
    const res = await scoreSopIkServices.getExportScore(params)
    const { data } = res;
    return data.data;
  }

  const {
    data: dataExport,
    refetch: refetchExport,
  } = useQuery({
    queryKey: ["EXPORT", sopik],
    queryFn: () => getScoreExport(),
    enabled: !!router.isReady,
  });

  const getScoreFinal = async () => {
    let params = "limit=9999&page=1";
    if (sopik) {
      params += `&sopikId=${sopik}`;
    }
    const res = await scoreSopIkServices.getScoreFinal(params)
    const { data } = res;
    return data.data;
  }

  const {
    data: dataExportFinal,
    refetch: refetchExportFinal,
  } = useQuery({
    queryKey: ["FINAL", sopik],
    queryFn: () => getScoreFinal(),
    enabled: !!router.isReady && !!sopik,
  });

  useEffect(() => {
    if (isRefetchingCompetency) {
      refetchExport();
      refetchExportFinal();
    }
  })

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
          "SOP & IK": score.sopIkData?.title || "-", // disesuaikan dengan field hasil aggregate kamu
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
        "SOP & IK": "-",
        POIN: "0",
        STATUS: "Belum Mengerjakan",
        PUBLISH: "-",
      },
    ];
  });

  exportToExcel([{ name: "Data Kuis SOP & IK", data: formatted }], "Data-Kuis SOP & IK");
};


  return {
    dataScore,
    isPendingScore,
    isRefetchingScore,
    refetchScore,

    selectedId,
    setSelectedId,

    dataCompetency,
    isPendingCompetency,

    handleDownloadExcel,

    sopik,
    setSopik,
  };
};

export default useTabScore;
