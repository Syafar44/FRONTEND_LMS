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
import useAddCoreModal from "./useAddCoreModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchCore: () => void;
  competencyId: string;
}

const AddCoreModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchCore, competencyId } = props;
  const {
    control,
    errors,
    handleSubmitForm,
    handleAddCore,
    isPendingMutateAddCore,
    isSuccessMutateAddCore,

    preview,
    handleUpload,
    isPendingMutateUploadFile,
    handleDelete,
    isPendingMutateDeleteFile,
    handleOnClose,

    uploadProgress
  } = useAddCoreModal(competencyId);

  useEffect(() => {
    if (isSuccessMutateAddCore) {
      onClose();
      refetchCore();
    }
  }, [isSuccessMutateAddCore]);

  const disabledSubmit =
    isPendingMutateAddCore ||
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
      onClose={() => {
        handleOnClose(onClose)
      }}
    >
      <form onSubmit={handleSubmitForm(handleAddCore)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Core</ModalHeader>
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
              <p className="text-sm font-bold">Unggah Video</p>
              <Controller
                name="video"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onDelete={() => handleDelete(onChange)}
                    onUpload={(files) => handleUpload(files, onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDeleteFile}
                    isInvalid={errors.image !== undefined}
                    errorMessage={errors.image?.message}
                    isDropable
                    isVideo={true}
                    uploadProgress={uploadProgress}
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
              onPress={() => {
                handleOnClose(onClose)
              }}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button color="primary" className="text-black" type="submit" disabled={disabledSubmit}>
              {isPendingMutateAddCore ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Core"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddCoreModal;
