import useChangeUrl from "@/hooks/useChangeUrl";
import authServices from "@/services/auth.service";
import competencyServices from "@/services/competency.service"
import completedServices from "@/services/completed.service";

import saveServices from "@/services/save.service";
import subCompetencyServices from "@/services/subCompetency.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useCompetency = () => {
    const router = useRouter()
    const pathSegments = router.pathname.split('/');
    const { currentLimit, currentPage, currentSearch } = useChangeUrl();

    const getUser = async() => {
        const res = await authServices.getProfile()
        const { data } = res
        return data.data
    }

    const {
        data: dataUser,
        isPending: isPendingUser,
    } = useQuery({
        queryKey: ["User"],
        queryFn: () => getUser(),
        enabled: !!router.isReady
    })

    const getCourse = async () => {
        let params = `access=${dataUser?.access}&limit=${currentLimit}&page=${currentPage}`;
        if (currentSearch) {
            params += `&search=${currentSearch}`;
        }
        const res = await competencyServices.getCompetencyByMainCompetency(`${pathSegments[2]}`, params)
        const { data } = res
        return data
    }

    const {
        data: dataCourse,
        isPending: isPendingCourse,
        refetch: refetchCourse,
    } = useQuery({
        queryKey: ["get-course", currentLimit, currentPage, currentSearch],
        queryFn: getCourse,
        enabled: !!router.isReady && !!dataUser?.access
    })

    const getSave = async () => {
        const res = await saveServices.getSaveByUser()
        const { data } = res
        return data.data
    }

    const {
        data: dataSave,
        isPending: isPendingSave,
    } = useQuery({
        queryKey: ["Save"],
        queryFn: getSave,
        enabled: !!router.isReady
    })

    const getSubCompetency = async() => {
        const res = await subCompetencyServices.getSubCompetencyByCompetency(`${dataSave?.competency}`)
        const { data } = res
        return data.data
    }

    const {
        data: dataSubCompetency,
        isPending: isPendingSubCompetency,
    } = useQuery({
        queryKey: ["SubCompetency", dataSave?.competency],
        queryFn: () => getSubCompetency(),
        enabled: !!dataSave?.competency
    })

    const getCompleted = async() => {
        const res = await completedServices.getCompletedByUser()
        const { data } = res
        return data?.data
    }

    const {
        data: dataCompleted,
        isPending: isPendingCompleted,
    } = useQuery({
        queryKey: ["Completed"],
        queryFn: () => getCompleted(),
        enabled: !!router.isReady
    })

    return {
        dataCourse,
        isPendingCourse,
        refetchCourse,

        dataSave,
        isPendingSave,

        dataSubCompetency,
        isPendingSubCompetency,

        pathSegments,

        dataUser,
        isPendingUser,

        dataCompleted,
        isPendingCompleted,
    }
}

export default useCompetency