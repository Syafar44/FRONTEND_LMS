import {
  CiBookmark,
  CiViewList,
  CiWallet,
} from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";

const SIDEBAR_ADMIN = [
  {
    key: "kajian online",
    label: "Kajian Online",
    href: "/admin/kajian-online",
    icon: <CiBookmark />,
  },
  {
    key: "aktivitas",
    label: "Aktivitas",
    href: "/admin/aktivitas",
    icon: <CiWallet />,
  },
  {
    key: "administrasi",
    label: "Administrasi",
    href: "/admin/administrasi",
    icon: <CiWallet />,
  },
];

const SIDEBAR_MEMBER = [
  {
    key: "kajian online",
    label: "Kajian Online",
    href: "/kajian-online",
    icon: <CiBookmark />,
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
    icon: <CiViewList size={20} />,
  },
  {
    key: "functional kompetensi",
    label: "Functional Competency",
    href: "/kelas-kompetensi/functional",
    icon: <CiViewList size={20}/>,
  },
  {
    key: "managerial kompetensi",
    label: "Managerial Competency",
    href: "/kelas-kompetensi/managerial",
    icon: <CiViewList size={20}/>,
  },
]

const SUB_SIDBAR_ADMIN = [
  {
    key: "core kompetensi",
    label: "Core Competency",
    href: "/admin/kelas-kompetensi/core",
    icon: <CiViewList size={20} />,
  },
  {
    key: "functional kompetensi",
    label: "Functional Competency",
    href: "/admin/kelas-kompetensi/functional",
    icon: <CiViewList size={20}/>,
  },
  {
    key: "managerial kompetensi",
    label: "Managerial Competency",
    href: "/admin/kelas-kompetensi/managerial",
    icon: <CiViewList size={20}/>,
  },
]

export { SIDEBAR_ADMIN, SIDEBAR_MEMBER, SUB_SIDBAR_ADMIN, SUB_SIDBAR_MEMBER };
