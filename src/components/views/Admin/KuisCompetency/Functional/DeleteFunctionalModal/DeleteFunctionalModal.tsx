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
import useDeleteFunctionalModal from "./useDeleteFunctionalModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchFunctional: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteFunctionalModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedId,
    setSelectedId,
    refetchFunctional,
  } = props;

  const {
    mutateDeleteFunctional,
    isPendingMutateDeleteFunctional,
    isSuccessMutateDeleteFunctional,
  } = useDeleteFunctionalModal();

  useEffect(() => {
    if (isSuccessMutateDeleteFunctional) {
      onClose();
      refetchFunctional();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteFunctional]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Kuis Functional</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this Kuis Functional?
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
            disabled={isPendingMutateDeleteFunctional}
          >
            Cancel
          </Button>
          <Button
            className="text-black"
            color="primary"
            type="submit"
            disabled={isPendingMutateDeleteFunctional}
            onPress={() => mutateDeleteFunctional(selectedId)}
          >
            {isPendingMutateDeleteFunctional ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Functional"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteFunctionalModal;
