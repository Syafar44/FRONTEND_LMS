import { PiBookOpenLight, PiCertificateLight, PiUserCircleLight, PiClipboardTextLight, PiBrainLight, PiToolboxLight, PiGearLight, PiUsersThreeLight, PiStackLight, PiBellRingingLight, PiBookBookmark, PiGear, PiClipboardText } from "react-icons/pi";

const SIDEBAR_ADMIN = [
  {
    key: "kajian online",
    label: "Kajian Online",
    href: "/admin/kajian-online",
    icon: <PiBookOpenLight />,
  },
  {
    key: "aktivitas",
    label: "Aktivitas",
    href: "/admin/aktivitas",
    icon: <PiStackLight />,
  },
  {
    key: "lkp",
    label: "Lembar Kepatuhan Pribadi",
    href: "/admin/lkp",
    icon: <PiClipboardTextLight />,
  },
  {
    key: "notifikasi",
    label: "Notifikasi",
    href: "/admin/notification",
    icon: <PiBellRingingLight />,
  },
  {
    key: "administrasi",
    label: "Administrasi",
    href: "/admin/administrasi",
    icon: <PiUserCircleLight />,
  },
];

const SIDEBAR_MEMBER = [
  {
    key: "kajian online",
    label: "Kajian Online",
    href: "/kajian-online",
    icon: <PiBookOpenLight />,
  },
  {
    key: "lkp",
    label: "Lembar Kepatuhan Pribadi",
    href: "/lkp",
    icon: <PiClipboardTextLight />,
  },
  {
    key: "pengaturan",
    label: "Pengaturan",
    href: "/setting",
    icon: <PiGearLight />,
  },
  {
    key: "certificate",
    label: "Sertifikat",
    href: "/certificate",
    icon: <PiCertificateLight />,
  },
];

const SUB_SIDBAR_MEMBER = [
  {
    key: "core kompetensi",
    label: "Core Competency",
    href: "/kelas-kompetensi/core",
    icon: <PiBrainLight size={20} />,
  },
  {
    key: "functional kompetensi",
    label: "Functional Competency",
    href: "/kelas-kompetensi/functional",
    icon: <PiToolboxLight size={20}/>,
  },
  {
    key: "managerial kompetensi",
    label: "Managerial Competency",
    href: "/kelas-kompetensi/managerial",
    icon: <PiUsersThreeLight size={20}/>,
  },
]

const SUB_SIDBAR_ADMIN = [
  {
    key: "core kompetensi",
    label: "Core Competency",
    href: "/admin/kelas-kompetensi/core",
    icon: <PiBrainLight size={20} />,
  },
  {
    key: "functional kompetensi",
    label: "Functional Competency",
    href: "/admin/kelas-kompetensi/functional",
    icon: <PiToolboxLight size={20}/>,
  },
  {
    key: "managerial kompetensi",
    label: "Managerial Competency",
    href: "/admin/kelas-kompetensi/managerial",
    icon: <PiUsersThreeLight size={20}/>,
  },
]

const SUB_SIDBAR2_MEMBER = [
  {
    key: "sop",
    label: "SOP",
    href: "/sop",
    icon: <PiBookBookmark size={20} />,
  },
  {
    key: "ik",
    label: "IK",
    href: "/ik",
    icon: <PiGear size={20} />,
  },
  {
    key: "sopIk",
    label: "POST TEST MINGGUAN",
    href: "/post-test",
    icon: <PiClipboardText size={20} />,
  },
]

const SUB_SIDBAR2_ADMIN = [
  {
    key: "sop",
    label: "SOP",
    href: "/admin/sop",
    icon: <PiBookBookmark size={20} />,
  },
  {
    key: "ik",
    label: "IK",
    href: "/admin/ik",
    icon: <PiGear size={20} />,
  },
  {
    key: "sopIk",
    label: "POST TEST MINGGUAN",
    href: "/admin/post-test",
    icon: <PiClipboardText size={20} />,
  },
]

export { SIDEBAR_ADMIN, SIDEBAR_MEMBER, SUB_SIDBAR_ADMIN, SUB_SIDBAR_MEMBER, SUB_SIDBAR2_ADMIN, SUB_SIDBAR2_MEMBER };
