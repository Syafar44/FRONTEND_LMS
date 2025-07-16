import { Controller } from "react-hook-form"
import useTabKeamanan from "./useTabKeamanan"
import { Button, Card, CardBody, Input, Spinner } from "@heroui/react"

const TabKeamanan = () => {

    const {
        control,
        errors,
        handleUpdatePassword,
        isPendingMutateUpdate,
        handleSubmitForm
    } = useTabKeamanan()

    return (
        <Card>
            <CardBody>
                <div className="flex flex-col lg:flex-row gap-5 w-full py-5 px-3 lg:px-5 h-full">
                    <div className="w-full">
                        <h1>Reset Password</h1>
                        <form onSubmit={handleSubmitForm(handleUpdatePassword)}>
                            <div className="grid gap-2 py-5">
                                <Controller
                                    name="currentPassword"
                                    control={control}
                                    render={({ field }) => (
                                    <Input
                                        {...field}
                                        label="Password Lama"
                                        labelPlacement="outside"
                                        placeholder="Masukkan password lama"
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
                                        labelPlacement="outside"
                                        placeholder="Masukkan password baru"
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
                                        labelPlacement="outside"
                                        placeholder="Masukkan kembali password baru"
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
                                {isPendingMutateUpdate ? <Spinner size="sm" /> : 'Update Password'}
                            </Button>
                        </div>
                        </form>
                    </div>
                    <div className="lg:w-2/4">
                        <Card>
                            <CardBody className="p-5 bg-primary">
                                <div className="grid gap-4">
                                    <h3 className="font-bold">
                                        Persyaratan Password
                                    </h3>
                                    <p>
                                        Untuk membuat password yang kuat, berikut beberapa aturan yang perlu di perhatikan:
                                    </p>
                                    <ul className="list-disc pl-5 grid gap-2 text-sm">
                                        <li>Minimal 8 karakter</li>
                                        <li>Minimal satu karakter huruf kecil</li>
                                        <li>Minimal satu karakter huruf besar (kapital)</li>
                                        <li>Tidak boleh sama dengan kata sandi sebelumnya</li>
                                    </ul>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default TabKeamanan