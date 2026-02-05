import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import useAddAsesmenModal from "./useAddAsesmenModal";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchAsesmen: () => void;
}

const AddAsesmenModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchAsesmen } = props;
  const {
    control,
    errors,
    handleSubmitForm,
    handleAddAsesmen,
    isPendingMutateAddAsesmen,
    isSuccessMutateAddAsesmen,
  } = useAddAsesmenModal();

  useEffect(() => {
    if (isSuccessMutateAddAsesmen) {
      onClose();
      refetchAsesmen();
    }
  }, [isSuccessMutateAddAsesmen]);

  const disabledSubmit =
    isPendingMutateAddAsesmen;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <form onSubmit={handleSubmitForm(handleAddAsesmen)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Asesmen</ModalHeader>
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
                    label="Judul"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.title !== undefined}
                    errorMessage={errors.title?.message}
                    className="mb-2"
                  />
                )}
              />
              <Controller
                name="type"
                control={control}
                render={({field: {onChange, ...field}}) => (
                  <Select
                    {...field}
                    label="TYPE Ujian"
                    variant="bordered"
                    isInvalid={errors.type !== undefined}
                    errorMessage={errors.type?.message}
                    className="mb-2"
                    onSelectionChange={(value) => {
                      onChange(value.anchorKey)
                    }}
                  >
                    <SelectItem key="1">
                      Type 1
                    </SelectItem>
                    <SelectItem key="2">
                      Type 2
                    </SelectItem>
                  </Select>
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
              {isPendingMutateAddAsesmen ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Asesmen"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddAsesmenModal;
