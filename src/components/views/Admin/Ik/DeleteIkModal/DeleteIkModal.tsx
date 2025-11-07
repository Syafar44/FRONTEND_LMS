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
import useDeleteSopItModal from "./useDeleteSopItModal";


interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchIk: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteIkModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedId,
    setSelectedId,
    refetchIk,
  } = props;

  const {
    mutateDeleteIk,
    isPendingMutateDeleteIk,
    isSuccessMutateDeleteIk,
  } = useDeleteSopItModal();

  useEffect(() => {
    if (isSuccessMutateDeleteIk) {
      onClose();
      refetchIk();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteIk]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Ik</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this Ik?
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
            disabled={isPendingMutateDeleteIk}
          >
            Cancel
          </Button>
          <Button
            className="text-black"
            color="primary"
            type="submit"
            disabled={isPendingMutateDeleteIk}
            onPress={() => mutateDeleteIk(selectedId)}
          >
            {isPendingMutateDeleteIk ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Ik"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteIkModal;
