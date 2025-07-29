import { IKajian } from "@/types/Kajian"
import { CardBody, Card, Progress, Link } from "@heroui/react"
import Image from "next/image"
import { BiSolidLock } from "react-icons/bi";
import { RiTimerLine } from "react-icons/ri";

interface PropTypes {
    type?: string
    data: IKajian
    competency?: string
    isPass?: boolean
    progress?: number
    isLock?: boolean
    isAccess?: boolean
    isCompleted?: boolean
    isCountdown?: boolean
    history?: string
}

const CardCourse = (props: PropTypes) => {
    const { 
        type = "course",
        data,
        competency,     
        isPass,
        progress,
        isLock,
        isAccess,
        isCompleted,
        isCountdown,
        history,
    } = props

  return (
    <Card>
        <CardBody className="relative p-0">
             {(!isCompleted && (isLock || isAccess === false)) && (
                <div className="bg-white/30 absolute h-full w-full top-0 border z-40 flex justify-center items-center">
                        <BiSolidLock size={100} className="font-bold text-primary "/>
                </div>
            )}
            {(isCountdown && !isCompleted) && (
                <div className="bg-white/30 absolute h-full w-full top-0 border z-40 flex justify-center items-center">
                    <RiTimerLine size={100} className="font-bold text-primary "/>   
                </div>
            )}
            <Link href={type === "course" ? `/kelas-kompetensi/${competency}/${data?._id}${history !== undefined ? `?sub=${history}` : ""}` : `/kajian-online/${data?._id}`} className="grid gap-3 p-3">
                {data?.image === undefined ? (
                    <Image src={"https://res.cloudinary.com/doyafjjum/image/upload/v1752723514/y9DpT_eac19z.jpg"} alt={"Load Image"} className="w-full h-auto rounded-lg" width={1000} height={1000} />
                ) :(
                    <Image src={`${data?.image}`} alt={`${data?.title}`} className="w-full h-auto rounded-lg" width={1000} height={1000} />
                )}
                <div>
                    <h4 className="font-bold text-black">
                        {data?.title}
                    </h4>
                    <p className="text-sm text-gray-500 line-clamp-2">
                        {type === "course" ? "Panglima University" : data?.description}
                    </p>
                </div>
                {(progress ?? 0) > 0 && (
                    <Progress
                        classNames={{
                            base: "max-w-md mb-2",
                            track: "drop-shadow-md",
                            indicator: "bg-primary",
                            label: "tracking-wider font-medium text-default-600",
                            value: "text-foreground/60",
                        }}
                        label="Progress"
                        radius="sm"
                        showValueLabel={true}
                        size="sm"
                        value={progress}
                    />
                )}
                {type === "kajian" && (
                    <div className="flex justify-end">
                        {isPass ? (
                            <p className="text-sm text-green-500">Selesai</p>
                        ): (
                            <p className="text-sm text-danger">Belum Selesai</p>
                        )}
                    </div>
                )}
            </Link>
        </CardBody>
    </Card>
  )
}

export default CardCourse