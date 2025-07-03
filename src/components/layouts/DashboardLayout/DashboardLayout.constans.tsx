import { BsTools } from "react-icons/bs";
import {
  CiWallet,
} from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi";
import { IoBookOutline, IoSettingsOutline } from "react-icons/io5";
import { LuBrain, LuClipboardCheck } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";

const SIDEBAR_ADMIN = [
  {
    key: "kajian online",
    label: "Kajian Online",
    href: "/admin/kajian-online",
    icon: <IoBookOutline />,
  },
  {
    key: "aktivitas",
    label: "Aktivitas",
    href: "/admin/aktivitas",
    icon: <SlCalender />,
  },
  {
    key: "administrasi",
    label: "Administrasi",
    href: "/admin/administrasi",
    icon: <FaRegCircleUser />,
  },
];

const SIDEBAR_MEMBER = [
  {
    key: "kajian online",
    label: "Kajian Online",
    href: "/kajian-online",
    icon: <IoBookOutline />,
  },
  {
    key: "lkp",
    label: "Lembar Kepatuhan Pribadi",
    href: "/lkp",
    icon: <LuClipboardCheck />,
  },
  {
    key: "pengaturan",
    label: "Pengaturan",
    href: "/setting",
    icon: <IoSettingsOutline />,
  },
];

const SUB_SIDBAR_MEMBER = [
  {
    key: "core kompetensi",
    label: "Core Competency",
    href: "/kelas-kompetensi/core",
    icon: <LuBrain size={20} />,
  },
  {
    key: "functional kompetensi",
    label: "Functional Competency",
    href: "/kelas-kompetensi/functional",
    icon: <BsTools size={20}/>,
  },
  {
    key: "managerial kompetensi",
    label: "Managerial Competency",
    href: "/kelas-kompetensi/managerial",
    icon: <HiUserGroup size={20}/>,
  },
]

const SUB_SIDBAR_ADMIN = [
  {
    key: "core kompetensi",
    label: "Core Competency",
    href: "/admin/kelas-kompetensi/core",
    icon: <LuBrain size={20} />,
  },
  {
    key: "functional kompetensi",
    label: "Functional Competency",
    href: "/admin/kelas-kompetensi/functional",
    icon: <BsTools size={20}/>,
  },
  {
    key: "managerial kompetensi",
    label: "Managerial Competency",
    href: "/admin/kelas-kompetensi/managerial",
    icon: <HiUserGroup size={20}/>,
  },
]

export { SIDEBAR_ADMIN, SIDEBAR_MEMBER, SUB_SIDBAR_ADMIN, SUB_SIDBAR_MEMBER };
