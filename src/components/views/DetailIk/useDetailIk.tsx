import useChangeUrl from "@/hooks/useChangeUrl"
import ikServices from "@/services/ik.service"
import scoreServices from "@/services/score.service"
import videoServices from "@/services/video.service"
import { IScore } from "@/types/Score"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"

const useDetailIk = () => {
    const router = useRouter()
    const containerRef = useRef<HTMLDivElement>(null);
    const [isView, setIsView] = useState(false)

    const getIkById = async () => {
        const res = await ikServices.getIkById(`${router.query.id}`)
        const { data } = res
        return data.data
    }

    const { 
        data: dataIk, 
        isPending: isPendingDataIk 
    } = useQuery({
        queryKey: ["getIkById", router.query.id],
        queryFn: getIkById,
        enabled: !!router.query.id,
    })

    const handleVideoEnd = async () => {
        setIsView(true)
    };

    return {
        dataIk,
        isPendingDataIk,
        handleVideoEnd,
        containerRef,
        isView,
        router,
    }
}

export default useDetailIk