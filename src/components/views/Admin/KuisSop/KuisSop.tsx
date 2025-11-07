import DataTable from "@/components/ui/DataTable";
import { useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import DropdownAction from "@/components/commons/DropdownAction";
import DeleteKuisModal from "./DeleteKuisModal";
import AddKuisModal from "./AddKuisModal";
import { convertTime } from "@/utils/date";
import useChangeUrl from "@/hooks/useChangeUrl";
import useKuisSop from "./useKuisSop";
import { COLUMN_LISTS } from "./KuisSop.constants";

const KuisSop = () => {
  const { push, query } = useRouter();
  const {
    dataKuis,
    isLoadingKuis,
    isRefetchingKuis,
    refetchKuis,
    selectedId,
    setSelectedId,
    dataSop,
    isPendingSop,
    isReady,
  } = useKuisSop()

  const { setUrl } = useChangeUrl()

  const title = dataSop?.title
  
  const addKuisModal = useDisclosure();
  const deleteCoreModal = useDisclosure();

    useEffect(() => {
      if (isReady) {
        setUrl();
      }
    }, [isReady]);

  const renderCell = useCallback(
    (kuis: Record<string, unknown>, columnKey: Key) => {
      const cellValue = kuis[columnKey as keyof typeof kuis];

      switch (columnKey) {
        case "bySop":
          return (
            <div>
              <span>{`${title}`}</span>
            </div>
          );
        case "createdAt":
          return (
            <div>
              <span>{convertTime(`${kuis.createdAt}`)}</span>
            </div>
          );
        case "actions":
          return (
            <DropdownAction
              hideButtonUpdate={true}
              onPressButtonDetail={() =>
                push(`/admin/sop/kuis/update/${kuis._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${kuis._id}`);
                deleteCoreModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push, title],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Kuis SOP"
          columns={COLUMN_LISTS}
          data={dataKuis?.data || []}
          emptyContent="Kuis is empty"
          isLoading={isLoadingKuis || isRefetchingKuis || isPendingSop}
          onClickButtonTopContent={addKuisModal.onOpen}
          renderCell={renderCell}
          totalPages={dataKuis?.pagination?.totalPages}
        />
      )}
      <AddKuisModal
        {...addKuisModal}
        competencyId={`${dataKuis?._id}`}
        refetchKuis={refetchKuis}
      />
      <DeleteKuisModal
        {...deleteCoreModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchKuis={refetchKuis}
      />
    </section>
  );
};

export default KuisSop;
