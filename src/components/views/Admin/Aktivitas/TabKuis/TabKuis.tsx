import DataTable from "@/components/ui/DataTable";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import { COLUMN_LISTS } from "./TabKuis.constants";
import useTabKuis from "./useTabKuis";
import { convertTime } from "@/utils/date";
import { IProfile, } from "@/types/Auth";
import { Button, Input } from "@heroui/react";
import { ICompetency, ISubCompetency } from "@/types/Competency";

const TabKuis = () => {
  const { push, isReady, query } = useRouter();
  const { 
    dataScore,
    isPendingScore,
    isRefetchingScore,

    dataCompetency,
    isPendingCompetency,

    dataSubCompetency,
    isPendingSubCompetency,

    dataUser,
    isPendingUser,

    paginatedData,

    sortOrder,
    setSortOrder,
    handleDownloadExcel,
    totalPages,

    fullName,
    search,
  } = useTabKuis()
  
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
  
  const getCompetencyTitle = (subCompetencyId: string) => {
    const subCompetency = dataSubCompetency?.data?.find((item: ISubCompetency) => item._id === subCompetencyId);
    const competencyId = subCompetency?.byCompetency;
    const competency = dataCompetency?.data?.find((item: ICompetency) => item._id === competencyId);
    return competency?.title
  };

  const getSubCompetencyTitle = (subCompetencyId: string) => {
    const subCompetency = dataSubCompetency?.data?.find((item: ISubCompetency) => item._id === subCompetencyId);
    return subCompetency?.title;
  };

  const getUserById = (userId: string) => {
    const user = dataUser?.data?.find((item: IProfile) => item._id === userId)
    return user?.fullName
  }

  const renderCell = useCallback(
    (score: Record<string, unknown>, columnKey: Key) => {
      const cellValue = score[columnKey as keyof typeof score];

      switch (columnKey) {
        case "createdAt":
          return (
            <p>{convertTime(`${score.createdAt}`)}</p>
          );
        case "sub":
          return (
            <h2>{getSubCompetencyTitle(`${score.bySubCompetency}`)}</h2>
          );
        case "main":
          return (
            <h2>{getCompetencyTitle(`${score.bySubCompetency}`)}</h2>
          );
        case "poin":
          return (
            <h2>{`${Number(score.total_score) / Number(score.total_question) * 100}`}</h2>
          );
        case "createdBy":
          return (
            <h2>{getUserById(`${score.createdBy}`)}</h2>
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push, getSubCompetencyTitle, dataSubCompetency],
  );

  return (
    <section>
      <section className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="text"
            placeholder="Cari bedasarkan Sub Judul..."
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
        <div className="flex gap-2">
          <Button
            onPress={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
            className="bg-primary"
          >
            Sort: {sortOrder === "asc" ? "Terlama" : "Terbaru"}
          </Button>
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

export default TabKuis;
