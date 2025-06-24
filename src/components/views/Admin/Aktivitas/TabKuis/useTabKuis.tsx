import useChangeUrl from "@/hooks/useChangeUrl";
import authServices from "@/services/auth.service";
import competencyServices from "@/services/competency.service";
import kajianServices from "@/services/kajian.service";
import scoreServices from "@/services/score.service";
import subCompetencyServices from "@/services/subCompetency.service";
import { IProfile } from "@/types/Auth";
import { ISubCompetency } from "@/types/Competency";
import { IKajian } from "@/types/Kajian";
import { IScore } from "@/types/Score";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

const useTabKuis = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage} = useChangeUrl();

  const getScore = async () => {
    const res = await scoreServices.getScoreAll()
    const { data } = res;
    return data;
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

  const getSubCompetency = async() => {
    const res = await subCompetencyServices.getAllSubCompetency()
    const { data } = res
    return data
  } 

  const {
    data: dataSubCompetency,
    isPending: isPendingSubCompetency,
  } = useQuery({
    queryKey: ["SubCompetency"],
    queryFn: () => getSubCompetency(),
    enabled: router.isReady,
  });

  const getCompetency = async() => {
    const res = await competencyServices.getAllCompetency()
    const { data } = res
    return data
  } 

  const {
    data: dataCompetency,
    isPending: isPendingCompetency,
  } = useQuery({
    queryKey: ["Competency"],
    queryFn: () => getCompetency(),
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
  const [searchSubCompetency, setSearchSubCompetency] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredData = useMemo(() => {
  if (!dataScore?.data || !dataUser?.data || !dataSubCompetency?.data) return [];

  return dataScore.data
    .filter((score: IScore) => {
      const user: IProfile | undefined = dataUser.data.find((u: IProfile) => u._id === score.createdBy);
      const SubCompetency = dataSubCompetency.data.find((s: ISubCompetency) => s._id === score.bySubCompetency);

      const matchUser = user?.fullName?.toLowerCase().includes(searchUser.toLowerCase());
      const matchSubCompetency = SubCompetency?.title?.toLowerCase().includes(searchSubCompetency.toLowerCase());
      return matchUser && matchSubCompetency;
    })
    .sort((a: IScore, b: IScore) => {
      const dateA = new Date(a.createdAt as string).getTime();
      const dateB = new Date(b.createdAt as string).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
}, [dataScore, dataUser, dataSubCompetency, searchUser, searchSubCompetency, sortOrder]);


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

    searchSubCompetency,
    searchUser,
    sortOrder,
    setSearchSubCompetency,
    setSearchUser,
    setSortOrder,
  };
};

export default useTabKuis;
