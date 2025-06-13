import DataTable from "@/components/ui/DataTable";
import { useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import useKajian from "./useKajian";
import DeleteKajianModal from "./DeleteKajianModal";
import AddKajianModal from "./AddKajianModal";
import { COLUMN_LISTS_KAJIAN } from "./Kajian.constants";

const Kajian = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataKajian,
    isLoadingKajian,
    isRefetchingKajian,
    refetchKajian,

    selectedId,
    setSelectedId,
  } = useKajian()

  const addKajianModal = useDisclosure();
  const deleteKajianModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (kajian: Record<string, unknown>, columnKey: Key) => {
      const cellValue = kajian[columnKey as keyof typeof kajian];

      switch (columnKey) {
        case "actions":
          return (
            <DropdownAction
              hideButtonUpdate={true}
              onPressButtonDetail={() =>
                push(`/admin/kajian-online/${kajian._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${kajian._id}`);
                deleteKajianModal.onOpen();
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
          buttonTopContentLabel="Create Kajian"
          columns={COLUMN_LISTS_KAJIAN}
          data={dataKajian?.data || []}
          emptyContent="Kajian is empty"
          isLoading={isLoadingKajian || isRefetchingKajian}
          onClickButtonTopContent={addKajianModal.onOpen}
          renderCell={renderCell}
          totalPages={dataKajian?.pagination?.totalPages}
        />
      )}
      <AddKajianModal
        {...addKajianModal}
        refetchKajian={refetchKajian}
      />
      <DeleteKajianModal
        {...deleteKajianModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchKajian={refetchKajian}
      />
    </section>
  );
};

export default Kajian;
