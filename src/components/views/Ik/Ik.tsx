
import { Input, Pagination, Skeleton } from "@heroui/react"
import { CiSearch } from "react-icons/ci"
import useIk from "./useIk"
import CardCourse from "@/components/ui/CardCourse"
import useChangeUrl from "@/hooks/useChangeUrl"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { IIk } from "@/types/Ik"

const Ik = () => {
    const {
        dataIk,
        isPendingIk,
    } = useIk()

    const {
        setUrl,
        currentPage,
        handleChangePage,
        handleSearch,
  } = useChangeUrl();

    const { isReady } = useRouter();

    useEffect(() => {
        if (isReady) {
          setUrl();
        }
      }, [isReady]);

    const isPending =  isPendingIk

    return (
        <div className="grid gap-5">
            <section>
                <Input
                    onChange={handleSearch}
                    className="w-full md:w-1/4"
                    startContent={<CiSearch />}
                    placeholder="Cari Bedasarkan Judul..."
                />
            </section>
            <section>
                {!isPending ? (
                    <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-4">
                        {dataIk?.data.map((ik: IIk) => {
                            return (
                            <CardCourse
                                key={ik._id}
                                data={ik}
                                type="instructions"
                            />
                        )
                        })}
                        <div className="flex justify-center md:justify-end">
                            {dataIk?.pagination?.totalPages > 1 && (
                                <Pagination
                                    isCompact
                                    showControls
                                    className="text-black"
                                    color="primary"
                                    page={Number(currentPage)}
                                    total={dataIk?.pagination?.totalPages}
                                    onChange={handleChangePage}
                                    loop
                                />
                            )}
                        </div>
                    </div>
                ): (
                    <div className="grid md:grid-cols-3 xl:grid-cols-4">
                        <Skeleton className="h-[240px] w-full rounded-lg"/>
                    </div>
                )}
            </section>
        </div>
    )
}

export default Ik