import DataTable from "@/components/ui/DataTable";
import { Button, useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import { COLUMN_LISTS } from "./Sop.constants";
import useSop from "./useSop";
import DeleteSopModal from "./DeleteSopModal";
import AddSopModal from "./AddSopModal";
import { PiFilePdfLight } from "react-icons/pi";

const Sop = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataSop,
    isLoadingSop,
    isRefetchingSop,
    refetchSop,

    selectedId,
    setSelectedId,
  } = useSop()

  const addSopModal = useDisclosure();
  const deleteSopModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (sop: Record<string, unknown>, columnKey: Key) => {
      const cellValue = sop[columnKey as keyof typeof sop];

      switch (columnKey) {
        case 'file' :
          const handleDownload = () => {
            window.open(`${sop.file}`, "_blank");
          };
          return (
            <Button onPress={handleDownload} className="bg-red-700/80 text-white" startContent={<PiFilePdfLight size={20} />}>
              Download PDF
            </Button>
          )
        case "actions":
          return (
            <DropdownAction
              textButton="List Kuis"
              onPressButtonDetail={() =>
                push(`/admin/sop/kuis/${sop._id}`)
              }
              onPressButtonUpdate={() =>
                push(`/admin/sop/${sop._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${sop._id}`);
                deleteSopModal.onOpen();
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
          buttonTopContentLabel="Create SOP"
          columns={COLUMN_LISTS}
          data={dataSop?.data || []}
          emptyContent="SOP is empty"
          isLoading={isLoadingSop || isRefetchingSop}
          onClickButtonTopContent={addSopModal.onOpen}
          renderCell={renderCell}
          totalPages={dataSop?.pagination?.totalPages}
        />
      )}
      <AddSopModal
        {...addSopModal}
        refetchSop={refetchSop}
      />
      <DeleteSopModal
        {...deleteSopModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchSop={refetchSop}
      />
    </section>
  );
};

export default Sop;
