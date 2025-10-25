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
  refetchSopIk: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteSopIkModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedId,
    setSelectedId,
    refetchSopIk,
  } = props;

  const {
    mutateDeleteSopIk,
    isPendingMutateDeleteSopIk,
    isSuccessMutateDeleteSopIk,
  } = useDeleteSopItModal();

  useEffect(() => {
    if (isSuccessMutateDeleteSopIk) {
      onClose();
      refetchSopIk();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteSopIk]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete SopIk</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this SopIk?
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
            disabled={isPendingMutateDeleteSopIk}
          >
            Cancel
          </Button>
          <Button
            className="text-black"
            color="primary"
            type="submit"
            disabled={isPendingMutateDeleteSopIk}
            onPress={() => mutateDeleteSopIk(selectedId)}
          >
            {isPendingMutateDeleteSopIk ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete SopIk"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteSopIkModal;
