import { Button } from "@heroui/react"
import useKuis from "./useKuis"
import { IScore } from "@/types/Score"
import { convertTime } from "@/utils/date"
import { PiFilePdfLight } from "react-icons/pi"

const Kuis = () => {
    const {
        id,
        dataIk,
        isPendingIk,
        router,
        dataScore,
        isPendingScore,
        remainingTime,
        formattedTime,
    } = useKuis()

    const timeDone = remainingTime !== 0

    return (
        <div className="grid gap-5 mx-auto max-w-[800px] md:p-5">
            <section className="grid gap-5">
                <div className="grid gap-5">
                    <h1 className="text-xl font-bold">Informasi</h1>
                    {!isPendingIk && (
                        <>
                            <h1 className="font-bold text-2xl">{dataIk?.title}</h1>
                            <p>{dataIk?.description}</p>
                        </>
                    )}
                    <p>Terdapat pertanyaan yang harus dikerjakan dalam ujian. Beberapa ketentuan yang harus diperhatikan sebagai berikut:</p>
                    <ul className="list-disc list-inside pl-5">
                        <li>Syarat nilai kelulusan : 80%</li>
                        <li>Durasi ujian: 10 menit</li>
                    </ul>
                    <h3>Selamat Mengerjakan!</h3>
                        {timeDone && (    
                            <div className="w-full border border-red-400 flex justify-between p-5 gap-10 rounded-lg bg-red-400/20">
                                <h3 className="text-danger">
                                    Mohon menunggu untuk mengambil kuis kembali
                                </h3>
                                <p className="text-nowrap font-bold text-red-500">
                                    {formattedTime}
                                </p>
                            </div>
                        )}
                </div>
                <div className="flex justify-end">
                    <Button isDisabled={isPendingScore || isPendingIk || timeDone} onPress={() => router.push(`/ik/kuis/start/${id}?number=1`)} className="bg-accent text-primary">Mulai</Button>
                </div>
            </section>
            <section className="grid gap-5">
                <h2>
                    Riwayat
                </h2>
                {isPendingScore ? (
                    <div className="flex justify-center items-center h-[100px]">
                        <p>Sedang di muat....</p>
                    </div>
                ): (dataScore.length <= 0 ) ? (
                    <div className="flex justify-center items-center h-[100px]">
                        <p>Kerjakan Kuis Sekarang</p>
                    </div>
                ): (     
                    <div className="flex flex-col gap-5 h-[200px] md:h-[400px] overflow-scroll ">
                        {dataScore.map((score: IScore) => {
                            const totalScore = score.total_score / score.total_question * 100
                            return(
                            <div key={score._id} className="bg-yellow-50 py-3 px-5 grid gap-2 rounded-lg h-[130px]">
                                <span className="flex gap-3 ">
                                    <h1 className="font-bold">Tanggal:</h1>
                                    <p>{convertTime(score?.createdAt)}</p>
                                </span>
                                <span className="flex gap-3 border-y py-2">
                                    <h1 className="font-bold">Skor:</h1>
                                    <p>{totalScore}</p>
                                </span>
                                <span className="flex gap-3 ">
                                    <h1 className="font-bold">Status:</h1>
                                    <span className={`border px-5 rounded-lg font-bold ${ totalScore >= 80 ? "border-green-500 bg-green-500/15" : "border-red-500 bg-red-500/15"}`}>
                                    {totalScore >= 80 ? (
                                        <p className="text-sm text-green-500">Lulus</p>
                                    ): (
                                        <p className="text-sm text-red-500">Gagal</p>
                                    )}
                                    </span>
                                </span>
                            </div>
                        )})}
                    </div>
                )}
            </section>
        </div>
    )
}

export default Kuis