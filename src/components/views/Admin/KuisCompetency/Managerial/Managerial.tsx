import DataTable from "@/components/ui/DataTable";
import { useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback } from "react";
import DropdownAction from "@/components/commons/DropdownAction";
import useManagerial from "./useManagerial";
import DeleteManagerialModal from "./DeleteManagerialModal";
import AddManagerialModal from "./AddManagerialModal";
import { COLUMN_LISTS_MANAGERIAL } from "./Managerial.constants";
import { convertTime } from "@/utils/date";

const Managerial = () => {
  const { push, query } = useRouter();
  const {
    dataKuisManagerial,
    isLoadingKuisManagerial,
    isRefetchingKuisManagerial,
    refetchKuisManagerial,
    selectedId,
    setSelectedId,
    dataSubCompetency,
    isPendingSubCompetency,
  } = useManagerial()

  const title = dataSubCompetency?.title

  const addManagerialModal = useDisclosure();
  const deleteManagerialModal = useDisclosure();

  const renderCell = useCallback(
    (managerial: Record<string, unknown>, columnKey: Key) => {
      const cellValue = managerial[columnKey as keyof typeof managerial];

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
              <span>{convertTime(`${managerial.createdAt}`)}</span>
            </div>
          );
        case "actions":
          return (
            <DropdownAction
              hideButtonUpdate={true}
              onPressButtonDetail={() =>
                push(`/admin/kelas-kompetensi/managerial/kuis/update/${managerial._id}`)
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
    [push, title],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Kuis Managerial"
          columns={COLUMN_LISTS_MANAGERIAL}
          data={dataKuisManagerial?.data || []}
          emptyContent="Kuis Managerial is empty"
          isLoading={isLoadingKuisManagerial || isRefetchingKuisManagerial || isPendingSubCompetency}
          onClickButtonTopContent={addManagerialModal.onOpen}
          renderCell={renderCell}
          totalPages={dataKuisManagerial?.pagination?.totalPages}
        />
      )}
      <AddManagerialModal
        {...addManagerialModal}
        competencyId={`${dataKuisManagerial?._id}`}
        refetchManagerial={refetchKuisManagerial}
      />
      <DeleteManagerialModal
        {...deleteManagerialModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchManagerial={refetchKuisManagerial}
      />
    </section>
  );
};

export default Managerial;
