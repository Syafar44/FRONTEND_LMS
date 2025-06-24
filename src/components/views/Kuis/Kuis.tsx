import { Button } from "@heroui/react"
import useKuis from "./useKuis"
import { IScore } from "@/types/Score"
import { convertTime } from "@/utils/date"

const Kuis = () => {
    const {
        id,
        router,
        dataScore,
        isPendingScore,
    } = useKuis()

    return (
        <div className="grid gap-5">
            <section className="grid gap-5">
                <div className="grid gap-5">
                    <h1 className="text-xl font-bold">Aturan</h1>
                    <p>Ujian akhir bertujuan untuk menguji pengetahuan Anda tentang semua materi yang telah dipelajari dalam video sebelumnya. </p>
                    <p>Terdapat 5 pertanyaan yang harus dikerjakan dalam ujian. Beberapa ketentuan yang harus diperhatikan sebagai berikut:</p>
                    <ul className="list-disc list-inside pl-5">
                        <li>Syarat nilai kelulusan : 80%</li>
                        <li>Durasi ujian: 5 menit</li>
                    </ul>
                    <p>Apabila tidak memenuhi syarat kelulusan, maka Anda harus menonton ulang video untuk mengulang pengerjaan kuis kembali. Manfaatkan waktu tersebut untuk mempelajari kembali kompetensi sebelumnya, ya.</p>
                    <h3>Selamat Mengerjakan!</h3>
                </div>
                <div className="flex justify-end">
                    <Button onPress={() => router.push(`/kuis/start/${id}?number=1`)} className="bg-accent text-primary">Mulai</Button>
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
                ): (!dataScore) ? (
                    <div className="flex justify-center items-center h-[100px]">
                        <p>Kerjakan Kuis Sekarang</p>
                    </div>
                ): (    
                    <div className="grid gap-5 h-[200px] overflow-scroll ">
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