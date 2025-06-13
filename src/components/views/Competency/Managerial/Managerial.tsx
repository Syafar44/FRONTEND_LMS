import CardCourse from "@/components/ui/CardCourse"
import { Input, Skeleton } from "@heroui/react"
import { CiSearch } from "react-icons/ci"
import useManagerial from "./useManagerial"
import { ICompetency } from "@/types/Competency"

const Managerial = () => {
    const {
        dataCourse,
        isPendingCourse,
    } = useManagerial()

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
                                competency="managerial"
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

export default Managerial