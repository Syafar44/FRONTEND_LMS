import InstallButton from "@/components/commons/InstallPwaButton";
import { cn } from "@/utils/cn";
import { Accordion, AccordionItem, Button, Listbox, ListboxItem } from "@heroui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { JSX } from "react";
import { CiLogout, CiViewList } from "react-icons/ci";
import { IoGridOutline } from "react-icons/io5";

interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
}

interface PropTypes {
  type: string
  sidebarItems: SidebarItem[];
  subSidebarItems?: SidebarItem[];
  isOpen: boolean;
}

const DashboardLayoutSidebar = (props: PropTypes) => {
  const { sidebarItems, subSidebarItems, isOpen, type } = props;
  const router = useRouter();
  return (
    <div
      className={cn(
        "fixed z-50 flex h-full w-full max-w-[300px] -translate-x-full flex-col justify-between border-r-1 border-default-200 bg-white px-4 py-6 transition-all lg:relative lg:translate-x-0",
        { "translate-x-0": isOpen },
      )}
    >
      <div>
        <div className="flex justify-center">
          <Image
            src="https://res.cloudinary.com/doyafjjum/image/upload/v1752466101/maskable-icon_ljfnvc.png"
            alt="logo"
            width={180}
            height={60}
            className="mb-6 w-32 rounded-md"
            onClick={() => router.push("/")}
          />
        </div>
        <Listbox variant="solid" aria-label="Dashboard Menu" className="-mb-2">
          <ListboxItem
            key={"dashboard"}
            className={cn("my-1 h-12 text-2xl", {
              "bg-primary ": router.pathname.startsWith(type === "admin" ? "/admin/dashboard" : "/home"),
            })}
            startContent={<IoGridOutline />}
            textValue={"Dashboard"}
            aria-labelledby={"Dashboard"}
            aria-describedby={"Dashboard"}
            as={Link}
            href={type === "admin" ? "/admin/dashboard" : "/"}
          >
            <p className="text-small">{"Dashboard"}</p>
          </ListboxItem>
        </Listbox>
        <Accordion key="kelas-kompetensi">
          <AccordionItem 
            className="mt-2 px-2 rounded-lg w-full -translate-x-1"
            key="kelas-kompetensi"
            aria-label="Kelas Kompetensi"
            title={
              <p className="flex items-center text-sm">
                Kelas Kompetensi
              </p>
            }
            startContent={<CiViewList size={25} />}
          >
            {subSidebarItems?.map((item) => {
              return (
                <Button
                  key={item.key}
                  fullWidth
                  variant="light"
                  onPress={() => window.location.href = item.href}
                  className={cn("w-full rounded-md flex justify-start mb-2", {
                    "bg-primary ": router.pathname.startsWith(`${item.href}`),
                  })}
                  startContent={item.icon}
                >
                  {item.label}
                </Button>
              )
            })}
          </AccordionItem>
        </Accordion>
        <Listbox variant="solid" aria-label="Dashboard Menu">
          {sidebarItems.map((item) => {
            return (
              <ListboxItem
                key={item.key}
                className={cn("my-1 h-12 text-2xl", {
                  "bg-primary ": router.pathname.startsWith(item.href),
                })}
                startContent={item.icon}
                textValue={item.label}
                aria-labelledby={item.label}
                aria-describedby={item.label}
                as={Link}
                href={item.href}
              >
                <p className="text-small">{item.label}</p>
              </ListboxItem>
            );
          })}
        </Listbox>
        <div className="flex items-center p-1">
          <InstallButton />
        </div>
        <div className="flex items-center p-1">
          <Button
            color="primary"
            fullWidth
            variant="light"
            className="flex justify-start rounded-lg px-2 py-1.5 text-danger"
            size="lg"
            onPress={() => signOut()}
          >
            <CiLogout />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayoutSidebar;
