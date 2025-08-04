import LkpServices from "@/services/lkp.service";
import { ILkp } from "@/types/Lkp";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Swal from 'sweetalert2'
import LkpSunnahServices from "@/services/lkpSunnah.service";

const useLkp = () => {
    const router = useRouter()

    const getLkp = async() => {
        const res = await LkpServices.getLkpByUser()
        const { data } = res
        return data.data
    }
    
    const {
        data: dataLkp, 
        isPending: isPendingLkp, 
        refetch: refetchLkp 
    } = useQuery({
        queryKey: ["lkp"],
        queryFn: getLkp,
        enabled: !!router.isReady,
    })

    const getLkpSunnah = async() => {
        const res = await LkpSunnahServices.getLkpByUser()
        const { data } = res
        return data.data
    }
    
    const {
        data: dataLkpSunnah, 
        isPending: isPendingLkpSunnah, 
        refetch: refetchLkpSunnah 
    } = useQuery({
        queryKey: ["Sunnah"],
        queryFn: getLkpSunnah,
        enabled: !!router.isReady,
    })

    const schemaAddLkp = yup.object().shape({
        subuh: yup.string().required("Silahkan pilih terlebih dahulu salah satu pilihan di atas ini."),
        dzuhur: yup.string().required("Silahkan pilih terlebih dahulu salah satu pilihan di atas ini."),
        ashar: yup.string().required("Silahkan pilih terlebih dahulu salah satu pilihan di atas ini."),
        magrib: yup.string().required("Silahkan pilih terlebih dahulu salah satu pilihan di atas ini."),
        isya: yup.string().required("Silahkan pilih terlebih dahulu salah satu pilihan di atas ini."),
    });

    const {
        control: controlAddLkp,
        handleSubmit: handleSubmitAddLkp,
        formState: { errors: errorsAddLkp },
        reset: resetAddLkp,
        setValue: setValueAddLkp,
      } = useForm({
        resolver: yupResolver(schemaAddLkp),
        defaultValues: {
        },
      });

    const Absen = async (payload: ILkp) => {
        const res = await LkpServices.addLkp(payload)
    }

    const { 
        mutate: mutateAddLkp, 
        isPending: isPendingAddLkp,
        isSuccess: isSuccessAddLkp,
     } = useMutation({
        mutationFn: Absen,
        onSuccess: () => {
            Swal.fire({
                title: 'Pengisian Berhasil',
                text: 'Data ibadah Anda telah berhasil disimpan.',
                icon: 'success',
                confirmButtonText: 'Ok, Tutup',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'bg-primary hover:bg-gray-700 hover:text-white font-semibold py-2 px-4 rounded',
                }
            });
            router.push('/')
        },
        onError: () => {
            Swal.fire({
                title: 'Pengisian Gagal',
                text: 'Anda sudah mengisi Ibadah hari ini.',
                icon: 'warning',
                confirmButtonText: 'Ok, Tutup',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'bg-primary hover:bg-gray-700 hover:text-white font-semibold py-2 px-4 rounded',
                }
            });
        }
    })

    const handleAbsen = (payload: ILkp) => mutateAddLkp(payload)

    return {
        dataLkp,
        isPendingLkp,
        refetchLkp,

        handleAbsen,
        isPendingAddLkp,
        isSuccessAddLkp,

        controlAddLkp,
        handleSubmitAddLkp,
        errorsAddLkp,
        resetAddLkp,
        setValueAddLkp,

        dataLkpSunnah,
        isPendingLkpSunnah,
        refetchLkpSunnah,
    }
}

export default useLkp