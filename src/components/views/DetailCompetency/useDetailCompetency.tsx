import useChangeUrl from "@/hooks/useChangeUrl"
import competencyServices from "@/services/competency.service"
import scoreServices from "@/services/score.service"
import subCompetencyServices from "@/services/subCompetency.service"
import videoServices from "@/services/video.service"
import { IScore } from "@/types/Score"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const useDetailCompetency = () => {
    const { query, isReady } = useRouter()
    const { currentLimit, currentPage, currentSearch } = useChangeUrl();
    const [ subCompetency, setSubCompetency ] = useState("")
    const [isView, setIsView] = useState(false)

    const getCompetencyById = async () => {
        const res = await competencyServices.getCompetencyById(`${query.id}`)
        const { data } = res
        return data.data
    }

    const { 
        data: dataCompetency, 
        isPending: isPendingDataCompetency 
    } = useQuery({
        queryKey: ["getCompetencyById", query.id],
        queryFn: getCompetencyById,
        enabled: !!query.id,
    })

    const getSubCompetencyByCompetency = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}`;
        if (currentSearch) {
            params += `&search=${currentSearch}`;
        }
        const res = await subCompetencyServices.getSubCompetencyByCompetency(`${query.id}`, params)
        const { data } = res
        const sortedData = data.data.sort((a: { createdAt: string }, b: { createdAt: string }) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        return sortedData;
    }

    const {
        data: competency,
        isPending: isPendingCompetency, 
    } = useQuery({
        queryKey: ["getSubCompetencyByCompetency", query.id],
        queryFn: getSubCompetencyByCompetency,
        enabled:!!query.id 
    })

    const firstId = competency?.[0]?._id

    const getSubCompetencyById = async () => {
        const res = await subCompetencyServices.getSubCompetencyById(
            subCompetency ? `${subCompetency}` : `${firstId}`
        );
        const { data } = res
        return data.data
    }

    const {
        data: subCompetencyById,
        isPending: isPendingSubCompetencyById,
    } = useQuery({
        queryKey: ["getSubCompetencyById", subCompetency, firstId],
        queryFn: getSubCompetencyById,
        enabled: !!subCompetency || !!firstId,
    })

    const getHistoryKuis = async () => {
        const res = await scoreServices.getScoreAllByUser()
        const { data } = res
        const filterLulus = data.data.filter((item: IScore) => item.isPass === true )
        return filterLulus
    }

    const {
        data: historyKuis,
        isPending: isPendingHistoryKuis,
    } = useQuery({
        queryKey: ["getHistoryKuis", subCompetencyById?._id, subCompetency],
        queryFn: getHistoryKuis,
        enabled: !!subCompetencyById?._id,
    })

    const getVideo = async() => {
        const id = subCompetency || firstId
        const res = await videoServices.getVideoBySubCompetency(`${id}`)
        const { data } = res
        return data.data
    }

    const {
        data: dataVideo,
        isPending: isPendingVideo,
    } = useQuery({
        queryKey: ["getVideo", subCompetencyById?._id, subCompetency],
        queryFn: getVideo,
        enabled: !!subCompetencyById?._id || !!isReady,
    })

    useEffect(()=> {
        if(dataVideo !== null) {
            setIsView(true)
        } else (
            setIsView(false)
        )
    }, [dataVideo])

    useEffect(() => {
        if (!competency || competency.length === 0) return;
        if (!historyKuis) return;

        const lastId = competency[competency.length - 1]?._id;

        if (historyKuis.bySubCompetency === lastId) {
            console.log("Semua subCompetency telah selesai");
            // Bisa juga nanti trigger API update progres user, dsb.
        }
    }, [competency, historyKuis]);

    return {
        competency,
        isPendingCompetency,
        dataCompetency,
        isPendingDataCompetency,

        subCompetencyById,
        isPendingSubCompetencyById,

        historyKuis,
        isPendingHistoryKuis,

        subCompetency,
        setSubCompetency,

        isView,
        setIsView,

        dataVideo,
        isPendingVideo,
    }
}

export default useDetailCompetency