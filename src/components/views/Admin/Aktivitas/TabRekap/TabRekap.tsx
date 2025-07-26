import DataTable from "@/components/ui/DataTable";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import { COLUMN_LISTS } from "./TabRekap.constants";
import useTabRekap from "./useTabRekap";
import { Button, Input } from "@heroui/react";

const TabRekap = () => {
  const { push, isReady, query } = useRouter();
  const { 
    isPendingScore,
    isRefetchingScore,
    isPendingSubCompetency,
    isPendingUser,

    paginatedData,
    totalPages,
    handleDownloadExcel,

    search,
    fullName,
  } = useTabRekap()
  
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

  const renderCell = useCallback(
    (score: Record<string, unknown>, columnKey: Key) => {
      const cellValue = score[columnKey as keyof typeof score];

      switch (columnKey) {
        case "main":
        return <h2>{score.mainTitle as string}</h2>;
        case "createdBy":
          return <h2>{score.userName as string}</h2>;
        case "percentage":
          return <h2>{`${Number(score.percentage).toFixed(0)}`}</h2>;
        case "poin":
          return <h2>{`${score.totalPoin}`}</h2>;
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      <section className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="text"
            placeholder="Cari bedasarkan Materi..."
            value={search ? String(search) : undefined}
            onChange={e => handleSearch(e)}
            onClear={handleClearSearch}
          />
          <Input
            type="text"
            placeholder="Cari nama user..."
            value={fullName ? String(fullName) : undefined}
            onChange={e => handleChangeFullName(e.target.value)}
            onClear={handleClearFullname}
          />
        </div>
        <div>
          <Button
            className="bg-primary" 
            onPress={handleDownloadExcel}>
            Download Excel
          </Button>
        </div>
    </section>
      {Object.keys(query).length > 0 && (
        <DataTable
          columns={COLUMN_LISTS}
          data={paginatedData || []}
          emptyContent="Score is empty"
          isLoading={isPendingScore || isRefetchingScore || isPendingSubCompetency || isPendingSubCompetency || isPendingUser}
          renderCell={renderCell}
          totalPages={totalPages}
          showSearch={false}
        />
      )}
    </section>
  );
};

export default TabRekap;
