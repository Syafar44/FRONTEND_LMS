import DataTable from "@/components/ui/DataTable";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import { COLUMN_LISTS } from "./TabResume.constants";
import useTabResume from "./useTabResume";
import { convertTime } from "@/utils/date";
import { Button, Input } from "@heroui/react";

const TabResume = () => {
  const { push, isReady, query } = useRouter();
  
  const { 
    dataResume,
    isPendingResume,
    isRefetchingResume,
    dataKajian,
    isPendingKajian,
    isPendingUser,
    handleDownloadExcel,
    currentFullName,
    currentSearch,
  } = useTabResume()
  
  const { 
    setUrlAktivitas,
    handleChangeFullName,
    handleSearch,
    handleClearFullname,
    handleClearSearch,
    } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrlAktivitas();
    }
  }, [isReady]);

  interface ResumeRow {
    [key: string]: any;
    createdAt?: string;
    kajian?: {
      title?: string;
      [key: string]: any;
    };
    createdBy?: {
      fullName?: string;
      [key: string]: any;
    };
  }

  const renderCell = useCallback(
    (resume: ResumeRow, columnKey: Key) => {
      const cellValue = resume[columnKey as keyof typeof resume];

      switch (columnKey) {
        case "createdAt":
          return (
            <p>{convertTime(`${resume.createdAt}`)}</p>
          );
        case "title":
          return (
            <h2>{resume.kajian?.title}</h2>
          );
        case "createdBy":
          return (
            <h2>{resume.createdBy?.fullName}</h2>
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push, dataKajian],
  );

  return (
    <section>
      <section className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="text"
            placeholder="Cari bedasarkan kajian..."
            value={currentSearch ? String(currentSearch) : undefined}
            onChange={e => handleSearch(e)}
            onClear={handleClearSearch}
          />
          <Input
            type="text"
            placeholder="Cari nama user..."
            value={currentFullName ? String(currentFullName) : undefined}
            onChange={e => handleChangeFullName(e.target.value)}
            onClear={handleClearFullname}
          />
        </div>
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
          data={dataResume?.data || []}
          emptyContent="Resume is empty"
          isLoading={isPendingResume || isRefetchingResume || isPendingKajian || isPendingUser}
          renderCell={renderCell}
          totalPages={dataResume?.pagination?.totalPages}
          showSearch={false}
        />
      )}
    </section>
  );
};

export default TabResume;
