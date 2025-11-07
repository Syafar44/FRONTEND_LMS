import DataTable from "@/components/ui/DataTable";
import { useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import { COLUMN_LISTS } from "./Ik.constants";
import useIk from "./useIk";
import DeleteIkModal from "./DeleteIkModal";
import AddIkModal from "./AddIkModal";

const Ik = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataIk,
    isLoadingIk,
    isRefetchingIk,
    refetchIk,

    selectedId,
    setSelectedId,
  } = useIk()

  const addIkModal = useDisclosure();
  const deleteIkModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (ik: Record<string, unknown>, columnKey: Key) => {
      const cellValue = ik[columnKey as keyof typeof ik];

      switch (columnKey) {
        case "actions":
          return (
            <DropdownAction
              textButton="List Kuis"
              onPressButtonDetail={() =>
                push(`/admin/ik/kuis/${ik._id}`)
              }
              onPressButtonUpdate={() =>
                push(`/admin/ik/${ik._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${ik._id}`);
                deleteIkModal.onOpen();
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
          buttonTopContentLabel="Create IK"
          columns={COLUMN_LISTS}
          data={dataIk?.data || []}
          emptyContent="IK is empty"
          isLoading={isLoadingIk || isRefetchingIk}
          onClickButtonTopContent={addIkModal.onOpen}
          renderCell={renderCell}
          totalPages={dataIk?.pagination?.totalPages}
        />
      )}
      <AddIkModal
        {...addIkModal}
        refetchIk={refetchIk}
      />
      <DeleteIkModal
        {...deleteIkModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchIk={refetchIk}
      />
    </section>
  );
};

export default Ik;
