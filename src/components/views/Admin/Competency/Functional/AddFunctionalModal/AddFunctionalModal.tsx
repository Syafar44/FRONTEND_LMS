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
import useAddFunctionalModal from "./useAddFunctionalModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchFunctional: () => void;
}

const AddFunctionalModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchFunctional } = props;
  const {
    control,
    errors,
    handleSubmitForm,
    handleAddFunctional,
    isPendingMutateAddFunctional,
    isSuccessMutateAddFunctional,

    preview,
    handleUploadImage,
    isPendingMutateUploadFile,
    handleDeleteImage,
    isPendingMutateDeleteFile,
    handleOnClose,

    access,
    setAccess,
  } = useAddFunctionalModal();

  useEffect(() => {
    if (isSuccessMutateAddFunctional) {
      onClose();
      refetchFunctional();
    }
  }, [isSuccessMutateAddFunctional]);

  const disabledSubmit =
    isPendingMutateAddFunctional ||
    isPendingMutateUploadFile ||
    isPendingMutateDeleteFile;

  const list_access = [
    {
      key: "all-team",
      value: "All Team",
    },
    {
      key: "outlet",
      value: "Outlet",
    },
    {
      key: "gerai",
      value: "Gerai",
    },
    {
      key: "produksi",
      value: "Produksi",
    },
    {
      key: "office",
      value: "Office",
    },
    {
      key: "manager",
      value: "Manager",
    },
    
  ]

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddFunctional)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Functional</ModalHeader>
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
                    {list_access.map((item) => (
                      <Checkbox 
                        key={item.key} 
                        value={item.key}
                      >
                        {item.value}
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
              {isPendingMutateAddFunctional ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Functional"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddFunctionalModal;
