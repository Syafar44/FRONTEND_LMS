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
import useDownlaodReturnModal from "./useDownlaodReturnModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchKuis: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DownlaodReturnModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedId,
    setSelectedId,
    refetchKuis,
  } = props;

  const {
    mutateDeleteKuis,
    isPendingMutateDeleteKuis,
    isSuccessMutateDeleteKuis,
  } = useDownlaodReturnModal();

  useEffect(() => {
    if (isSuccessMutateDeleteKuis) {
      onClose();
      refetchKuis();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteKuis]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Kuis</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this Kuis ?
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
            disabled={isPendingMutateDeleteKuis}
          >
            Cancel
          </Button>
          <Button
            className="text-black"
            color="primary"
            type="submit"
            disabled={isPendingMutateDeleteKuis}
            onPress={() => mutateDeleteKuis(selectedId)}
          >
            {isPendingMutateDeleteKuis ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Kuis"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DownlaodReturnModal;
