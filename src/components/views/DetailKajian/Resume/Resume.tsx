import { Controller } from "react-hook-form"
import useResume from "./useResume"
import { Button, Spinner, Textarea } from "@heroui/react"

const Resume = () => {
    const {
        control,
        errors,
        handleAddResume,
        handleSubmitForm,
        isPendingMutateAddResume,
        isSuccessMutateAddResume, 

        dataKajian,
        isPendingDataKajian
    } = useResume()
    return (
        <section className="p-5 grid gap-5">
            <div className="">
                <h1>
                    Tema kajian:
                </h1>
                <p>{dataKajian?.title}</p>
            </div>
            <h3>
                Silahkan isi Resume di bawah ini:
            </h3>
            <form className="grid gap-5" onSubmit={handleSubmitForm(handleAddResume)}>
                <Controller 
                    name="resume"
                    control={control}
                    render={({ field }) => (
                        <Textarea
                            {...field}
                            placeholder="Isi resume disini"
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
        </section>
    )
}

export default Resume