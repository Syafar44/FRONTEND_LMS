import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@heroui/react";
import useAddSubCompetencyModal from "./useAddSubCompetencyModal";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetch: () => void;
  competencyId: string;
}

const AddSubCompetencyModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetch, competencyId } = props;
  const {
    control,
    errors,
    handleSubmitForm,
    handleAddSubCompetency,
    isPendingMutateAddSubCompetency,
    isSuccessMutateAddSubCompetency,
  } = useAddSubCompetencyModal(competencyId);

  useEffect(() => {
    if (isSuccessMutateAddSubCompetency) {
      onClose();
      refetch();
    }
  }, [isSuccessMutateAddSubCompetency]);

  const disabledSubmit = isPendingMutateAddSubCompetency


  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmitForm(handleAddSubCompetency)}>
        <ModalContent className="m-4">
          <ModalHeader>Add SubCompetency</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Information</p>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Name"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.title !== undefined}
                    errorMessage={errors.title?.message}
                    className="mb-2"
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Description"
                    variant="bordered"
                    isInvalid={errors.description !== undefined}
                    errorMessage={errors.description?.message}
                    className="mb-2"
                  />
                )}
              />
              <Controller
                name="video"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Link Video"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.video !== undefined}
                    errorMessage={errors.video?.message}
                    className="mb-2"
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary" 
              className="text-black"
              variant="flat"
              onPress={() => {
                onClose()
              }}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button color="primary" className="text-black" type="submit" disabled={disabledSubmit}>
              {isPendingMutateAddSubCompetency ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create SubCompetency"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddSubCompetencyModal;
