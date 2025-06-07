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
    isLoadingFunctional,
    isRefetchingFunctional,
    refetchFunctional,

    selectedId,
    setSelectedId,
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
        case "icon":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
          );
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() =>
                push(`/admin/kelas-kompetensi/functional/${functional.slug}`)
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
          buttonTopContentLabel="Create Functional"
          columns={COLUMN_LISTS_FUNCTIONAL}
          data={dataFunctional?.data?.data || []}
          emptyContent="Functional is empty"
          isLoading={isLoadingFunctional || isRefetchingFunctional}
          onClickButtonTopContent={addFunctionalModal.onOpen}
          renderCell={renderCell}
          totalPages={dataFunctional?.pagination?.totalPages}
        />
      )}
      <AddFunctionalModal
        {...addFunctionalModal}
        refetchFunctional={refetchFunctional}
      />
      <DeleteFunctionalModal
        {...deleteFunctionalModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchFunctional={refetchFunctional}
      />
    </section>
  );
};

export default Functional;
