import DataTable from "@/components/ui/DataTable";
import { useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import useManagerial from "./useManagerial";
import DeleteManagerialModal from "./DeleteManagerialModal";
import AddManagerialModal from "./AddManagerialModal";
import { COLUMN_LISTS_MANAGERIAL } from "./Managerial.constants";

const Managerial = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataManagerial,
    dataSubManagerial,
    isLoadingSubManagerial,
    isRefetchingSubManagerial,
    refetchSubManagerial,

    selectedId,
    setSelectedId,

    slug,
  } = useManagerial()

  const addManagerialModal = useDisclosure();
  const deleteManagerialModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (managerial: Record<string, unknown>, columnKey: Key) => {
      const cellValue = managerial[columnKey as keyof typeof managerial];

      switch (columnKey) {
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() =>
                push(`/admin/kelas-kompetensi/managerial/kuis/${managerial._id}`)
              }
              onPressButtonUpdate={() =>
                push(`/admin/kelas-kompetensi/managerial/update/${managerial._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${managerial._id}`);
                deleteManagerialModal.onOpen();
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
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Sub Managerial"
          columns={COLUMN_LISTS_MANAGERIAL}
          data={dataSubManagerial?.data || []}
          emptyContent="Sub Managerial is empty"
          isLoading={isLoadingSubManagerial || isRefetchingSubManagerial}
          onClickButtonTopContent={addManagerialModal.onOpen}
          renderCell={renderCell}
          totalPages={dataSubManagerial?.pagination?.totalPages}
        />
      )}
      <AddManagerialModal
        {...addManagerialModal}
        competencyId={`${dataManagerial?._id}`}
        refetchManagerial={refetchSubManagerial}
      />
      <DeleteManagerialModal
        {...deleteManagerialModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchManagerial={refetchSubManagerial}
      />
    </section>
  );
};

export default Managerial;
