import DataTable from "@/components/ui/DataTable";
import { useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback } from "react";
import DropdownAction from "@/components/commons/DropdownAction";
import { COLUMN_LISTS } from "./KuisCompetency.constants";
import useKuisCompetency from "./useKuisCompetency";
import DeleteKuisModal from "./DeleteKuisModal";
import AddKuisModal from "./AddKuisModal";
import { convertTime } from "@/utils/date";

const KuisCompetency = () => {
  const { push, query } = useRouter();
  const {
    dataKuis,
    isLoadingKuis,
    isRefetchingKuis,
    refetchKuis,
    selectedId,
    setSelectedId,
    dataSubCompetency,
    isPendingSubCompetency,
    pathSegments,
  } = useKuisCompetency()

  const title = dataSubCompetency?.title
  
  const addKuisModal = useDisclosure();
  const deleteCoreModal = useDisclosure();

  const renderCell = useCallback(
    (kuis: Record<string, unknown>, columnKey: Key) => {
      const cellValue = kuis[columnKey as keyof typeof kuis];

      switch (columnKey) {
        case "subCompetency":
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
                push(`/admin/kelas-kompetensi/${pathSegments[3]}/kuis/update/${kuis._id}`)
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
          buttonTopContentLabel="Create Kuis Competency"
          columns={COLUMN_LISTS}
          data={dataKuis?.data || []}
          emptyContent="Kuis is empty"
          isLoading={isLoadingKuis || isRefetchingKuis || isPendingSubCompetency}
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

export default KuisCompetency;
