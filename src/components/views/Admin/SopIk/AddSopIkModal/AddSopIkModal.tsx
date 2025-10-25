import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";
import { access_list } from "../../Administrasi/TabRegister/TabRegister";
import useAddSopIkModal from "./useAddSopIkModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchSopIk: () => void;
}

const AddSopIkModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchSopIk } = props;
  const {
    control,
    errors,
    handleSubmitForm,
    handleAddSopIk,
    isPendingMutateAddSopIk,
    isSuccessMutateAddSopIk,
  } = useAddSopIkModal();

  useEffect(() => {
    if (isSuccessMutateAddSopIk) {
      onClose();
      refetchSopIk();
    }
  }, [isSuccessMutateAddSopIk]);

  const disabledSubmit =
    isPendingMutateAddSopIk
  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <form onSubmit={handleSubmitForm(handleAddSopIk)}>
        <ModalContent className="m-4">
          <ModalHeader>Add SopIk</ModalHeader>
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
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary" 
              className="text-black"
              variant="flat"
              onPress={onClose}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button color="primary" className="text-black" type="submit" disabled={disabledSubmit}>
              {isPendingMutateAddSopIk ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create SopIk"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddSopIkModal;
