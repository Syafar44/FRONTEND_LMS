import DataTable from "@/components/ui/DataTable";
import { useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import useFunctional from "./useFunctional";
import DeleteFunctionalModal from "./DeleteFunctionalModal";
import AddFunctionalModal from "./AddFunctionalModal";
import { COLUMN_LISTS_FUNCTIONAL } from "./Functional.constants";

const Functional = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataFunctional,
    dataSubFunctional,
    isLoadingSubFunctional,
    isRefetchingSubFunctional,
    refetchSubFunctional,

    selectedId,
    setSelectedId,
    slug,
  } = useFunctional()

  const addFunctionalModal = useDisclosure();
  const deleteFunctionalModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (functional: Record<string, unknown>, columnKey: Key) => {
      const cellValue = functional[columnKey as keyof typeof functional];

      switch (columnKey) {
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() =>
                push(`/admin/kelas-kompetensi/functional/kuis/${functional._id}`)
              }
              onPressButtonUpdate={() =>
                push(`/admin/kelas-kompetensi/functional/update/${functional._id}`)
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
          buttonTopContentLabel="Create Sub Functional"
          columns={COLUMN_LISTS_FUNCTIONAL}
          data={dataSubFunctional?.data || []}
          emptyContent="Sub Functional is empty"
          isLoading={isLoadingSubFunctional || isRefetchingSubFunctional}
          onClickButtonTopContent={addFunctionalModal.onOpen}
          renderCell={renderCell}
          totalPages={dataSubFunctional?.pagination?.totalPages}
        />
      )}
      <AddFunctionalModal
        {...addFunctionalModal}
        competencyId={`${dataFunctional?._id}`}
        refetchFunctional={refetchSubFunctional}
      />
      <DeleteFunctionalModal
        {...deleteFunctionalModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchFunctional={refetchSubFunctional}
      />
    </section>
  );
};

export default Functional;
