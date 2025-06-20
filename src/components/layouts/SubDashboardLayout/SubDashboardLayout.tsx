import { Link } from "@heroui/react";
import Image from "next/image";
import { ReactNode } from "react";

interface PropTypes {
    children: ReactNode;
}

const SubDashboardLayout = (props: PropTypes) => {
    const { children } = props

    return (
        <div>
            <nav className="px-5 py-3 border-b shadow-md flex justify-between items-center mb-5">
                <Link href="/">
                    <Image 
                        src="/images/general/logo.png" 
                        className="rounded-lg w-[80px]"
                        alt="logo" 
                        width={100} 
                        height={100} 
                    />
                </Link>
            </nav>
            <div className="px-5">
                {children}
            </div>
        </div>
    )
}

export default SubDashboardLayout