import DataTable from "@/components/ui/DataTable";
import { Key, ReactNode, useCallback, useEffect, useState } from "react";
import { convertTime } from "@/utils/date";
import DropdownAction from "@/components/commons/DropdownAction";
import { useRouter } from "next/router";
import useTabAsesmen from "./useTabAsesmen";
import useChangeUrl from "@/hooks/useChangeUrl";
import { COLUMN_LISTS_ASESMEN, COLUMN_LISTS_PART_ASESMEN } from "./Asesmen.constants";
import { useDisclosure } from "@heroui/react";
import AddAsesmenModal from "./AddAsesmenModal";
import AddPartAsesmenModal from "./AddPartAsesmenModal";
import DeleteAsesmenModal from "./DeleteAsesmenModal";
import DeletePartAsesmenModal from "./DeletePartAsesmenModal";

const TabAsesmen = () => {
  const { push, isReady, query } = useRouter();
  const [selectedIdAsesmen, setSelectedIdAsesmen] = useState("");
  const [selectedIdPartAsesmen, setSelectedIdPartAsesmen] = useState("");

  const { dataAsesmen, isLoadingAsesmen, isRefetchingAsesmen, refetchAsesmen, dataPartAsesmen, isLoadingPartAsesmen, isRefetchingPartAsesmen, refetchPartAsesmen } = useTabAsesmen();
  
  const { setUrl } = useChangeUrl();

  const addAsesmenModal = useDisclosure();
  const addPartAsesmenModal = useDisclosure();
  const deleteAsesmenModal = useDisclosure();
  const deletePartAsesmenModal = useDisclosure();

  useEffect(() => {
      if (isReady) {
        setUrl();
      }
    }, [isReady]);

  const renderCell = useCallback(
    (asesmen: Record<string, unknown>, columnKey: Key) => {
      const cellValue = asesmen[columnKey as keyof typeof asesmen];

      switch (columnKey) {
        case "actions":
          return (
            <DropdownAction
              textButton="List Kuis"
              onPressButtonUpdate={() =>
                push(`/admin/asesmen/${asesmen._id}`)
              }
              onPressButtonDetail={() =>
                push(`/admin/asesmen/kuis/${asesmen._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedIdAsesmen(`${asesmen._id}`);
                deleteAsesmenModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  const renderCellPart = useCallback(
    (partasesmen: Record<string, unknown>, columnKey: Key) => {
      const cellValue = partasesmen[columnKey as keyof typeof partasesmen];

      switch (columnKey) {
        case "createdAt":
          return (
            <div>
              <span>{convertTime(`${partasesmen.createdAt}`)}</span>
            </div>
          );
        case "actions":
          return (
            <DropdownAction
              hideButtonUpdate={true}
              onPressButtonDetail={() =>
                push(`/admin/partasesmen/${partasesmen._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedIdPartAsesmen(`${partasesmen._id}`);
                deletePartAsesmenModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
      <section className="md:flex gap-5">
          <div className="w-3/4">
              <DataTable
                  buttonTopContentLabel="Tambahkan Peserta"
                  columns={COLUMN_LISTS_PART_ASESMEN}
                  data={dataPartAsesmen?.data || []}
                  emptyContent="Peserta is empty"
                  isLoading={isLoadingPartAsesmen || isRefetchingPartAsesmen}
                  onClickButtonTopContent={addPartAsesmenModal.onOpen}
                  renderCell={renderCellPart}
                  totalPages={dataPartAsesmen?.pagination?.totalPages}
              />
          </div>
          <div className="w-[1/4]">
              <DataTable
                  buttonTopContentLabel="Tambahkan Asesmen"
                  columns={COLUMN_LISTS_ASESMEN}
                  data={dataAsesmen?.data || []}
                  emptyContent="Asesmen is empty"
                  isLoading={isLoadingAsesmen || isRefetchingAsesmen}
                  onClickButtonTopContent={addAsesmenModal.onOpen}
                  renderCell={renderCell}
                  totalPages={dataAsesmen?.pagination?.totalPages}
              />
          </div>
          <AddAsesmenModal 
            isOpen={addAsesmenModal.isOpen}
            onClose={addAsesmenModal.onClose}
            refetchAsesmen={refetchAsesmen}
            onOpenChange={addAsesmenModal.onOpen}
          />
          <AddPartAsesmenModal
            isOpen={addPartAsesmenModal.isOpen}
            onClose={addPartAsesmenModal.onClose}
            refetchPartAsesmen={refetchPartAsesmen}
            onOpenChange={addPartAsesmenModal.onOpen}
          />
          <DeleteAsesmenModal 
            isOpen={deleteAsesmenModal.isOpen}
            onClose={deleteAsesmenModal.onClose}
            refetchAsesmen={refetchAsesmen}
            onOpenChange={deleteAsesmenModal.onOpen}
            selectedId={selectedIdAsesmen}
            setSelectedId={setSelectedIdAsesmen}
          />
          <DeletePartAsesmenModal
            isOpen={deletePartAsesmenModal.isOpen}
            onClose={deletePartAsesmenModal.onClose}
            refetchPartAsesmen={refetchPartAsesmen}
            onOpenChange={deletePartAsesmenModal.onOpen}
            selectedId={selectedIdPartAsesmen}
            setSelectedId={setSelectedIdPartAsesmen}
          />
      </section>
  )
}

export default TabAsesmen;