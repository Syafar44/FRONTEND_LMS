import DataTable from "@/components/ui/DataTable";
import { useDisclosure } from "@heroui/react";

import { Key, ReactNode, use, useCallback, useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import useTabUser from "./useTabUser";
import { useRouter } from "next/router";
import { COLUMN_LISTS_TABUSER } from "./TabUser.constants";
import DeleteUserModal from "./DeleteUserModal";
import { convertTime } from "@/utils/date";

const TabUser = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataTabUser,
    isLoadingTabUser,
    isRefetchingTabUser,
    refetchTabUser,

    selectedId,
    setSelectedId,

    handleDownloadExcel,
  } = useTabUser()

  const { setUrl } = useChangeUrl();
  const deleteUserModal = useDisclosure();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (user: Record<string, unknown>, columnKey: Key) => {
      const cellValue = user[columnKey as keyof typeof user];

      switch (columnKey) {
        case "createdAt": 
          return (
            <p>{convertTime(`${user.createdAt}`)}</p>
          )
        case "actions":
          return (
            <DropdownAction
              hideButtonUpdate={true}
              onPressButtonDetail={() =>
                push(`/admin/administrasi/user/${user._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${user._id}`)
                deleteUserModal.onOpen();
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
          buttonTopContentLabel="Download Excel"
          columns={COLUMN_LISTS_TABUSER}
          data={dataTabUser?.data || []}
          emptyContent="TabUser is empty"
          isLoading={isLoadingTabUser || isRefetchingTabUser}
          onClickButtonTopContent={handleDownloadExcel}
          renderCell={renderCell}
          totalPages={dataTabUser?.pagination?.totalPages}
        />
      )}
      <DeleteUserModal 
        isOpen={deleteUserModal.isOpen}
        onClose={deleteUserModal.onClose}
        onOpenChange={deleteUserModal.onOpen}
        selectedId={`${selectedId}`}
        refetchUser={refetchTabUser}
        setSelectedId={setSelectedId}
      />
    </section>
  );
};

export default TabUser;
