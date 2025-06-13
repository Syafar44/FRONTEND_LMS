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
import useDeleteKajianModal from "./useDeleteKajianModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchKajian: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteKajianModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedId,
    setSelectedId,
    refetchKajian,
  } = props;

  const {
    mutateDeleteKajian,
    isPendingMutateDeleteKajian,
    isSuccessMutateDeleteKajian,
  } = useDeleteKajianModal();

  useEffect(() => {
    if (isSuccessMutateDeleteKajian) {
      onClose();
      refetchKajian();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteKajian]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Kajian</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this Kajian?
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
            disabled={isPendingMutateDeleteKajian}
          >
            Cancel
          </Button>
          <Button
            className="text-black"
            color="primary"
            type="submit"
            disabled={isPendingMutateDeleteKajian}
            onPress={() => mutateDeleteKajian(selectedId)}
          >
            {isPendingMutateDeleteKajian ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Kajian"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteKajianModal;
