import DataTable from "@/components/ui/DataTable";
import { useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import useManagerial from "./useManagerial";
import DeleteManagerialModal from "./DeleteManagerialModal";
import AddManagerialModal from "./AddManagerialModal";
import { COLUMN_LISTS_MANAGERIAL } from "./Managerial.constants";

const Managerial = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataManagerial,
    isLoadingManagerial,
    isRefetchingManagerial,
    refetchManagerial,

    selectedId,
    setSelectedId,
  } = useManagerial()

  const addManagerialModal = useDisclosure();
  const deleteManagerialModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (managerial: Record<string, unknown>, columnKey: Key) => {
      const cellValue = managerial[columnKey as keyof typeof managerial];

      switch (columnKey) {
        case "icon":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
          );
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() =>
                push(`/admin/kelas-kompetensi/managerial/${managerial.slug}`)
              }
              onPressButtonUpdate={() =>
                push(`/admin/kelas-kompetensi/managerial/update/${managerial._id}`)
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
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Managerial"
          columns={COLUMN_LISTS_MANAGERIAL}
          data={dataManagerial?.data || []}
          emptyContent="Managerial is empty"
          isLoading={isLoadingManagerial || isRefetchingManagerial}
          onClickButtonTopContent={addManagerialModal.onOpen}
          renderCell={renderCell}
          totalPages={dataManagerial?.pagination?.totalPages}
        />
      )}
      <AddManagerialModal
        {...addManagerialModal}
        refetchManagerial={refetchManagerial}
      />
      <DeleteManagerialModal
        {...deleteManagerialModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchManagerial={refetchManagerial}
      />
    </section>
  );
};

export default Managerial;
