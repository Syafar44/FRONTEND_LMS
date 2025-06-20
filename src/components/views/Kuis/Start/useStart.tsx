import kuisCompetencyServices from "@/services/kuisCompetency.service"
import scoreServices from "@/services/score.service"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const LOCAL_STORAGE_KEY = "jawaban_kuis"

const useStart = () => {
    const router = useRouter()
    const { id, number  } = router.query
    const [numberSoal, setNumberSoal] = useState(1)
    const [radioSelect, setRadioSelect] = useState<string | null>(null)
    const [jumlahSoal, setJumlahSoal] = useState<number | null>(0)
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        if (!router.isReady) return
        const queryNumber = typeof number === "string" ? parseInt(number) : NaN
        if (!isNaN(queryNumber) && queryNumber !== numberSoal) {
            const query = { ...router.query, number: numberSoal.toString() }
            router.replace({ pathname: router.pathname, query }, undefined, { shallow: true })
        }
    }, [numberSoal, number, router])


    const getKuis = async() => {
        const res = await kuisCompetencyServices.getKuisCompetencyBySubCompetency(`${id}`)
        const { data } = res
        setJumlahSoal(data.data.length)
        const getKuis = data.data[numberSoal - 1]
        return getKuis
    }

    const { data: dataKuis, isPending: isPendingKuis } = useQuery({
        queryKey: ['kuis', id, numberSoal],
        queryFn: getKuis,
        enabled: !!id
    });

    const handleSelect = (select: number, finish: boolean) => {
        if (!finish) {
            setNumberSoal((prev) => prev + 1)
        }
        const prevScore = Number(localStorage.getItem(LOCAL_STORAGE_KEY)) || 0
        const isCorrect = select === dataKuis?.optionValid
        const updatedScore = isCorrect ? prevScore + 1 : prevScore
        localStorage.setItem(LOCAL_STORAGE_KEY, String(updatedScore))
        setScore(Number(localStorage.getItem(LOCAL_STORAGE_KEY)) || 0)
        setRadioSelect(null)
    }

    useEffect(() => {
        if (router.isReady) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
        }
    }, [router.isReady]);

    const handleRecap = async() => {
        await scoreServices.addScore({
            bySubCompetency: `${id}`,
            isPass: Number(localStorage.getItem(LOCAL_STORAGE_KEY)) / Number(jumlahSoal) * 100 >= 80 ? true : false,
            total_question: Number(jumlahSoal),
            total_score: Number(localStorage.getItem(LOCAL_STORAGE_KEY)) || 0,
        })
        router.push(`/kuis/recap/${id}`)
    } 

    return{
        id,
        dataKuis, 
        isPendingKuis,
        numberSoal,
        setNumberSoal,
        radioSelect,
        setRadioSelect,
        handleSelect,
        jumlahSoal,
        router,
        score,

        handleRecap
    }
}

export default useStart