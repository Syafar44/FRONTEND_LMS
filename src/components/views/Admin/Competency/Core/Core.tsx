import DataTable from "@/components/ui/DataTable";
import { useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import { COLUMN_LISTS_CORE } from "./Core.constants";
import useCore from "./useCore";
import DeleteCoreModal from "./DeleteCoreModal";
import AddCoreModal from "./AddCoreModal";
import { convertTime } from "@/utils/date";

const Core = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataCore,
    isLoadingCore,
    isRefetchingCore,
    refetchCore,

    selectedId,
    setSelectedId,
  } = useCore()

  const addCoreModal = useDisclosure();
  const deleteCoreModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (core: Record<string, unknown>, columnKey: Key) => {
      const cellValue = core[columnKey as keyof typeof core];

      switch (columnKey) {
        case "createdAt":
          return (
            <div>
              <span>{convertTime(`${core.createdAt}`)}</span>
            </div>
          );
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() =>
                push(`/admin/kelas-kompetensi/core/${core.slug}`)
              }
              onPressButtonUpdate={() =>
                push(`/admin/kelas-kompetensi/core/update/${core._id}`)
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
          buttonTopContentLabel="Create Core"
          columns={COLUMN_LISTS_CORE}
          data={dataCore?.data || []}
          emptyContent="Core is empty"
          isLoading={isLoadingCore || isRefetchingCore}
          onClickButtonTopContent={addCoreModal.onOpen}
          renderCell={renderCell}
          totalPages={dataCore?.pagination?.totalPages}
        />
      )}
      <AddCoreModal
        {...addCoreModal}
        refetchCore={refetchCore}
      />
      <DeleteCoreModal
        {...deleteCoreModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchCore={refetchCore}
      />
    </section>
  );
};

export default Core;
