import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeletePartAsesmenModal from "./useDeletePartAsesmenModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchPartAsesmen: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeletePartAsesmenModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedId,
    setSelectedId,
    refetchPartAsesmen,
  } = props;

  const {
    mutateDeletePartAsesmen,
    isPendingMutateDeletePartAsesmen,
    isSuccessMutateDeletePartAsesmen,
  } = useDeletePartAsesmenModal();

  useEffect(() => {
    if (isSuccessMutateDeletePartAsesmen) {
      onClose();
      refetchPartAsesmen();
      setSelectedId("");
    }
  }, [isSuccessMutateDeletePartAsesmen]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete PartAsesmen</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this PartAsesmen?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            className="text-black"
            color="primary"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingMutateDeletePartAsesmen}
          >
            Cancel
          </Button>
          <Button
            className="text-black"
            color="primary"
            type="submit"
            disabled={isPendingMutateDeletePartAsesmen}
            onPress={() => mutateDeletePartAsesmen(selectedId)}
          >
            {isPendingMutateDeletePartAsesmen ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete PartAsesmen"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeletePartAsesmenModal;
