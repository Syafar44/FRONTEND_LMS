import useChangeUrl from "@/hooks/useChangeUrl";
import ikServices from "@/services/ik.service";
import scoreIkServices from "@/services/scoreIk.service";
import { exportToExcel } from "@/utils/exportExcel";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useTabScoreIk = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();

  const { currentLimit, currentPage} = useChangeUrl();
  const [ik, setIk] = useState<string | undefined>(undefined);

  const getScore = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (ik) {
      params += `&ik=${ik}`;
    }
    const res = await scoreIkServices.getScoreAll(params)
    const { data } = res;
    return data;
  };

  const {
    data: dataScore,
    isPending: isPendingScore,
    isRefetching: isRefetchingScore,
    refetch: refetchScore
  } = useQuery({
    queryKey: ["ScoreIk", currentPage, currentLimit, ik],
    queryFn: () => getScore(),
    enabled: !!router.isReady && !!currentPage && !!currentLimit,
  });

  const getIk = async() => {
    const res = await ikServices.getAllIk()
    const { data } = res
    return data
  } 

  const {
    data: dataIk,
    isPending: isPendingIk,
    isRefetching: isRefetchingIk,
  } = useQuery({
    queryKey: ["Ik"],
    queryFn: () => getIk(),
    enabled: !!router.isReady,
  });

  const getScoreExport = async () => {
    let params = "limit=9999&page=1";
    if (ik) {
      params += `&ik=${ik}`;
    }
    const res = await scoreIkServices.getExportScore(params)
    const { data } = res;
    return data.data;
  }

  const {
    data: dataExport,
    refetch: refetchExport,
  } = useQuery({
    queryKey: ["EXPORT_IK", ik],
    queryFn: () => getScoreExport(),
    enabled: !!router.isReady,
  });

  console.log("data export ik", dataExport);

  useEffect(() => {
    if (isRefetchingIk) {
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

        console.log(score.IkData?.title);

        return {
          USER: user.fullName || "-",
          DEPARTMENT: user.department || "-",
          "IK": score.ikData?.title || "-", 
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
        "IK": "-",
        POIN: "0",
        STATUS: "Belum Mengerjakan",
        PUBLISH: "-",
      },
    ];
  });

  exportToExcel([{ name: "Data Kuis IK", data: formatted }], "Data-Kuis IK");
};


  return {
    dataScore,
    isPendingScore,
    isRefetchingScore,
    refetchScore,

    selectedId,
    setSelectedId,

    dataIk,
    isPendingIk,

    handleDownloadExcel,

    ik,
    setIk,
  };
};

export default useTabScoreIk;
