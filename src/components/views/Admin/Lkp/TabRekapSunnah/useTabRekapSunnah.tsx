import useChangeUrl from "@/hooks/useChangeUrl";
import LkpSunnahServices from "@/services/lkpSunnah.service";
import { exportToExcel } from "@/utils/exportExcel";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTabRekapSunnah = () => {
  const router = useRouter();
  const { search, department, month, year } = router.query
  const { currentLimit, currentPage, currentFullName, currentDepartment, currentMonth, currentYear } = useChangeUrl();

  let params = `limit=${currentLimit}&page=${currentPage}&year=${currentYear}`;
  if (currentFullName) {
    params += `&search=${currentFullName}`;
  }
  if (currentDepartment) {
    params += `&department=${currentDepartment}`;
  }
  if (currentMonth) {
    params += `&month=${currentMonth}`;
  }

  const getRekap = async() => {
    const res = await LkpSunnahServices.getRekap(params)
    const { data } = res 
    return data
  }

  const {
    data: dataRekap,
    isLoading: isLoadingRekap,
    isRefetching: isRefetchingRekap,
  } = useQuery({
    queryKey: ["Rekap", currentPage, currentLimit, currentFullName, currentDepartment, currentMonth, currentYear],
    queryFn: () => getRekap(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  const handleDownloadExcel = async () => {
    try {
      const res = await LkpSunnahServices.getRekap(params);
      const data = res.data?.data || [];

      const formatted = data.map((rekap: any) => ({
        Nama: rekap.createdBy.fullName,
        Dhuha: `${rekap.dhuha} Rakaat`,
        Rawatib: rekap.rawatib,
        Al_Quran: rekap.al_quran,
        Tanggal: rekap.date,
      }));

      exportToExcel(formatted, "Report-LKP");
    } catch (error) {
      console.error("Gagal download:", error);
    }
  };

  return {
    dataRekap,
    isLoadingRekap,
    isRefetchingRekap,
    search,
    department,
    month,
    year,
    handleDownloadExcel,
  };
};

export default useTabRekapSunnah;
