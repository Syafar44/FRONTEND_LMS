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
  Textarea,
} from "@heroui/react";
import useAddKuisModal from "./useAddKuisModal";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchKuis: () => void;
  competencyId: string;
}

const AddKuisModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchKuis, competencyId } = props;
  const {
    control,
    errors,
    handleSubmitForm,
    handleAddKuis,
    isPendingMutateAddKuis,
    isSuccessMutateAddKuis,

  } = useAddKuisModal();

  useEffect(() => {
    if (isSuccessMutateAddKuis) {
      onClose();
      refetchKuis();
    }
  }, [isSuccessMutateAddKuis]);

  const disabledSubmit = isPendingMutateAddKuis


  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <form
        onSubmit={handleSubmitForm((data) =>
          handleAddKuis({
            ...data,
            optionValid: Number(data.optionValid),
          })
        )}
      >
        <ModalContent className="m-4">
          <ModalHeader>Add Kuis</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Information</p>
              <Controller
                name="question"
                control={control}
                render={({ field }) => (
                  <Textarea
                  {...field}
                  label="Question . . ."
                  variant="bordered"
                  isInvalid={errors.question !== undefined}
                  errorMessage={errors.question?.message}
                  className="mb-2"
                  />
                )}
              />
              <Controller
                name="option1"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Option 1"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.option1 !== undefined}
                    errorMessage={errors.option1?.message}
                    className="mb-2"
                  />
                )}
              />
              <Controller
                name="option2"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Option 2"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.option1 !== undefined}
                    errorMessage={errors.option1?.message}
                    className="mb-2"
                  />
                )}
              />
              <Controller
                name="option3"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Option 3"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.option1 !== undefined}
                    errorMessage={errors.option1?.message}
                    className="mb-2"
                  />
                )}
              />
              <Controller
                name="option4"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Option 4"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.option1 !== undefined}
                    errorMessage={errors.option1?.message}
                    className="mb-2"
                  />
                )}
              />
              <Controller
                name="optionValid"
                control={control}
                render={({field: {onChange, ...field}}) => (
                  <Select
                    {...field}
                    label="Valid Option"
                    variant="bordered"
                    isInvalid={errors.optionValid !== undefined}
                    errorMessage={errors.optionValid?.message}
                    className="mb-2"
                    onSelectionChange={(value) => {
                      onChange(value.anchorKey)
                    }}
                  >
                    <SelectItem key="1" value="1">
                      1
                    </SelectItem>
                    <SelectItem key="2" value="2">
                      2
                    </SelectItem>
                    <SelectItem key="3" value="3">
                      3
                    </SelectItem>
                    <SelectItem key="4" value="4">
                      4
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
              onPress={() => {
                onClose()
              }}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button color="primary" className="text-black" type="submit" disabled={disabledSubmit}>
              {isPendingMutateAddKuis ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Kuis"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddKuisModal;
