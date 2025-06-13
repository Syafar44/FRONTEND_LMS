import DataTable from "@/components/ui/DataTable";
import { useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback } from "react";
import DropdownAction from "@/components/commons/DropdownAction";
import { COLUMN_LISTS_CORE } from "./Core.constants";
import useCore from "./useCore";
import DeleteCoreModal from "./DeleteCoreModal";
import AddCoreModal from "./AddCoreModal";

const Core = () => {
  const { push, query } = useRouter();
  const {
    dataKuisCore,
    isLoadingKuisCore,
    isRefetchingKuisCore,
    refetchKuisCore,
    selectedId,
    setSelectedId,
  } = useCore()

  const addCoreModal = useDisclosure();
  const deleteCoreModal = useDisclosure();

  const renderCell = useCallback(
    (core: Record<string, unknown>, columnKey: Key) => {
      const cellValue = core[columnKey as keyof typeof core];

      switch (columnKey) {
        case "actions":
          return (
            <DropdownAction
              hideButtonUpdate={true}
              onPressButtonDetail={() =>
                push(`/admin/kelas-kompetensi/core/kuis/update/${core._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${core._id}`);
                deleteCoreModal.onOpen();
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
          buttonTopContentLabel="Create Kuis Core"
          columns={COLUMN_LISTS_CORE}
          data={dataKuisCore?.data || []}
          emptyContent="Kuis Core is empty"
          isLoading={isLoadingKuisCore || isRefetchingKuisCore}
          onClickButtonTopContent={addCoreModal.onOpen}
          renderCell={renderCell}
          totalPages={dataKuisCore?.pagination?.totalPages}
        />
      )}
      <AddCoreModal
        {...addCoreModal}
        competencyId={`${dataKuisCore?._id}`}
        refetchCore={refetchKuisCore}
      />
      <DeleteCoreModal
        {...deleteCoreModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchCore={refetchKuisCore}
      />
    </section>
  );
};

export default Core;
