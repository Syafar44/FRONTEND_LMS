import { Controller } from "react-hook-form"
import useResume from "./useResume"
import { Button, Input, Spinner, Textarea } from "@heroui/react"

const Resume = () => {
    const {
        control,
        handleAddResume,
        handleSubmitForm,
        isPendingMutateAddResume, 
        dataKajian,
        isPendingDataKajian,
        dataUser,
        isPendingUser,
    } = useResume()
    return (
        <section className="grid gap-5">
            {!isPendingDataKajian || !isPendingUser ? (
                <>
                    <div className="">
                        <h1>
                            Tema kajian:
                        </h1>
                        <p>{dataKajian?.title}</p>
                    </div>
                    <div className="text-sm text-gray-500 grid gap-2">
                        <Input
                            label="Nama"
                            value={dataUser?.fullName}
                            disabled
                            />
                        <Input
                            label="Departemen"
                            value={dataUser?.department}
                            disabled
                            />
                    </div>
                    <form className="grid gap-5" onSubmit={handleSubmitForm(handleAddResume)}>
                        <Controller 
                            name="resume"
                            control={control}
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    label="Silahkan isi Resume di bawah ini:"
                                    labelPlacement="outside"
                                    placeholder="Isi resume disini..."
                                />
                            )}
                        />
                        <div className="flex justify-end">
                            <Button color="primary" className="text-black" type="submit" disabled={isPendingMutateAddResume}>
                                {isPendingMutateAddResume ? (
                                    <Spinner size="sm" color="white" />
                                ) : (
                                    "Kirim" 
                                )}
                            </Button>
                        </div>
                    </form>
                </>
            ) : (
                <div className="flex justify-center items-center h-screen flex-col gap-3">
                    <Spinner size="lg" />
                    <p>Sedang memuat data pengguna...</p>
                </div>
            )}
        </section>
    )
}

export default Resume