import CardCourse from "@/components/ui/CardCourse"
import { Input, Pagination, Skeleton } from "@heroui/react"
import { CiSearch } from "react-icons/ci"
import useCompetency from "./useCompetency"
import { ICompetency } from "@/types/Competency"
import useChangeUrl from "@/hooks/useChangeUrl"
import { useEffect } from "react"
import { useRouter } from "next/router"

const Competency = () => {
    const {
        dataCourse,
        isPendingCourse,
        
        dataSave,
        isPendingSave,

        dataSubCompetency,
        isPendingSubCompetency,

        pathSegments,

        dataUser,
        isPendingUser
    } = useCompetency()

    console.log(dataCourse)

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

    const isPending = isPendingCourse || isPendingUser 

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
                {!isPending ? (
                    <div className="grid gap-5 md:grid-cols-3">
                        {dataCourse?.data.map((course: ICompetency) => {
                            const isProgress = dataSave?.competency === course?._id;
                            const progress = (dataSave?.progress ?? 0) / (dataSubCompetency?.length ?? 1) * 100;
                            const lock = dataSave ? (isProgress ? false : true) : false
                            const accessUser = dataUser?.access;
                            const accessCourse = course?.access || [];
                            const access = accessCourse.includes(accessUser); 
                            const isAccess = dataSave ? false : access
                            const allAccess = course?.access?.includes('all-team')
                            return (
                            <CardCourse
                                key={course._id}
                                data={course}
                                competency={`${pathSegments[2]}`}
                                progress={isProgress ? progress : 0}
                                isLock={lock}
                                isAccess={allAccess ? true : isAccess}
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
                    <div className="grid gap-5">
                        <Skeleton className="h-[240px] rounded-lg" />
                        <Skeleton className="h-[240px] rounded-lg" />
                    </div>
                )}
            </section>
        </div>
    )
}

export default Competency