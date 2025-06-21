import CardCourse from "@/components/ui/CardCourse"
import { Input, Pagination, Skeleton } from "@heroui/react"
import { CiSearch } from "react-icons/ci"
import useManagerial from "./useManagerial"
import { ICompetency } from "@/types/Competency"
import useChangeUrl from "@/hooks/useChangeUrl"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Managerial = () => {
    const {
        dataCourse,
        isPendingCourse,
    } = useManagerial()

    const {
    currentPage,
    handleChangePage,
  } = useChangeUrl();

    const { isReady } = useRouter();
    const { setUrl } = useChangeUrl()

    useEffect(() => {
        if (isReady) {
          setUrl();
        }
      }, [isReady]);

    return (
        <div className="grid gap-5">
            <section>
                <Input
                    className="w-full md:w-1/4"
                    startContent={<CiSearch />}
                    placeholder="Cari Bedasarkan Judul..."
                />
            </section>
            <section>
                {!isPendingCourse ? (
                    <div className="grid gap-5 md:grid-cols-3">
                        {dataCourse?.data.map((course: ICompetency) => {
                            return (
                            <CardCourse
                                key={course._id}
                                data={course}
                                competency="managerial"
                                progress={true}
                            />)
                        })}
                        <div className="flex justify-center md:justify-end">
                            {dataCourse?.pagination?.totalPages > 1 && (
                                <Pagination
                                    isCompact
                                    showControls
                                    className="text-black"
                                    color="primary"
                                    page={Number(currentPage)}
                                    total={dataCourse?.pagination?.totalPages}
                                    onChange={handleChangePage}
                                    loop
                                />
                            )}
                        </div>
                    </div>
                ): (
                    <Skeleton />
                )}
            </section>
        </div>
    )
}

export default Managerial