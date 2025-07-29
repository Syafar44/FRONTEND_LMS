import CardCourse from "@/components/ui/CardCourse";
import { Badge, Button, Card, CardBody, Select, SelectItem, Skeleton } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import useHome from "./useHome";
import Swal from "sweetalert2";

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

        required,

        dataLkp,
    } = useHome()

    const isPass = dataResume?.isPass
    
    const competency = [
        {
            label: "Core Competency",
            link: "/kelas-kompetensi/core"
        },
        {
            label: "Functional Competency",
            link: "/kelas-kompetensi/functional"
        },
        {
            label: "Managerial Competency",
            link: "/kelas-kompetensi/managerial"
        }
    ]
    
    const handleChange = (value: string) => {
        const selected = competency.find(item => item.label === value);
        if (selected) {
            router.push(selected.link);
        }
    };
    const profile = dataUser?.data

    const progress = dataSave?.progress / dataSubCompetency?.length * 100

    const lkp = dataLkp ? 1 : 0

    const completedLkp = () => {
        Swal.fire({
            title: 'Anda sudah mengisi Lkp hari ini.',
            icon: 'warning',
            showCancelButton: false,
            confirmButtonText: 'Ok, Tutup',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'bg-primary hover:bg-gray-700 hover:text-white font-semibold py-2 px-4 rounded',
            }
        })
    }

    return (
        <div className="grid gap-5">
            <section className="flex flex-col gap-3 md:gap-5 md:flex-row w-full">
                {!isPendingUser ? (
                    <Card className="md:w-[700px]">
                        <CardBody className="p-5">
                            <div className="flex gap-5 items-center">
                                <Image src={profile?.image} alt="syafar" width={1000} height={1000} className="rounded-full w-[80px] h-[80px] object-cover" />
                                <div>
                                    <h2 className="font-bold text-lg">
                                        {profile?.fullName}
                                    </h2>
                                    <p>
                                        {profile?.department}
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
                <div className="flex items-center gap-2 md:gap-5 w-full">
                    <Card className="w-full h-full">
                        <CardBody className="py-5 flex flex-col items-center justify-center gap-2 shadow-sm w-full bg-white">
                            <h3 className="text-xs">
                                Kompetensi Wajib
                            </h3>
                            <p className="text-3xl text-primary">{required?.length ?? 0}</p>
                        </CardBody>
                    </Card>
                    <Card className="w-full h-full">
                        <CardBody className="py-5 flex flex-col items-center justify-center gap-2 shadow-sm w-full bg-white">
                            <h3 className="text-xs">
                                Sedang Berjalan
                            </h3>   
                            <p className="text-3xl text-primary">{dataSave ? 1 : 0}</p>
                        </CardBody>
                    </Card>
                </div>
            </section>
                <div className="grid gap-3 w-full md:max-w-[500px]">
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
                    <Badge className=" bg-red-600 border-none" content="" isInvisible={lkp === 1 ? true : false} placement="top-right">
                        <Button 
                            className="w-full bg-primary shadow-md"
                            onPress={() => lkp === 1 ? completedLkp() : router.push("/lkp")}
                        >
                            Isi Lembar Kepatuhan Pribadi ( {lkp} / 1 )
                        </Button>
                    </Badge>
                </div>
            <section className="grid gap-3">
                <h3 className="font-bold text-lg">Lanjutkan Belajar</h3>
                    {dataSave ? (
                        <div className="grid md:grid-cols-3 xl:grid-cols-4">
                            {!isPendingSave && !isPendingCompetency ? (
                                <CardCourse 
                                    competency={dataCompetency?.main_competency} 
                                    data={dataCompetency} 
                                    progress={progress}
                                    history={dataSave?.history}
                                />
                            ) : (
                                <Skeleton className="w-full h-[200px] rounded-lg" />
                            )}
                        </div>
                    ): (
                        <div className="grid md:grid-cols-3 xl:grid-cols-4">
                            <div className="border w-full h-[300px] rounded-lg flex items-center justify-center">
                                <p>Belum ada materi yang di ambil</p>
                            </div>
                        </div>
                    )}
            </section>
            <section className="grid gap-3">
                <h3 className="font-bold text-lg">Kajian Minggu Ini</h3>
                <div className="grid md:grid-cols-3 xl:grid-cols-4">
                    {!isPendingKajian ? (
                        <CardCourse type="kajian" data={dataKajian} isPass={isPass}/>
                    ): (
                        <Skeleton className="w-full h-[200px] rounded-lg" />
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;