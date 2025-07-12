import DataTable from "@/components/ui/DataTable";
import { useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import { COLUMN_LISTS } from "./Competency.constants";
import useCompetency from "./useCompetency";
import DeleteCompetencyModal from "./DeleteCompetencyModal";
import AddCompetencyModal from "./AddCompetencyModal";
import { convertTime } from "@/utils/date";

const Competency = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataCompetency,
    isLoadingCompetency,
    isRefetchingCompetency,
    refetchCompetency,

    selectedId,
    setSelectedId,

    pathSegments,
  } = useCompetency()

  const addCompetencyModal = useDisclosure();
  const deleteCompetencyModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (competency: Record<string, unknown>, columnKey: Key) => {
      const cellValue = competency[columnKey as keyof typeof competency];

      switch (columnKey) {
        case "createdAt":
          return (
            <div>
              <span>{convertTime(`${competency.createdAt}`)}</span>
            </div>
          );
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() =>
                push(`/admin/kelas-kompetensi/${pathSegments[3]}/${competency.slug}`)
              }
              onPressButtonUpdate={() =>
                push(`/admin/kelas-kompetensi/${pathSegments[3]}/update/${competency._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${competency._id}`);
                deleteCompetencyModal.onOpen();
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
          buttonTopContentLabel="Create Competency"
          columns={COLUMN_LISTS}
          data={dataCompetency?.data || []}
          emptyContent="Competency is empty"
          isLoading={isLoadingCompetency || isRefetchingCompetency}
          onClickButtonTopContent={addCompetencyModal.onOpen}
          renderCell={renderCell}
          totalPages={dataCompetency?.pagination?.totalPages}
        />
      )}
      <AddCompetencyModal
        {...addCompetencyModal}
        refetchCompetency={refetchCompetency}
      />
      <DeleteCompetencyModal
        {...deleteCompetencyModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchCompetency={refetchCompetency}
      />
    </section>
  );
};

export default Competency;
