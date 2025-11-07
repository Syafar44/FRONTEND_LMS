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
import useDeleteSopModal from "./useDeleteSopModal";


interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchSop: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteSopModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedId,
    setSelectedId,
    refetchSop,
  } = props;

  const {
    mutateDeleteSop,
    isPendingMutateDeleteSop,
    isSuccessMutateDeleteSop,
  } = useDeleteSopModal();

  useEffect(() => {
    if (isSuccessMutateDeleteSop) {
      onClose();
      refetchSop();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteSop]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Sop</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this Sop?
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
            disabled={isPendingMutateDeleteSop}
          >
            Cancel
          </Button>
          <Button
            className="text-black"
            color="primary"
            type="submit"
            disabled={isPendingMutateDeleteSop}
            onPress={() => mutateDeleteSop(selectedId)}
          >
            {isPendingMutateDeleteSop ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Sop"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteSopModal;
