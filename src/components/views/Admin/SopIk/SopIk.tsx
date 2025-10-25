import DataTable from "@/components/ui/DataTable";
import { useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import { COLUMN_LISTS } from "./SopIk.constants";
import useSopIk from "./useSopIk";
import DeleteSopIkModal from "./DeleteSopIkModal";
import AddSopIkModal from "./AddSopIkModal";
import { convertTime } from "@/utils/date";

const SopIk = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataSopIk,
    isLoadingSopIk,
    isRefetchingSopIk,
    refetchSopIk,

    selectedId,
    setSelectedId,

    pathSegments,
  } = useSopIk()

  const addSopIkModal = useDisclosure();
  const deleteSopIkModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (sopIk: Record<string, unknown>, columnKey: Key) => {
      const cellValue = sopIk[columnKey as keyof typeof sopIk];

      switch (columnKey) {
        case "actions":
          return (
            <DropdownAction
              textButton="List Kuis"
              onPressButtonDetail={() =>
                push(`/admin/sopdanik/kuis/${sopIk._id}`)
              }
              onPressButtonUpdate={() =>
                push(`/admin/sopdanik/${sopIk._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${sopIk._id}`);
                deleteSopIkModal.onOpen();
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
          buttonTopContentLabel="Create SOP & IK"
          columns={COLUMN_LISTS}
          data={dataSopIk?.data || []}
          emptyContent="SOP & IK is empty"
          isLoading={isLoadingSopIk || isRefetchingSopIk}
          onClickButtonTopContent={addSopIkModal.onOpen}
          renderCell={renderCell}
          totalPages={dataSopIk?.pagination?.totalPages}
        />
      )}
      <AddSopIkModal
        {...addSopIkModal}
        refetchSopIk={refetchSopIk}
      />
      <DeleteSopIkModal
        {...deleteSopIkModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchSopIk={refetchSopIk}
      />
    </section>
  );
};

export default SopIk;
