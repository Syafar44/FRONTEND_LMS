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
import useDeleteCompetencyModal from "./useDeleteCompetencyModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchCompetency: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteCompetencyModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedId,
    setSelectedId,
    refetchCompetency,
  } = props;

  const {
    mutateDeleteCompetency,
    isPendingMutateDeleteCompetency,
    isSuccessMutateDeleteCompetency,
  } = useDeleteCompetencyModal();

  useEffect(() => {
    if (isSuccessMutateDeleteCompetency) {
      onClose();
      refetchCompetency();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteCompetency]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Competency</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this Competency?
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
            disabled={isPendingMutateDeleteCompetency}
          >
            Cancel
          </Button>
          <Button
            className="text-black"
            color="primary"
            type="submit"
            disabled={isPendingMutateDeleteCompetency}
            onPress={() => mutateDeleteCompetency(selectedId)}
          >
            {isPendingMutateDeleteCompetency ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Competency"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCompetencyModal;
