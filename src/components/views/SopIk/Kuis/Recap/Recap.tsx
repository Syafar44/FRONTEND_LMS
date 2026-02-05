import { Button, Spinner } from "@heroui/react"
import useRecap from "./useRecap"
import { convertTime } from "@/utils/date"

const Recap = () => {
    const { 
        dataScore, 
        isPendingScore, 
        dataSub, 
        isPendingSub,
        totalScore,
        totalSoal,
    } = useRecap()

    const recap = dataScore
    
    const isPending = isPendingScore || isPendingSub 

    return (
        <div className="mx-auto max-w-[600px]">
            {!isPending ? (
                <div className="grid gap-10">
                    <section className="grid gap-3">
                        <div className="flex gap-5">
                            <h2 className="font-bold text-xl">Materi :</h2>
                            <p className="text-xl">{dataSub?.title}</p>
                        </div>   
                        <div className="flex gap-5">
                            <h2 className="font-bold">Tanggal :</h2>
                            <p>{convertTime(recap?.createdAt)}</p>
                        </div>   
                    </section>
                    <section className="flex justify-center items-center gap-20">
                        <div className="flex flex-col items-center gap-5">
                            <h1 className="text-xl font-bold">Total Soal</h1>
                            <p className="text-4xl font-bold">
                                {totalSoal}
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-5">
                            <h1 className="text-xl font-bold">Total Score</h1>
                            <p className="text-4xl font-bold">
                                {totalScore}
                            </p>
                        </div>
                    </section>
                    <section >
                        {totalScore >= 80 ? (
                            <div>
                                <p>Selamat anda telah menyelesaikan kuis ini, semoga ilmu yang telah di pelajari dapat di mengerti dan akan berguna di kemudian hari</p>
                            </div>
                        ): (
                            <div className="grid gap-5">    
                                <p>Skor Anda belum memenuhi batas minimum yang ditentukan pada ujian ini: 80</p>
                                <p>Mohon untuk kembali Video Kompetensi terkait: {dataSub?.title} </p>
                            </div>
                        )}
                    </section>
                    <div className="flex justify-end">
                        <Button
                            onPress={() => window.location.href = totalScore >= 80 ? '/post-test' : `/post-test/kuis/${dataSub?.slug}`}
                            className="bg-primary text-black px-10">
                            Kembali
                        </Button>
                    </div>
                </div>
            ): (
                <div className="flex flex-col items-center justify-center py-32 gap-5">
                    <Spinner />
                    <p>Recap sedang di muat</p>
                </div>
            )}
            
        </div>
    )
}

export default Recap