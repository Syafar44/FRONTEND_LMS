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
import useDeleteCoreModal from "./useDeleteCoreModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchCore: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteCoreModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedId,
    setSelectedId,
    refetchCore,
  } = props;

  const {
    mutateDeleteCore,
    isPendingMutateDeleteCore,
    isSuccessMutateDeleteCore,
  } = useDeleteCoreModal();

  useEffect(() => {
    if (isSuccessMutateDeleteCore) {
      onClose();
      refetchCore();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteCore]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Kuis Core</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this Kuis Core?
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
            disabled={isPendingMutateDeleteCore}
          >
            Cancel
          </Button>
          <Button
            className="text-black"
            color="primary"
            type="submit"
            disabled={isPendingMutateDeleteCore}
            onPress={() => mutateDeleteCore(selectedId)}
          >
            {isPendingMutateDeleteCore ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Core"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCoreModal;
