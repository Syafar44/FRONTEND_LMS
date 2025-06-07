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

const Core = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataCore,
    dataSubCore,
    isLoadingSubCore,
    isRefetchingSubCore,
    refetchSubCore,

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
        case "icon":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
          );
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() =>
                push(`/admin/kelas-kompetensi/core/${core.slug}`)
              }
              onPressButtonUpdate={() =>
                push(`/admin/kelas-kompetensi/core/${core._id}`)
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

  console.log(dataSubCore)

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Sub Core"
          columns={COLUMN_LISTS_CORE}
          data={dataSubCore?.data || []}
          emptyContent="Sub Core is empty"
          isLoading={isLoadingSubCore || isRefetchingSubCore}
          onClickButtonTopContent={addCoreModal.onOpen}
          renderCell={renderCell}
          totalPages={dataSubCore?.pagination?.totalPages}
        />
      )}
      <AddCoreModal
        {...addCoreModal}
        competencyId={`${dataCore?._id}`}
        refetchCore={refetchSubCore}
      />
      <DeleteCoreModal
        {...deleteCoreModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchCore={refetchSubCore}
      />
    </section>
  );
};

export default Core;
