import DataTable from "@/components/ui/DataTable";
import { useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback } from "react";
import DropdownAction from "@/components/commons/DropdownAction";
import useFunctional from "./useFunctional";
import DeleteFunctionalModal from "./DeleteFunctionalModal";
import AddFunctionalModal from "./AddFunctionalModal";
import { COLUMN_LISTS_FUNCTIONAL } from "./Functional.constants";

const Functional = () => {
  const { push, query } = useRouter();
  const {
    dataKuisFunctional,
    isLoadingKuisFunctional,
    isRefetchingKuisFunctional,
    refetchKuisFunctional,
    selectedId,
    setSelectedId,
  } = useFunctional()

  const addFunctionalModal = useDisclosure();
  const deleteFunctionalModal = useDisclosure();

  const renderCell = useCallback(
    (functional: Record<string, unknown>, columnKey: Key) => {
      const cellValue = functional[columnKey as keyof typeof functional];

      switch (columnKey) {
        case "actions":
          return (
            <DropdownAction
              hideButtonUpdate={true}
              onPressButtonDetail={() =>
                push(`/admin/kelas-kompetensi/functional/kuis/update/${functional._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${functional._id}`);
                deleteFunctionalModal.onOpen();
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
          buttonTopContentLabel="Create Kuis Functional"
          columns={COLUMN_LISTS_FUNCTIONAL}
          data={dataKuisFunctional?.data || []}
          emptyContent="Kuis Functional is empty"
          isLoading={isLoadingKuisFunctional || isRefetchingKuisFunctional}
          onClickButtonTopContent={addFunctionalModal.onOpen}
          renderCell={renderCell}
          totalPages={dataKuisFunctional?.pagination?.totalPages}
        />
      )}
      <AddFunctionalModal
        {...addFunctionalModal}
        competencyId={`${dataKuisFunctional?._id}`}
        refetchFunctional={refetchKuisFunctional}
      />
      <DeleteFunctionalModal
        {...deleteFunctionalModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchFunctional={refetchKuisFunctional}
      />
    </section>
  );
};

export default Functional;
