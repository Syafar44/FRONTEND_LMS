import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { useRouter } from "next/router";
import { PiBookOpenLight, PiBrainLight, PiGridFourLight, PiToolboxLight, PiUserCircleLight, PiUsersThreeLight } from "react-icons/pi";

const Dashboard = () => {
    const router = useRouter()
    return ( 
        <Card className="max-w-[750px]">
            <CardHeader className="flex border-b gap-5 py-5">
                <PiGridFourLight size={30} />
                <h2 className="font-bold text-xl">
                    Akses Cepat
                </h2>
            </CardHeader>
            <CardBody className="grid gap-5 px-5 py-8 overflow-hidden">
                <div className="flex flex-col md:flex-row gap-5 w-full justify-between">
                    <Button
                        size="lg"
                        className="bg-primary shadow-md grid h-full p-5"
                        onPress={() => router.push('/admin/kelas-kompetensi/core')}
                    >
                        <PiBrainLight size={50} />
                        Tambah Materi Core
                    </Button>
                    <Button
                        size="lg"
                        className="bg-primary shadow-md grid h-full p-5"
                        onPress={() => router.push('/admin/kelas-kompetensi/functional')}
                    >
                        <PiToolboxLight size={50} />
                        Tambah Materi Functional
                    </Button>
                    <Button
                        size="lg"
                        className="bg-primary shadow-md grid h-full p-5"
                        onPress={() => router.push('/admin/kelas-kompetensi/managerial')}
                    >
                        <PiUsersThreeLight size={50} />
                        Tambah Materi Managerial
                    </Button>
                </div>
                <div className="grid gap-5">
                    <Button
                        size="lg"
                        className="bg-primary shadow-md flex items-center h-full w-full p-3"
                        onPress={() => router.push('/admin/administrasi')}
                    >
                        <PiUserCircleLight size={50} />
                        <p className="text-xl">Registrasikan User</p>
                    </Button>
                    <Button
                        size="lg"
                        className="bg-primary shadow-md flex items-center h-full w-full p-3"
                        onPress={() => router.push('/admin/aktivitas')}
                    >
                        <PiBookOpenLight size={50} />
                        <p className="text-xl">Rekap Kajian</p>
                    </Button>
                </div>
            </CardBody>
        </Card>
    )
}

export default Dashboard;