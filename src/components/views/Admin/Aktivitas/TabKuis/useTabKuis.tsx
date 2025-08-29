import useChangeUrl from "@/hooks/useChangeUrl";
import competencyServices from "@/services/competency.service";
import scoreServices from "@/services/score.service";
import { exportToExcel } from "@/utils/exportExcel";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";

const useTabKuis = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();

  const { currentLimit, currentPage} = useChangeUrl();
  const [competency, setCompetency] = useState<string | undefined>(undefined);
  const [subCompetency, setSubCompetency] = useState<string | undefined>(undefined);

  const getScore = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (competency) {
      params += `&competency=${competency}`;
    }
    const res = await scoreServices.getScoreAll(params)
    const { data } = res;
    return data;
  };

  const {
    data: dataScore,
    isPending: isPendingScore,
    isRefetching: isRefetchingScore,
    refetch: refetchScore
  } = useQuery({
    queryKey: ["Score", currentPage, currentLimit, competency, subCompetency],
    queryFn: () => getScore(),
    enabled: !!router.isReady && !!currentPage && !!currentLimit,
  });

  const getCompetency = async() => {
    const res = await competencyServices.getAllCompetency()
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
    if (competency) {
      params += `&competency=${competency}`;
    }
    const res = await scoreServices.getExportScore(params)
    const { data } = res;
    return data.data;
  }

  const {
    data: dataExport,
    refetch: refetchExport,
  } = useQuery({
    queryKey: ["EXPORT", competency],
    queryFn: () => getScoreExport(),
    enabled: !!router.isReady,
  });

  const getScoreFinal = async () => {
    let params = "limit=9999&page=1";
    if (competency) {
      params += `&competencyId=${competency}`;
    }
    const res = await scoreServices.getScoreFinal(params)
    const { data } = res;
    return data.data;
  }

  const {
    data: dataExportFinal,
    refetch: refetchExportFinal,
  } = useQuery({
    queryKey: ["FINAL", competency],
    queryFn: () => getScoreFinal(),
    enabled: !!router.isReady && !!competency,
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
      if (user.scoreData && user.scoreData.length > 0) {
        const validScores = user.scoreData.filter(
          (score: any) =>
            score.subCompetencyData &&
            score.subCompetencyData.title &&
            score.subCompetencyData.competencyData?.title
        );

        if (validScores.length > 0) {
          return validScores.map((score: any) => {
            const poin = score.total_question
              ? (Number(score.total_score) / Number(score.total_question)) * 100
              : 0;

            return {
              USER: user.fullName || "-",
              DEPARTMENT: user.department || "-",
              COMPETENCY: score.subCompetencyData?.competencyData?.title || "-",
              "SUB COMPETENCY": score.subCompetencyData?.title || "-",
              POIN: poin,
              STATUS: score.isPass ? "Lulus" : "Tidak Lulus",
              PUBLISH: score.createdAt
                ? new Date(score.createdAt).toLocaleString()
                : "-",
            };
          });
        }
      }

      // ✅ fallback kalau user belum punya score valid sama sekali
      return [
        {
          USER: user.fullName || "-",
          DEPARTMENT: user.department || "-",
          COMPETENCY: "-",
          "SUB COMPETENCY": "-",
          POIN: 0,
          STATUS: "Belum Mengerjakan",
          PUBLISH: "-",
        },
      ];
    });


    if (!dataExportFinal || dataExportFinal.length === 0) return;

    const formattedFinal = dataExportFinal.map((item: {department: string, fullName: string, percentage: number, competency: string}) => ({
      "USER": item.fullName || "-",
      "COMPETENCY": item.competency || "-",
      "NILAI TOTAL": item.percentage ? `${item.percentage}%` : "0",
      "DEPARTMENT": item.department || "-",
    }));

    exportToExcel(
      [
        { name: "Detail", data: formatted },
        { name: "Rekap Nilai", data: formattedFinal },
      ],
      "Data-Kuis"
    );
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

    competency,
    setCompetency,
    subCompetency,
    setSubCompetency,
  };
};

export default useTabKuis;
