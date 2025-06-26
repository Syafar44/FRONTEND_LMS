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
    dataScore,
    isPendingScore,
    isRefetchingScore,
    isPendingSubCompetency,
    isPendingUser,
    filteredData,
    searchCompetency,
    searchUser,
    setSearchCompetency,
    setSearchUser,

    paginatedData,
    totalPages,
    handleDownloadExcel,
  } = useTabRekap()
  
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
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
            placeholder="Cari nama user..."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Cari bedasarkan Materi..."
            value={searchCompetency}
            onChange={(e) => setSearchCompetency(e.target.value)}
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
