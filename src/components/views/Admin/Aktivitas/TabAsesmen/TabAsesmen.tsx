import DataTable from "@/components/ui/DataTable";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect, useState } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import { COLUMN_LISTS } from "./TabAsesmen.constants";
import useTabAsesmen from "./useTabAsesmen";
import { convertTime } from "@/utils/date";
import DropdownAction from "@/components/commons/DropdownAction";
import { downloadRetAsesmenExcel } from "@/utils/downloadRetAsesmenExcel";

const TabAsesmen = () => {
  const { push, isReady, query } = useRouter();

  const {
    dataPartAsesmen,
    isPendingPartAsesmen,
    isRefetchingPartAsesmen,
    refetchPartAsesmen,
    selectedId,
    setSelectedId,
    isPendingRetAsesmen,
    dataRetAsesmen,
    isPendingAsesmen,
    dataAsesmen,
    dataPartUserAsesmen,
    isPendingPartUserAsesmen,
  } = useTabAsesmen();
  
  const { 
    setUrl,
  } = useChangeUrl();

  const [shouldDownload, setShouldDownload] = useState(false);

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  useEffect(() => {
    if (
      shouldDownload &&
      dataAsesmen?.data?.length &&
      dataRetAsesmen?.data?.length
    ) {
      downloadRetAsesmenExcel(
        dataPartUserAsesmen.title,
        dataAsesmen.data,
        dataRetAsesmen.data
      );

      setShouldDownload(false);
    }
  }, [shouldDownload, dataAsesmen, dataRetAsesmen]);


  const renderCell = useCallback(
    (score: any, columnKey: Key) => {
      const cellValue = score[columnKey as keyof typeof score];
      switch (columnKey) {
        case "createdAt":
          return (
            <p>{convertTime(`${score.createdAt}`)}</p>
          );
        case "actions":
          return (
            <DropdownAction
              hideButtonUpdate={true}
              textButton="Download Hasil"
              onPressButtonDetail={() => {
                setSelectedId(`${score._id}`);
                setShouldDownload(true);
              }}
              // onPressButtonDelete={() => {
              //   setSelectedId(`${score._id}`);
              //   deleteCoreModal.onOpen();
              // }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          columns={COLUMN_LISTS}
          data={dataPartAsesmen?.data || []}
          emptyContent="Participant Asesmen is empty"
          isLoading={isPendingPartAsesmen || isRefetchingPartAsesmen || isPendingAsesmen}
          renderCell={renderCell}
          totalPages={dataPartAsesmen?.pagination?.totalPages}
          showSearch={false}
        />
      )}
    </section>
  );
};

export default TabAsesmen;
