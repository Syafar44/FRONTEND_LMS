import { Button, Card, CardBody, CardHeader, Input, Spinner, Textarea } from "@heroui/react";
import { Controller } from "react-hook-form";
import useNotification from "./useNotification";
import { useEffect } from "react";

const Notification = () => {

    const {
        control,
        handleSubmitForm,
        errors,
        reset,
        handleSendNotif,
        isPendingMutateSendNotif,
        isSuccessMutateSendNotif,
    } = useNotification()

    useEffect(() => {
        if (isSuccessMutateSendNotif) {
            reset();
        }
    }, [isSuccessMutateSendNotif]);

    return (
        <div>
            <Card className="w-full p-4 lg:w-1/2">
                <CardHeader className="flex-col items-center">
                    <h1 className="w-full text-xl font-bold">Send Notification</h1>
                    <p className="w-full text-small text-default-400">
                        Send notification to all users
                    </p>
                </CardHeader>
                <CardBody>
                    <form
                        className="flex flex-col gap-2"
                        onSubmit={handleSubmitForm(handleSendNotif)}
                    >
                        <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label="Title"
                                labelPlacement="outside"
                                placeholder="Reminder!"
                                variant="bordered"
                                type="text"
                                isInvalid={errors.title !== undefined}
                                errorMessage={errors.title?.message}
                                className="mb-2"
                            />
                        )}
                        />
                    
                        <Controller
                        name="body"
                        control={control}
                        render={({ field }) => (
                            <Textarea
                                {...field}
                                label="Text"
                                labelPlacement="outside"
                                placeholder="Kami mengingatkan Anda untuk menyelesaikan tugas Anda"
                                variant="bordered"
                                isInvalid={errors.body !== undefined}
                                errorMessage={errors.body?.message}
                                className="mb-2"
                            />
                        )}
                        />
                        <Button
                            color="primary"
                            className="mt-2 disabled:bg-default-500 text-black"
                            type="submit"
                            disabled={isPendingMutateSendNotif}
                        >
                            {isPendingMutateSendNotif ? (
                            <Spinner size="sm" />
                            ) : (
                                "Send Notification"
                            )}
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}

export default Notification;