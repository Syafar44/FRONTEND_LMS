import { Snippet, Spinner } from "@heroui/react";
import Image from "next/image";
import QRCode from "react-qr-code";
import useDetailCertificate from "./useCertificate";
import { convertDate } from "@/utils/date";

const DetailCertificate = () => {

  const { 
    dataCertificateDetail, 
    isPendingCertificateDetail,
  } = useDetailCertificate();

  console.log("dataCertificateDetail", dataCertificateDetail)

  const res = dataCertificateDetail

  console.log("res", res?.id)


  const link = `https://lms.panglimaroqiiqugroup.com/certificate/${res?.id}`

  return (
    <div className="relative flex flex-col 2xl:flex-row gap-5 items-center h-screen">
      {/* Kanvas sertifikat */}
      {!isPendingCertificateDetail ? (
        <>  
          <div className="relative w-full max-w-[900px] 2xl:min-w-[900px] bg-white overflow-hidden shadow-xl rounded-xl">
            {/* Pola diamond samar di belakang */}
            <div className="absolute inset-0 pointer-events-none opacity-10 grid grid-cols-4 place-content-center gap-8 xl:gap-14">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className="w-14 h-14 lg:w-20 lg:h-20 xl:w-32 xl:h-32 bg-neutral-300 rotate-45 rounded-2xl justify-self-center self-center"
                />
              ))}
            </div>
            
            {/* Ornamen SVG */}
            <div className="absolute -right-[22%] lg:-right-[230px] xl:-right-[340px] z-20">
              <svg viewBox="0 0 953 4053" className="w-[60vw] h-[320px] sm:h-[450px] md:h-[550px] lg:h-[600px] xl:w-[900px] xl:h-[780px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="72.7422" y="2018.66" width="244" height="988.824" transform="rotate(-40 72.7422 2018.66)" fill="#B99026"/>
                <rect x="371.984" width="1107" height="4053" fill="#545454"/>
                <path d="M756.66 1330.62L913.5 1517.53L172.82 2139.04L15.9798 1952.12C305.233 1709.41 467.406 1573.33 756.66 1330.62Z" fill="#F8BD1D"/>
                <rect x="670.985" width="244" height="1515" fill="#F8BD1D"/>
                <path d="M174.25 2143.44V1812L1.25 1949.88L173.159 2143.96L174.25 2145V2143.44Z" fill="white" stroke="white"/>
              </svg>
            </div>

            <div className="border md:border-2 border-[#545454] m-3 xl:m-9 w-full h-[91%] xl:h-[89%] rounded-lg p-2 sm:p-4 xl:p-5 relative z-10">
              {/* Content */}
              <div className="flex items-center gap-3 mb-2 xl:mb-5">
                <Image
                  src="https://res.cloudinary.com/doyafjjum/image/upload/v1752470088/maskable-icon_ljfnvc.png"
                  alt="Logo Panglima University"
                  width={180}
                  height={60}
                  className="w-8 sm:w-14 md:w-16 xl:w-20 rounded-md"
                />
                <h2 className="text-[6px] sm:text-[10px] md:text-xs xl:text-xl italic">PANGLIMA UNIVERSITY.</h2>
              </div>

              {/* Certificate Title */}
              <h1 className="text-[10px] sm:text-base md:text-xl xl:text-2xl font-bold text-secondary uppercase">
                Sertifikat Kompetensi Kelulusan
              </h1>

              {/* Code */}
              <div className="uppercase sm:mt-2 xl:mt-4 inline-block bg-gray-700 text-white px-3 xl:px-4 py-0.5 rounded-md xl:rounded-lg text-[7px] sm:text-xs xl:text-sm font-semibold">
                {res?.id}
              </div>

              {/* Given to */}
              <div className="grid md:gap-2 xl:gap-3 mt-1 sm:mt-3 xl:mt-5">
                <div>
                  <p className="text-secondary text-[7px] sm:text-[12px] md:text-sm xl:text-base">Diberikan kepada</p>
                  <h2 className="text-sm sm:text-xl md:text-3xl xl:text-4xl font-bold text-primary">{res?.createdBy?.fullName}</h2>

                </div>
                <div>
                  <p className="text-secondary text-[7px] sm:text-[12px] md:text-sm xl:text-base">Atas kelulusannya pada kelas</p>
                  <h3 className="text-xs sm:text-base md:text-xl xl:text-2xl font-bold text-primary">{res?.competency?.title}</h3>

                </div>
              </div>

              <div className="flex gap-0 justify-between items-end w-[82%] sm:w-[87%] lg:w-[83%] xl:w-[75%] 2xl:w-[76%] mt-[30px] sm:mt-[60px] lg:mt-[70px] xl:mt-[11%]">
                <div>
                  <p className="font-semibold text-[7px] sm:text-xs md:text-sm">{convertDate(res?.createdAt)}</p>

                  <p className="mt-4 sm:mt-6 md:mt-10 text-[7px] sm:text-xs md:text-base font-semibold">Adi</p>
                  <p className="text-[6px] sm:text-[10px] md:text-xs text-secondary">Hr Manager</p>
                  <p className="text-[6px] sm:text-[10px] md:text-xs text-secondary text-nowrap">Panglima Roqiiqu Group</p>
                </div>
                <div className="xl:translate-x-8">
                  <div className="w-full flex justify-end">
                    <QRCode value={link} className="w-[28px] h-[28px] sm:w-[60px] sm:h-[60px] xl:w-[80px] xl:h-[80px]" />
                  </div>
                  <div>  
                    <p className="text-[6px] sm:text-[10px] md:text-xs mt-1 text-right text-secondary">Verifikasi Sertifikat</p>
                    <p className="text-[6px] sm:text-[10px] md:text-xs text-right text-secondary break-all text-nowrap">{link}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4 xl:mb-5">
              <Image
                src="https://res.cloudinary.com/doyafjjum/image/upload/v1752470088/maskable-icon_ljfnvc.png"
                alt="Logo Panglima University"
                width={180}
                height={60}
                className="w-20 rounded-md"
              />
              <h2 className="text-lg italic">PANGLIMA UNIVERSITY.</h2>
            </div>
            <div className="grid gap-5">
              <p className="uppercase">ID: <strong>{res?.id}</strong></p>
              <h3>Diselesaikan oleh: <strong>{res?.createdBy?.fullName}</strong></h3>
              <p>Diadakan pada: <strong>{convertDate(res?.createdAt)}</strong></p>
              <p>Akun <strong>{res?.createdBy?.fullName}</strong> telah terverifikasi secara resmi oleh <strong>Panglima Roqiiqu Group</strong>. Maka dari itu kami mengeluarkan sertifikat ini sebagai bukti bahwa yang bersangkutan sudah menyelesaikan kelas <strong>{res?.competency?.title}</strong>.</p>


              <div className="grid gap-2">
                <p>Bagikan Sertifikat:</p>
                <Snippet
                  hideSymbol
                  size="sm"
                  variant="bordered"
                  className="w-full max-w-[300px] shadow-md"
                  codeString={link} // yang dicopy tetap full
                >
                  <span className="w-[230px] sm:w-full inline-flex items-center">
                    {/* kiri: auto-ellipsis saat sempit */}
                    <span className="truncate">{link.slice(0, -10)}</span>
                    {/* kanan: tetap tampil */}
                    <span className="shrink-0">{link.slice(-10)}</span>
                  </span>
                </Snippet>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-secondary h-full w-full rounded-md">
          <div className="flex justify-center items-center gap-2 my-40">
            <span className="p-4 flex gap-2 bg-white rounded-md">
              <Spinner size="sm" color="default"/>
              <p className="text-nowrap">Memverifikasi Sertifikat..</p>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailCertificate;
