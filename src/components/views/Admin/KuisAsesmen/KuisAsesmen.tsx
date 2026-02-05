import DataTable from "@/components/ui/DataTable";
import { useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import DropdownAction from "@/components/commons/DropdownAction";
import DeleteKuisModal from "./DeleteKuisModal";
import AddKuisModal from "./AddKuisModal";
import { convertTime } from "@/utils/date";
import useChangeUrl from "@/hooks/useChangeUrl";
import { COLUMN_LISTS } from "./KuisAsesmen.constants";
import useKuisAsesmen from "./useKuisAsesmen";

const KuisAsesmen = () => {
  const { push, query } = useRouter();
  const {
    dataKuis,
    isLoadingKuis,
    isRefetchingKuis,
    refetchKuis,
    selectedId,
    setSelectedId,
    dataAsesmen,
    isPendingAsesmen,
    isReady,
  } = useKuisAsesmen()

  const { setUrl } = useChangeUrl()

  const title = dataAsesmen?.title
  
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
        case "byAsesmen":
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
                push(`/admin/asesmen/kuis/update/${kuis._id}`)
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
          buttonTopContentLabel="Create Kuis Asesmen"
          columns={COLUMN_LISTS}
          data={dataKuis?.data || []}
          emptyContent="Kuis is empty"
          isLoading={isLoadingKuis || isRefetchingKuis || isPendingAsesmen}
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

export default KuisAsesmen;
