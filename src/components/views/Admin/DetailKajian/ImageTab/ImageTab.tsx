import InputFile from "@/components/ui/InputFile";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import useImageTab from "./useImageTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { ICompetency } from "@/types/Competency";

interface PropTypes {
  currentImage: string;
  onUpdate: (data: ICompetency) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const ImageTab = (props: PropTypes) => {
  const { currentImage, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    handleDeleteImage,
    handleUploadImage,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdateImage,
    errorsUpdateImage,
    handleSubmitUpdateImage,
    resetUpdateImage,

    preview,
  } = useImageTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateImage();
    }
  }, [isSuccessUpdate]);
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Kajian Image</h1>
        <p className="w-full text-small text-default-400">
          Manage Image of this Kajian
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateImage(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">Current Image</p>
            <Skeleton
              isLoaded={!!currentImage}
              className="rounded-lg"
            >
              <Image src={currentImage} alt="Image" fill className="!relative rounded-lg" />
            </Skeleton>
          </div>
          <Controller
            name="image"
            control={controlUpdateImage}
            render={({ field: { onChange, value, ...field } }) => (
              <InputFile
                {...field}
                onDelete={() => handleDeleteImage(onChange)}
                onUpload={(files) => handleUploadImage(files, onChange)}
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDeleteFile}
                isInvalid={errorsUpdateImage.image !== undefined}
                errorMessage={errorsUpdateImage.image?.message}
                isDropable
                label={
                  <p className="mb-2 text-sm font-medium text-default-700">
                    Upload New Image
                  </p>
                }
                preview={typeof preview === "string" ? preview : ""}
              />
            )}
          />
          <Button
            type="submit"
            color="primary"
            className="mt-2 disabled:bg-default-500 disabled:text-white text-black"
            disabled={isPendingMutateUploadFile || isPendingUpdate || !preview}
            isDisabled={isPendingMutateUploadFile || isPendingUpdate ||!preview}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default ImageTab;
