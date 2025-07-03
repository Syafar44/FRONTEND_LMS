import { Controller } from "react-hook-form"
import useSetting from "./useSetting"
import { Button, Input, Spinner } from "@heroui/react"

const Setting = () => {

    const {
        control,
        errors,
        handleUpdateCore,
        isPendingMutateUpdate,
        handleSubmitForm
    } = useSetting()

    return (
        <div className="max-w-[600px]">
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmitForm(handleUpdateCore)}>
                <div className="py-5">
                    <Controller
                        name="currentPassword"
                        control={control}
                        render={({ field }) => (
                        <Input
                            {...field}
                            label="Password Lama"
                            variant="bordered"
                            type="text"
                            isInvalid={errors.currentPassword !== undefined}
                            errorMessage={errors.currentPassword?.message}
                            className="mb-2"
                        />
                        )}
                    />
                    <Controller
                        name="newPassword"
                        control={control}
                        render={({ field }) => (
                        <Input
                            {...field}
                            label="Password Baru"
                            variant="bordered"
                            type="text"
                            isInvalid={errors.newPassword !== undefined}
                            errorMessage={errors.newPassword?.message}
                            className="mb-2"
                        />
                        )}
                    />
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field }) => (
                        <Input
                            {...field}
                            label="Konfirmasi password"
                            variant="bordered"
                            type="text"
                            isInvalid={errors.confirmPassword !== undefined}
                            errorMessage={errors.confirmPassword?.message}
                            className="mb-2"
                        />
                        )}
                    />
                </div>
              <div className="flex justify-end">
                <Button className="bg-primary" type="submit">
                    {isPendingMutateUpdate ? <Spinner size="sm" /> : 'Simpan'}
                </Button>
              </div>
            </form>
        </div>
    )
}

export default Setting