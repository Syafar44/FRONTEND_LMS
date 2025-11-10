import kajianServices from "@/services/kajian.service"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useRef, useState } from "react"

const useDetailKajian = () => {
    const router = useRouter()
    const containerRef = useRef<HTMLDivElement>(null);
    const [isView, setIsView] = useState(false)

    const getKajianById = async () => {
        const res = await kajianServices.getKajianById(`${router.query.id}`)
        const { data } = res
        return data.data
    }

    const { 
        data: dataKajian, 
        isPending: isPendingDataKajian 
    } = useQuery({
        queryKey: ["getKajianById", router.query.id],
        queryFn: getKajianById,
        enabled: !!router.query.id,
    })

    const handleVideoEnd = async () => {
        setIsView(true)
    };

    return {
        dataKajian,
        isPendingDataKajian,
        handleVideoEnd,
        containerRef,
        isView,
        router,
    }
}

export default useDetailKajian