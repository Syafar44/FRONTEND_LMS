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
import useDeleteManagerialModal from "./useDeleteManagerialModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchManagerial: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteManagerialModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedId,
    setSelectedId,
    refetchManagerial,
  } = props;

  const {
    mutateDeleteManagerial,
    isPendingMutateDeleteManagerial,
    isSuccessMutateDeleteManagerial,
  } = useDeleteManagerialModal();

  useEffect(() => {
    if (isSuccessMutateDeleteManagerial) {
      onClose();
      refetchManagerial();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteManagerial]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Kuis Managerial</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this Kuis Managerial?
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
            disabled={isPendingMutateDeleteManagerial}
          >
            Cancel
          </Button>
          <Button
            className="text-black"
            color="primary"
            type="submit"
            disabled={isPendingMutateDeleteManagerial}
            onPress={() => mutateDeleteManagerial(selectedId)}
          >
            {isPendingMutateDeleteManagerial ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Managerial"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteManagerialModal;
