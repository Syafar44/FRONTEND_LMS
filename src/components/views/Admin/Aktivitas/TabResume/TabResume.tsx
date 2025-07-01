import DataTable from "@/components/ui/DataTable";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import { COLUMN_LISTS } from "./TabResume.constants";
import useTabResume from "./useTabResume";
import { convertTime } from "@/utils/date";
import { IKajian } from "@/types/Kajian";
import { IProfile, IRegister } from "@/types/Auth";
import { Button, Input } from "@heroui/react";

const TabResume = () => {
  const { push, isReady, query } = useRouter();
  const { 
    dataResume,
    isPendingResume,
    isRefetchingResume,

    dataKajian,
    isPendingKajian,

    dataUser,
    isPendingUser,

    filteredData,

    searchKajian,
    searchUser,
    sortOrder,
    setSearchKajian,
    setSearchUser,
    setSortOrder,

    handleDownloadExcel,
  } = useTabResume()
  
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  
  const getKajianTitle = (kajianId: string) => {
    const kajian = dataKajian?.data?.find((item: IKajian) => item._id === kajianId);
    return kajian?.title;
  };

  const getUserById = (userId: string) => {
    const user = dataUser?.data?.find((item: IProfile) => item._id === userId)
    return user?.fullName
  }

  const renderCell = useCallback(
    (resume: Record<string, unknown>, columnKey: Key) => {
      const cellValue = resume[columnKey as keyof typeof resume];

      switch (columnKey) {
        case "createdAt":
          return (
            <p>{convertTime(`${resume.createdAt}`)}</p>
          );
        case "title":
          return (
            <h2>{getKajianTitle(`${resume.kajian}`)}</h2>
          );
        case "createdBy":
          return (
            <h2>{getUserById(`${resume.createdBy}`)}</h2>
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push, getKajianTitle, dataKajian],
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
            placeholder="Cari bedasarkan kajian..."
            value={searchKajian}
            onChange={(e) => setSearchKajian(e.target.value)}
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
          data={filteredData || []}
          emptyContent="Resume is empty"
          isLoading={isPendingResume || isRefetchingResume || isPendingKajian || isPendingKajian || isPendingUser}
          renderCell={renderCell}
          totalPages={dataResume?.pagination?.totalPages}
          showSearch={false}
        />
      )}
    </section>
  );
};

export default TabResume;
