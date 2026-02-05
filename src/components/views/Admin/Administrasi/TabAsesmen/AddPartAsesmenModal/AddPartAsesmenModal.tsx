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
import useAddPartAsesmenModal from "./useAddPartAsesmenModal";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchPartAsesmen: () => void;
}

const AddPartAsesmenModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchPartAsesmen } = props;
  const {
    control,
    errors,
    handleSubmitForm,
    handleAddPartAsesmen,
    isPendingMutateAddPartAsesmen,
    isSuccessMutateAddPartAsesmen,
  } = useAddPartAsesmenModal();

  useEffect(() => {
    if (isSuccessMutateAddPartAsesmen) {
      onClose();
      refetchPartAsesmen();
    }
  }, [isSuccessMutateAddPartAsesmen]);

  const disabledSubmit =
    isPendingMutateAddPartAsesmen;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <form onSubmit={handleSubmitForm(handleAddPartAsesmen)}>
        <ModalContent className="m-4">
          <ModalHeader>Add PartAsesmen</ModalHeader>
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
                    label="Nama Peserta"
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
              {isPendingMutateAddPartAsesmen ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Part Asesmen"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddPartAsesmenModal;
