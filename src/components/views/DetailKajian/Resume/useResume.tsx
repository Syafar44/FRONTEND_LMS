import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { IResume } from "@/types/Resume";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ToasterContext } from "@/contexts/ToasterContext";
import resumeServices from "@/services/resume.service";
import kajianServices from "@/services/kajian.service";

const useResume = () => {
    const router = useRouter()
    const { id } = router.query 
    const { setToaster } = useContext(ToasterContext);

    const schema = yup.object().shape({
      kajian: yup.string(),
      resume: yup.string().required("Please input resume"),
    });

    const getKajianById = async () => {
        const res = await kajianServices.getKajianById(`${id}`)
        const { data } = res
        return data.data
    }

    const { 
        data: dataKajian, 
        isPending: isPendingDataKajian 
    } = useQuery({
        queryKey: ["getKajianById", id],
        queryFn: getKajianById,
        enabled: !!id,
    })

    const {
        control,
        handleSubmit: handleSubmitForm,
        formState: { errors },
        reset,
      } = useForm({
        resolver: yupResolver(schema),
      });

        const addResume = async (payload: IResume) => {
        const res = await resumeServices.addResume({
            ...payload,
            kajian: `${id}`
        })
        return res;
        };

    const {
        mutate: mutateAddResume,
        isPending: isPendingMutateAddResume,
        isSuccess: isSuccessMutateAddResume,
    } = useMutation({
        mutationFn: addResume,
        onError: (error) => {
        setToaster({
            type: "error",
            message: error.message,
        });
        },
        onSuccess: () => {
        setToaster({
            type: "success",
            message: "Success add Resume",
        });
        reset();
        router.push('/kajian-online')
        },
    });

    const handleAddResume = (data: IResume) => mutateAddResume(data);

    return {
        control,
        handleSubmitForm,
        errors,
        handleAddResume,
        isPendingMutateAddResume,
        isSuccessMutateAddResume,

        dataKajian,
        isPendingDataKajian,                       
    }
}

export default useResume