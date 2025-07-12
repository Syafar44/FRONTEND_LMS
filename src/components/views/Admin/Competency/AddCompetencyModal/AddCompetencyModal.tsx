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
import useAddCompetencyModal from "./useAddCompetencyModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";
import { access_list } from "../../Administrasi/TabRegister/TabRegister";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchCompetency: () => void;
}

const AddCompetencyModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchCompetency } = props;
  const {
    control,
    errors,
    handleSubmitForm,
    handleAddCompetency,
    isPendingMutateAddCompetency,
    isSuccessMutateAddCompetency,

    preview,
    handleUploadImage,
    isPendingMutateUploadFile,
    handleDeleteImage,
    isPendingMutateDeleteFile,
    handleOnClose,

    access,
    setAccess,
  } = useAddCompetencyModal();

  useEffect(() => {
    if (isSuccessMutateAddCompetency) {
      onClose();
      refetchCompetency();
    }
  }, [isSuccessMutateAddCompetency]);

  const disabledSubmit =
    isPendingMutateAddCompetency ||
    isPendingMutateUploadFile ||
    isPendingMutateDeleteFile;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddCompetency)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Competency</ModalHeader>
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
                name="access"
                control={control}
                render={({ field }) => (
                  <CheckboxGroup
                    {...field}
                    color="warning"
                    label="Select Access"
                    value={access}
                    onValueChange={setAccess}
                    isInvalid={errors.access !== undefined}
                    errorMessage={errors.access?.message}
                    orientation="horizontal"
                  >
                    {access_list.map((item) => (
                      <Checkbox 
                        key={item.key} 
                        value={item.key}
                      >
                        {item.label}
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                )}
              />
              <p className="text-sm font-bold">Image</p>
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onDelete={() => handleDeleteImage(onChange)}
                    onUpload={(files) => handleUploadImage(files, onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDeleteFile}
                    isInvalid={errors.image !== undefined}
                    errorMessage={errors.image?.message}
                    isDropable
                    preview={typeof preview === "string" ? preview : ""}
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
              onPress={() => handleOnClose(onClose)}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button color="primary" className="text-black" type="submit" disabled={disabledSubmit}>
              {isPendingMutateAddCompetency ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Competency"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddCompetencyModal;
