import CardCourse from "@/components/ui/CardCourse";
import { Card, CardBody, Select, SelectItem, Skeleton } from "@heroui/react";
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
    } = useHome()
    
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
                                    Jobs
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
            <section className="grid gap-3">
                <h3 className="font-bold text-lg">Lanjutkan Belajar</h3>
                <div className="flex justify-center items-center h-[200px]">
                    <p>Belum ada kelas yang di ambil</p>
                </div>
            </section>
            <section className="grid gap-3">
                <h3 className="font-bold text-lg">Kajian Minggu Ini</h3>
                {!isPendingKajian ? (
                    <CardCourse type="kajian" data={dataKajian} />
                ): (
                    <Skeleton className="w-full h-[200px] rounded-lg" />
                )}
            </section>
        </div>
    );
};

export default Home;
