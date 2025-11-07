import { Card, CardBody, CardHeader, Input, Pagination, Skeleton } from "@heroui/react"
import { CiSearch } from "react-icons/ci"
import useSop from "./useSop"
import useChangeUrl from "@/hooks/useChangeUrl"
import { useRouter } from "next/router"
import { useEffect } from "react";
import { ISop } from "@/types/Sop"
import Link from "next/link"

const Sop = () => {
    const {
        dataSop,
        isPendingSop,
        router,
    } = useSop()
    
    const {
        setUrl,
        currentPage,
        handleChangePage,
        handleSearch,
        handleClearSearch,
    } = useChangeUrl();
    
    const { isReady } = useRouter();
    
    useEffect(() => {
        if (isReady) {
            setUrl();
        }
    }, [isReady]);
    
    const isPending = isPendingSop

    return (
        <div className="grid gap-5">
            <section>
                <Input
                    onChange={handleSearch}
                    onClear={handleClearSearch}
                    className="w-full md:w-1/4"
                    startContent={<CiSearch />}
                    placeholder="Cari Bedasarkan Judul..."
                />
            </section>
            <section>
                {!isPending ? (
                    dataSop?.data?.length > 0 ? (
                        <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-4">
                            {dataSop?.data.map((sop: ISop) => {
                                return (
                                    <Link key={sop.slug} href={`/sop/kuis/${sop.slug}`}>
                                        <Card onPress={() => router.push(`/sop/${sop.slug}`)}>
                                            <CardHeader className="p-0">
                                                <div className="bg-primary w-full h-10" />
                                            </CardHeader>
                                            <CardBody>
                                                <h2 className="text-xl font-bold pb-3">
                                                    {sop.title}
                                                </h2>
                                                <p className="text-sm text-secondary/80 line-clamp-6">
                                                    {sop.description}
                                                </p>
                                            </CardBody>
                                        </Card>
                                    </Link>
                                )
                            })}
                            <div className="flex justify-center md:justify-end">
                                {dataSop?.pagination?.totalPages > 1 && (
                                    <Pagination
                                        isCompact
                                        showControls
                                        className="text-black"
                                        color="primary"
                                        page={Number(currentPage)}
                                        total={dataSop?.pagination?.totalPages}
                                        onChange={handleChangePage}
                                        loop
                                    />
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center px-10 border py-20 rounded-lg"> 
                            <h2 className="text-lg font-bold">Belum ada kompetensi yang di Tambahkan.</h2>
                        </div>
                    )
                ): (
                    <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-5">
                        <Skeleton className="h-[240px] md:h-[340px] rounded-lg" />
                        <Skeleton className="h-[240px] md:h-[340px] rounded-lg" />
                    </div>
                )}
            </section>
        </div>
    )
}

export default Sop