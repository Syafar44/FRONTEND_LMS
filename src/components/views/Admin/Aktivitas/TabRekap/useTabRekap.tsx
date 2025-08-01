import useChangeUrl from "@/hooks/useChangeUrl";
import authServices from "@/services/auth.service";
import competencyServices from "@/services/competency.service";
import scoreServices from "@/services/score.service";
import subCompetencyServices from "@/services/subCompetency.service";
import { IProfile } from "@/types/Auth";
import { ICompetency, ISubCompetency } from "@/types/Competency";
import { IScore } from "@/types/Score";
import { exportToExcel } from "@/utils/exportExcel";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

const useTabKuis = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { fullName, search } = router.query

  const {
  setUrl,
  currentPage,
  currentLimit,
  handleChangeLimit,
  handleChangePage,
} = useChangeUrl();

  const getScore = async () => {
    const res = await scoreServices.getScoreAll();
    return res.data;
  };

  const {
    data: dataScore,
    isPending: isPendingScore,
    isRefetching: isRefetchingScore,
    refetch: refetchScore
  } = useQuery({
    queryKey: ["Score", currentPage, currentLimit],
    queryFn: () => getScore(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  const getSubCompetency = async () => {
    const res = await subCompetencyServices.getAllSubCompetency();
    return res.data;
  };

  const { data: dataSubCompetency, isPending: isPendingSubCompetency } = useQuery({
    queryKey: ["SubCompetency"],
    queryFn: () => getSubCompetency(),
    enabled: router.isReady,
  });

  const getCompetency = async () => {
    const res = await competencyServices.getAllCompetency();
    return res.data;
  };

  const { data: dataCompetency, isPending: isPendingCompetency } = useQuery({
    queryKey: ["Competency"],
    queryFn: () => getCompetency(),
    enabled: router.isReady,
  });

  const getUser = async () => {
    const res = await authServices.getAllUsers();
    return res.data;
  };

  const {
    data: dataUser,
    isPending: isPendingUser,
    isRefetching: isRefetchingUser
  } = useQuery({
    queryKey: ["Users"],
    queryFn: () => getUser(),
    enabled: router.isReady,
  });

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredData = useMemo(() => {
    if (isPendingScore || isPendingSubCompetency || isPendingCompetency || isPendingUser) return [];

    const result: {
      mainTitle: string;
      userName: string;
      totalPoin: number;
      id: string;
      competencyId: string;
      percentage: number;
    }[] = [];

    dataCompetency.data.forEach((competency: ICompetency) => {
      const subList = dataSubCompetency.data.filter((sub: ISubCompetency) => String(sub.byCompetency) === String(competency._id));
      const subCount = subList.length || 1;
      dataUser.data.forEach((user: IProfile) => {
        let totalPoin = 0;
        let hasScore = false;

        subList.forEach((sub: ISubCompetency) => {
          const score = dataScore.data.find(
            (s: IScore) =>
              String(s.bySubCompetency) === String(sub._id) &&
              String(s.createdBy) === String(user._id)
          );
          if (score) {
            const poin = (Number(score.total_score) / Number(score.total_question)) * 100;
            totalPoin += poin;
            hasScore = true;
          }
        });

        if (hasScore) {
          const percentage = Number((totalPoin / subCount).toFixed(2));
          result.push({
            mainTitle: `${competency.title}`,
            userName: `${user.fullName}`,
            totalPoin,
            id: `${user._id}_${competency._id}`,
            competencyId: `${competency._id}`,
            percentage,
          });
        }
      });
    });

    return result.filter((item) => {
      const matchUser = !fullName || item.userName.toLowerCase().includes((fullName as string).toLowerCase());
      const matchCompetency = !search || item.mainTitle.toLowerCase().includes((search as string).toLowerCase());
      return matchUser && matchCompetency;
    });
  }, [dataScore, dataSubCompetency, dataCompetency, dataUser, fullName, search]);

  const totalPages = Math.ceil(filteredData.length / Number(currentLimit));

  const paginatedData = filteredData.slice(
    (Number(currentPage) - 1) * Number(currentLimit),
    Number(currentPage) * Number(currentLimit)
  );

  const handleDownloadExcel = () => {
    if (!filteredData || filteredData.length === 0) return;

    const formatted = filteredData.map((item) => ({
      "Materi": item.mainTitle,
      "Nama User": item.userName,
      "Total Nilai": item.totalPoin,
    }));

    exportToExcel(formatted, "Data-Rekap");
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

    dataSubCompetency,
    isPendingSubCompetency,

    dataUser,
    isPendingUser,
    isRefetchingUser,

    filteredData,

    sortOrder,
    setSortOrder,

    setUrl,
    currentPage,
    currentLimit,
    handleChangeLimit,
    handleChangePage,

    paginatedData,
    totalPages,
    handleDownloadExcel,

    search,
    fullName,
  };
};

export default useTabKuis;
