import CardCourse from "@/components/ui/CardCourse";
import { Card, CardBody, Select, SelectItem, Skeleton, Spinner } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import useHome from "./useHome";

const Home = () => {
    const router = useRouter()

    const {
        dataUser,
        isPendingUser,

        dataKajian,
        isPendingKajian,

        dataResume,
        isPendingResume,

        dataSave,
        isPendingSave,

        dataCompetency,
        isPendingCompetency,

        dataSubCompetency,
        isPendingSubCompetency,

        required,
    } = useHome()

    const isPass = dataResume?.isPass
    
    const competency = [
        {
            label: "Core Competency",
            link: "/kelas-kompetensi/core"
        },
        {
            label: "Functional Competency",
            link: "/kelas-kompetensi/core"
        },
        {
            label: "Managerial Competency",
            link: "/kelas-kompetensi/core"
        }
    ]
    
    const handleChange = (value: string) => {
        const selected = competency.find(item => item.label === value);
        if (selected) {
            router.push(selected.link);
        }
    };
    const profile = dataUser?.data
    const avatarUrl = `https://ui-avatars.com/api/background=F8BD1B&color=000000?name=${encodeURIComponent(profile?.fullName)}&bold=true&uppercase=true`

    const progress = dataSave?.progress / dataSubCompetency?.length * 100

    console.log(avatarUrl)
    console.log(dataCompetency)

    return (
        <div className="grid gap-5">
            {profile ? (
                <Card>
                    <CardBody className="p-5">
                        <div className="flex gap-5 items-center">
                            <Image src={avatarUrl} alt="syafar" width={1000} height={1000} className="rounded-full w-1/5" />
                            <div>
                                <h2 className="font-bold text-lg">
                                    {profile?.fullName}
                                </h2>
                                <p>
                                    {profile?.job}
                                </p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            ) : (
                <div>
                    <Skeleton className="w-full h-[100px] rounded-lg" />
                </div>
            )}
            <Select
                color="default"
                size="lg"
                variant="bordered"
                placeholder="Daftar Kompetensi Utama"
                onChange={(e) => handleChange(e.target.value)}
                >
                {competency.map((item) => (
                    <SelectItem key={item.label} value={item.label}>
                        {item.label}
                    </SelectItem>
                ))}
            </Select>
            <section className="grid grid-cols-3 gap-2">
                <div className="border py-5 rounded-xl flex flex-col items-center gap-2">
                    <h3 className="text-xs">
                        Kompetensi Wajib
                    </h3>
                    <p className="text-3xl text-primary">{required?.length ?? 0}</p>
                </div>
                <div className="border py-5 rounded-xl flex flex-col items-center gap-2">
                    <h3 className="text-xs">
                        Sedang Berjalan
                    </h3>   
                    <p className="text-3xl text-primary">{dataSave ? 1 : 0}</p>
                </div>
                <div className="border py-5 rounded-xl flex flex-col items-center gap-2">
                    <h3 className="text-xs">
                        Sertifikat
                    </h3>
                    <p className="text-3xl text-primary">0</p>
                </div>
            </section>
            <section className="grid gap-3">
                <h3 className="font-bold text-lg">Lanjutkan Belajar</h3>
                    {dataSave ? (
                        <div>
                            {!isPendingSave && !isPendingCompetency ? (
                                <CardCourse competency={dataCompetency?.main_competency} data={dataCompetency} progress={progress}/>
                            ) : (
                                <Skeleton className="w-full h-[200px] rounded-lg" />
                            )}
                        </div>
                    ): (
                        <div className="flex justify-center items-center h-[200px]">
                            <p>Belum ada kelas yang di ambil</p>
                        </div>
                    )}

            </section>
            <section className="grid gap-3">
                <h3 className="font-bold text-lg">Kajian Minggu Ini</h3>
                {!isPendingKajian ? (
                    <CardCourse type="kajian" data={dataKajian} isPass={isPass}/>
                ): (
                    <Skeleton className="w-full h-[200px] rounded-lg" />
                )}
            </section>
        </div>
    );
};

export default Home;
