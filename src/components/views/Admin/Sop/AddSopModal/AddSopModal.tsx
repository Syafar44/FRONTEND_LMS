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
import useAddSopModal from "./useAddSopModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchSop: () => void;
}

const AddSopModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchSop } = props;
  const {
    control,
    errors,
    handleSubmitForm,
    handleAddSop,
    isPendingMutateAddSop,
    isSuccessMutateAddSop,
  } = useAddSopModal();

  useEffect(() => {
    if (isSuccessMutateAddSop) {
      onClose();
      refetchSop();
    }
  }, [isSuccessMutateAddSop]);

  const disabledSubmit =
    isPendingMutateAddSop
  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <form onSubmit={handleSubmitForm(handleAddSop)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Sop</ModalHeader>
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
                name="file"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="File Materi pdf/docx"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.file !== undefined}
                    errorMessage={errors.file?.message}
                    className="mb-2"
                  />
                )}
              />
              <Controller
                name="duration"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Duration Kuis (Menit)"
                    variant="bordered"
                    type="number"
                    isInvalid={errors.duration !== undefined}
                    errorMessage={errors.duration?.message}
                    className="mb-2"
                  />
                )}
              />
              <Controller
                name="countdown"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Countdown Setelah Kuis (Menit)"
                    variant="bordered"
                    type="number"
                    isInvalid={errors.countdown !== undefined}
                    errorMessage={errors.countdown?.message}
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
              {isPendingMutateAddSop ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Sop"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddSopModal;
