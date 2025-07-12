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
import useDeleteSubCompetencyModal from "./useDeleteSubCompetencyModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetch: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteSubCompetencyModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedId,
    setSelectedId,
    refetch,
  } = props;

  const {
    mutateDeleteSubCompetency,
    isPendingMutateDeleteSubCompetency,
    isSuccessMutateDeleteSubCompetency,
  } = useDeleteSubCompetencyModal();

  useEffect(() => {
    if (isSuccessMutateDeleteSubCompetency) {
      onClose();
      refetch();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteSubCompetency]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete SubCompetency</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this SubCompetency?
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
            disabled={isPendingMutateDeleteSubCompetency}
          >
            Cancel
          </Button>
          <Button
            className="text-black"
            color="primary"
            type="submit"
            disabled={isPendingMutateDeleteSubCompetency}
            onPress={() => mutateDeleteSubCompetency(selectedId)}
          >
            {isPendingMutateDeleteSubCompetency ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Sub Competency"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteSubCompetencyModal;
