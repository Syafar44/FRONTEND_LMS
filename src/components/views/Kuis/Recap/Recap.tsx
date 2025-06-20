import { Button, Spinner } from "@heroui/react"
import useRecap from "./useRecap"

const Recap = () => {
    const { 
        dataScore, 
        isPendingScore, 
        router, 
        dataSub, 
        isPendingSub,
        dataCompetency,
        isPendingCompetency,
        totalScore,
        totalSoal,
    } = useRecap()

    const recap = dataScore
    

    const isPending = isPendingScore || isPendingSub || isPendingCompetency

    return (
        <div>
            {!isPending ? (
                <div className="grid gap-10">
                    <section>
                        <h2 className="font-bold">Tanggal :</h2>
                        <p>{recap?.createdAt}</p>
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
                            onPress={() => router.push(`/kelas-kompetensi/${dataCompetency?.main_competency}/${dataCompetency?._id}`)}
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