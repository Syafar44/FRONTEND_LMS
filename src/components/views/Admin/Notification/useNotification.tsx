import notificationServices from "@/services/notification.service";
import { INotification } from "@/types/Notification";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Swal from "sweetalert2";


const schema = yup.object().shape({
    title: yup.string().required("Please input title"),
    body: yup.string().required("Please input body"),
});

const useNotification = () => {
    const {
        control,
        handleSubmit: handleSubmitForm,
        formState: { errors },
        reset,
        watch,
        getValues,
        setValue,
      } = useForm({
        resolver: yupResolver(schema),
      });

    const sedNotif = async (payload: INotification) => {
        const res = await notificationServices.sendMessage(payload)
    }

    const {
        mutate: mutateSendNotif,
        isPending: isPendingMutateSendNotif,
        isSuccess: isSuccessMutateSendNotif,
    } = useMutation({
        mutationFn: sedNotif,
        onError: (error) => {
            Swal.fire({
                title: "Error",
                text: error instanceof Error ? error.message : "An error occurred",
                icon: "error",
            });

        },
        onSuccess: () => {
            Swal.fire({
                title: 'Success',
                text: 'Notification send success',
                icon: 'success',
                confirmButtonText: 'Ok, Tutup',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'bg-primary hover:bg-gray-700 hover:text-white font-semibold py-2 px-4 rounded',
                }
            });
            reset();
        },
    });

    const handleSendNotif = (data: INotification) => mutateSendNotif(data);

    return {
        control,
        handleSubmitForm,
        errors,
        reset,
        watch,
        getValues,
        setValue,
        handleSendNotif,
        isPendingMutateSendNotif,
        isSuccessMutateSendNotif,
    }
}   

export default useNotification;