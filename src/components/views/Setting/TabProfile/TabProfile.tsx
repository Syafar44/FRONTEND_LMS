import { Controller } from "react-hook-form"
import useTabProfile from "./useTabProfile"
import { Button, Card, CardBody, Input, Skeleton, Spinner } from "@heroui/react"
import InputFile from "@/components/ui/InputFile"
import Image from "next/image"

const TabProfile = () => {

    const {
        control,
        errors,
        handleSubmitForm,
        handleDeleteImage,
        onUpdate,
        handleUploadImage,
        isPendingMutateUpdate,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,
        preview,
        dataProfile,
        isPendingProfile,
        refetchProfile,
    } = useTabProfile()

    

    return (
        <Card className="max-w-[600px]">
            <CardBody>
                <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmitForm(onUpdate)}
                >
                <div className="flex flex-col gap-2 items-center">
                    <p className="text-sm text font-medium text-default-700">Foto saat ini</p>
                    {!isPendingProfile ? (
                        <Image src={`${dataProfile?.image}`} alt="Image" width={1000} height={1000} className="!relative rounded-full h-[250px] w-[250px] object-cover" />
                    ): (
                        <Skeleton className="h-[250px] w-[250px] rounded-full"/>
                    )}
                    <Input 
                        type="text"
                        disabled
                        label="Full Name"
                        labelPlacement="outside"
                        value={dataProfile?.fullName}
                    />
                    <Input 
                        type="text"
                        disabled
                        label="Email"
                        labelPlacement="outside"
                        value={dataProfile?.email}
                    />
                    <Input 
                        type="text"
                        disabled
                        label="Department"
                        labelPlacement="outside"
                        value={dataProfile?.department}
                    />
                </div>
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
                        label={
                        <p className="mb-2 text-sm font-medium text-default-700">
                            Perbarui foto Profil
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
                    disabled={isPendingMutateUploadFile || isPendingMutateUpdate || !preview}
                    isDisabled={isPendingMutateUploadFile || isPendingMutateUpdate ||!preview}
                >
                    {isPendingMutateUpdate ? (
                    <Spinner size="sm" color="white" />
                    ) : (
                    "Save Changes"
                    )}
                </Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default TabProfile