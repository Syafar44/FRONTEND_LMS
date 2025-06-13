import CardCourse from "@/components/ui/CardCourse"
import { Input, Skeleton } from "@heroui/react"
import { CiSearch } from "react-icons/ci"
import useFunctional from "./useFunctional"
import { ICompetency } from "@/types/Competency"

const Functional = () => {
    const {
        dataCourse,
        isPendingCourse,
    } = useFunctional()

    return (
        <div className="grid gap-5">
            <section>
                <Input
                    startContent={<CiSearch />}
                    placeholder="Cari Bedasarkan Judul..."
                />
            </section>
            <section>
                {!isPendingCourse ? (
                    <div className="grid gap-5">
                        {dataCourse?.data.map((course: ICompetency) => {
                            return (
                            <CardCourse
                                key={course._id}
                                data={course}
                                competency="functional"
                            />)
                        })}
                    </div>
                ): (
                    <Skeleton />
                )}
            </section>
        </div>
    )
}

export default Functional