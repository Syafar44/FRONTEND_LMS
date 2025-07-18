import DataTable from "@/components/ui/DataTable";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect, useMemo } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import { COLUMN_LISTS } from "./TabRekap.constants";
import useTabRekap from "./useTabRekap";
import { IProfile} from "@/types/Auth";
import { Button, Input, Select, SelectItem } from "@heroui/react";

const TabRekap = () => {
  const { push, isReady, query } = useRouter();
  const { 
    dataRekap,
    isLoadingRekap,
    isRefetchingRekap,
    search, 
    department,
    month,
    year,
    handleDownloadExcel,
  } = useTabRekap()
  
  const { 
    setUrlExplore,
    handleChangeFullName,
    handleChangeDepartment,
    handleChangeMonth,
    handleChangeYear,
    handleClearFullname,
    handleClearDepartment,
    handleClearMonth,
    handleClearYear,
  } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrlExplore();
    }
  }, [isReady]);

  const bulanList = [
    { value: "01", label: "Januari" },
    { value: "02", label: "Februari" },
    { value: "03", label: "Maret" },
    { value: "04", label: "April" },
    { value: "05", label: "Mei" },
    { value: "06", label: "Juni" },
    { value: "07", label: "Juli" },
    { value: "08", label: "Agustus" },
    { value: "09", label: "September" },
    { value: "10", label: "Oktober" },
    { value: "11", label: "November" },
    { value: "12", label: "Desember" },
  ];

  const tahunList = ["2025", "2026","2027", "2028"];

  const FilterContent = useMemo(() => {
    const selectedYear = year;
    const selectedMonth = month;
    return (
      <div className="flex flex-col sm:flex-row gap-2 w-full">
          <Input
            type="text"
            variant="bordered"
            className="max-w-[250px]"
            value={search ? String(search) : undefined}
            placeholder="Nama Lengkap"
            onChange={e => handleChangeFullName(e.target.value)}
            onClear={handleClearFullname}
          />
          <Input
            type="text"
            variant="bordered"
            className="max-w-[250px]"
            value={department ? String(department) : undefined}
            placeholder="Departemen"
            onChange={e => handleChangeDepartment(e.target.value)}
            onClear={handleClearDepartment}
          />
          <Select
            className="max-w-[200px]"
            placeholder="Pilih bulan"
            selectedKeys={
              selectedMonth
                ? new Set([Array.isArray(selectedMonth) ? selectedMonth[0] : selectedMonth])
                : undefined
            }
            variant="bordered"
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0];
              handleChangeMonth(String(selected));
            }}
          >
            {bulanList.map((item) => (
              <SelectItem key={item.value}>{item.label}</SelectItem>
            ))}
          </Select>

          <Select
            className="max-w-[200px]"
            placeholder="Pilih tahun"
            selectedKeys={
              selectedYear
                ? new Set([Array.isArray(selectedYear) ? selectedYear[0] : selectedYear])
                : undefined
            }
            variant="bordered"
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0];
              handleChangeYear(String(selected));
            }}
          >
            {tahunList.map((tahun) => (
              <SelectItem key={tahun}>{tahun}</SelectItem>
            ))}
          </Select>
        </div>
    )
  }, [handleChangeFullName, handleChangeDepartment, handleChangeMonth, handleChangeYear, handleClearFullname, handleClearDepartment, handleClearMonth, handleClearYear, year])

  const renderCell = useCallback(
    (rekap: Record<string, unknown>, columnKey: Key) => {
      const cellValue = rekap[columnKey as keyof typeof rekap];
      const fullName = (rekap.createdBy as IProfile).fullName
      const department = (rekap.createdBy as IProfile).department
      switch (columnKey) {
        case "fullName":
          return (
            <h2>{fullName}</h2>
          );
        case "department":
          return (
            <h2>{department}</h2>
          );
        case "subuh":
          let borderSubuh = "";
          switch (rekap.subuh) {
            case "Dikerjakan secara berjamaah":
              borderSubuh = "border-green-400 bg-green-400/30";
              break;
            case "Dikerjakan namun tidak berjamaah":
              borderSubuh = "border-blue-400 bg-blue-400/30";
              break;
            case "Tidak mengerjakan":
              borderSubuh = "border-red-400 bg-red-400/30";
              break;
            default:
              borderSubuh = "border-gray-400 bg-gray-400/30";
          }
          return (
            <h2 className={`border rounded-full text-sm px-2 ${borderSubuh}`}>{`${rekap.subuh}`}</h2>
          );
        case "dzuhur":
          let borderDzuhur = "";
          switch (rekap.dzuhur) {
            case "Dikerjakan secara berjamaah":
              borderDzuhur = "border-green-400 bg-green-400/30";
              break;
            case "Dikerjakan namun tidak berjamaah":
              borderDzuhur = "border-blue-400 bg-blue-400/30";
              break;
            case "Tidak mengerjakan":
              borderDzuhur = "border-red-400 bg-red-400/30";
              break;
            default:
              borderDzuhur = "border-gray-400 bg-gray-400/30";
          }
          return (
            <h2 className={`border rounded-full text-sm px-2 ${borderDzuhur}`}>{`${rekap.dzuhur}`}</h2>
          );
        case "ashar":
          let borderAshar = "";
          switch (rekap.ashar) {
            case "Dikerjakan secara berjamaah":
              borderAshar = "border-green-400 bg-green-400/30";
              break;
            case "Dikerjakan namun tidak berjamaah":
              borderAshar = "border-blue-400 bg-blue-400/30";
              break;
            case "Tidak mengerjakan":
              borderAshar = "border-red-400 bg-red-400/30";
              break;
            default:
              borderAshar = "border-gray-400 bg-gray-400/30";
          }
          return (
            <h2 className={`border rounded-full text-sm px-2 ${borderAshar}`}>{`${rekap.ashar}`}</h2>
          );
        case "magrib":
          let borderMagrib = "";
          switch (rekap.magrib) {
            case "Dikerjakan secara berjamaah":
              borderMagrib = "border-green-400 bg-green-400/30";
              break;
            case "Dikerjakan namun tidak berjamaah":
              borderMagrib = "border-blue-400 bg-blue-400/30";
              break;
            case "Tidak mengerjakan":
              borderMagrib = "border-red-400 bg-red-400/30";
              break;
            default:
              borderMagrib = "border-gray-400 bg-gray-400/30";
          }
          return (
            <h2 className={`border rounded-full text-sm px-2 ${borderMagrib}`}>{`${rekap.magrib}`}</h2>
          );
        case "isya":
          let borderIsya = "";
          switch (rekap.isya) {
            case "Dikerjakan secara berjamaah":
              borderIsya = "border-green-400 bg-green-400/30";
              break;
            case "Dikerjakan namun tidak berjamaah":
              borderIsya = "border-blue-400 bg-blue-400/30";
              break;
            case "Tidak mengerjakan":
              borderIsya = "border-red-400 bg-red-400/30";
              break;
            default:
              borderIsya = "border-gray-400 bg-gray-400/30";
          }
          return (
            <h2 className={`border rounded-full text-sm px-2 ${borderIsya}`}>{`${rekap.isya}`}</h2>
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      <section className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {FilterContent}
        <div className="flex gap-2">
          <Button
            onPress={handleDownloadExcel}
            className="bg-primary"
          >
            Download Excel
          </Button>
        </div>
    </section>
      {Object.keys(query).length > 0 && (
        <DataTable
          columns={COLUMN_LISTS}
          data={dataRekap?.data || []}
          emptyContent="Rekap is empty"
          isLoading={isLoadingRekap || isRefetchingRekap}
          renderCell={renderCell}
          totalPages={dataRekap?.pagination?.totalPages}
          showSearch={false}
        />
      )}
    </section>
  );
};

export default TabRekap;
