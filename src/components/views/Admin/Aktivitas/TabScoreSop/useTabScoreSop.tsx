import useChangeUrl from "@/hooks/useChangeUrl";
import scoreSopServices from "@/services/scoreSop.service";
import sopServices from "@/services/sop.service";
import { exportToExcel } from "@/utils/exportExcel";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useTabScoreSop = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();

  const { currentLimit, currentPage} = useChangeUrl();
  const [sop, setSop] = useState<string | undefined>(undefined);

  const getScore = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (sop) {
      params += `&sop=${sop}`;
    }
    const res = await scoreSopServices.getScoreAll(params)
    const { data } = res;
    return data;
  };

  const {
    data: dataScore,
    isPending: isPendingScore,
    isRefetching: isRefetchingScore,
    refetch: refetchScore
  } = useQuery({
    queryKey: ["ScoreSop", currentPage, currentLimit, sop],
    queryFn: () => getScore(),
    enabled: !!router.isReady && !!currentPage && !!currentLimit,
  });

  const getSop = async() => {
    const res = await sopServices.getAllSop()
    const { data } = res
    return data
  } 

  const {
    data: dataSop,
    isPending: isPendingSop,
    isRefetching: isRefetchingSop,
  } = useQuery({
    queryKey: ["Sop"],
    queryFn: () => getSop(),
    enabled: !!router.isReady,
  });

  const getScoreExport = async () => {
    let params = "limit=9999&page=1";
    if (sop) {
      params += `&sop=${sop}`;
    }
    const res = await scoreSopServices.getExportScore(params)
    const { data } = res;
    return data.data;
  }

  const {
    data: dataExport,
    refetch: refetchExport,
  } = useQuery({
    queryKey: ["EXPORT_SOP", sop],
    queryFn: () => getScoreExport(),
    enabled: !!router.isReady,
  });

  console.log("data export sop", dataExport);

  useEffect(() => {
    if (isRefetchingSop) {
      refetchExport();
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

        console.log(score.sopData?.title);

        return {
          USER: user.fullName || "-",
          DEPARTMENT: user.department || "-",
          "SOP": score.sopData?.title || "-", 
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
        "SOP": "-",
        POIN: "0",
        STATUS: "Belum Mengerjakan",
        PUBLISH: "-",
      },
    ];
  });

  exportToExcel([{ name: "Data Kuis SOP", data: formatted }], "Data-Kuis SOP");
};


  return {
    dataScore,
    isPendingScore,
    isRefetchingScore,
    refetchScore,

    selectedId,
    setSelectedId,

    dataSop,
    isPendingSop,

    handleDownloadExcel,

    sop,
    setSop,
  };
};

export default useTabScoreSop;
