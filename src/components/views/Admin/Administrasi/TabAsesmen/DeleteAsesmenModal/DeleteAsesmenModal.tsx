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
import useDeleteAsesmenModal from "./useDeleteAsesmenModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchAsesmen: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteAsesmenModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedId,
    setSelectedId,
    refetchAsesmen,
  } = props;

  const {
    mutateDeleteAsesmen,
    isPendingMutateDeleteAsesmen,
    isSuccessMutateDeleteAsesmen,
  } = useDeleteAsesmenModal();

  useEffect(() => {
    if (isSuccessMutateDeleteAsesmen) {
      onClose();
      refetchAsesmen();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteAsesmen]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Asesmen</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this Asesmen?
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
            disabled={isPendingMutateDeleteAsesmen}
          >
            Cancel
          </Button>
          <Button
            className="text-black"
            color="primary"
            type="submit"
            disabled={isPendingMutateDeleteAsesmen}
            onPress={() => mutateDeleteAsesmen(selectedId)}
          >
            {isPendingMutateDeleteAsesmen ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Asesmen"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteAsesmenModal;
