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
import useAddIkModal from "./useAddIkModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchIk: () => void;
}

const AddIkModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchIk } = props;
  const {
    control,
    errors,
    handleSubmitForm,
    handleAddIk,
    isPendingMutateAddIk,
    isSuccessMutateAddIk,
    handleUploadImage,
    handleDeleteImage,
    handleOnClose,
    preview,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
  } = useAddIkModal();

  useEffect(() => {
    if (isSuccessMutateAddIk) {
      onClose();
      refetchIk();
    }
  }, [isSuccessMutateAddIk]);

  const disabledSubmit =
    isPendingMutateAddIk || isPendingMutateUploadFile ||
    isPendingMutateDeleteFile;
  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddIk)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Ik</ModalHeader>
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
              <p className="text-sm font-bold">Image max 4mb</p>
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
                <Controller
                  name="video"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Link Video (youtube)"
                      variant="bordered"
                      type="text"
                      isInvalid={errors.video !== undefined}
                      errorMessage={errors.video?.message}
                      className="my-2"
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
              {isPendingMutateAddIk ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Ik"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddIkModal;
