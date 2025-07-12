import DataTable from "@/components/ui/DataTable";
import { useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import { COLUMN_LISTS } from "./SubCompetency.constants";
import useSubCompetency from "./useSubCompetency";
import DeleteSubCompetencyModal from "./DeleteSubCompetencyModal";
import AddSubCompetencyModal from "./AddSubCompetencyModal";
import { convertTime } from "@/utils/date";

const SubCompetency = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataCompetency,
    isLoadingCompetency,
    isRefetchingCompetency,
    refetchCompetency,

    dataSubCompetency,
    isLoadingSubCompetency,
    isRefetchingSubCompetency,
    refetchSubCompetency,

    selectedId,
    setSelectedId,
    slug,
    pathSegments,
  } = useSubCompetency()

  const addSubCompetencyModal = useDisclosure();
  const deleteSubCompetencyModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (subCompetency: Record<string, unknown>, columnKey: Key) => {
      const cellValue = subCompetency[columnKey as keyof typeof subCompetency];

      switch (columnKey) {
        case "competency" :
          return (
            <p>
              {slug}
            </p>
          );
        case "createdAt":
          return (
            <div>
              <span>{convertTime(`${subCompetency.createdAt}`)}</span>
            </div>
          );
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() =>
                push(`/admin/kelas-kompetensi/${pathSegments[3]}/kuis/${subCompetency._id}`)
              }
              onPressButtonUpdate={() =>
                push(`/admin/kelas-kompetensi/${pathSegments[3]}/subupdate/${subCompetency._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${subCompetency._id}`);
                deleteSubCompetencyModal.onOpen();
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
          buttonTopContentLabel="Create Sub SubCompetency"
          columns={COLUMN_LISTS}
          data={dataSubCompetency?.data || []}
          emptyContent="Sub Competency is empty"
          isLoading={isLoadingSubCompetency || isRefetchingSubCompetency}
          onClickButtonTopContent={addSubCompetencyModal.onOpen}
          renderCell={renderCell}
          totalPages={dataSubCompetency?.pagination?.totalPages}
        />
      )}
      <AddSubCompetencyModal
        {...addSubCompetencyModal}
        competencyId={`${dataCompetency?._id}`}
        refetch={refetchSubCompetency}
      />
      <DeleteSubCompetencyModal
        {...deleteSubCompetencyModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetch={refetchSubCompetency}
      />
    </section>
  );
};

export default SubCompetency;
