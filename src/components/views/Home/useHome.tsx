import authServices from "@/services/auth.service";
import competencyServices from "@/services/competency.service";
import kajianServices from "@/services/kajian.service";
import LkpServices from "@/services/lkp.service";
import resumeServices from "@/services/resume.service";
import saveServices from "@/services/save.service";
import subCompetencyServices from "@/services/subCompetency.service";
import { ICompetency } from "@/types/Competency";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useHome = () => {
  const router = useRouter()
  const getUser = async () => {
    const res = await authServices.getProfile()
    const { data } = res;
    return data;
  }

  const {
    data: dataUser,
    isPending: isPendingUser,
  } = useQuery({
    queryKey: ["User"],
    queryFn: () => getUser(),
    enabled: true,
  })

  const getKajian = async () => {
    const res = await kajianServices.getKajian()
    const { data } = res;
    const selectedData = data?.data[0]
    return selectedData;
  }

  const {
    data: dataKajian,
    isPending: isPendingKajian,
  } = useQuery({
    queryKey: ["Kajian"],
    queryFn: () => getKajian(),
    enabled: true,
  })

  const getResume = async() => {
    const res = await resumeServices.getResumeByKajian(`${dataKajian?._id}`)
    const { data } = res 
    return data.data
  }

  const {
    data: dataResume,
    isPending: isPendingResume,
  } = useQuery({
    queryKey: ["Resume"],
    queryFn: () => getResume(),
    enabled: !!dataKajian?._id,
  })

  const getSave = async() => {
    const res = await saveServices.getSaveByUser()
    const { data } = res
    return data.data
  }

  const {
    data: dataSave,
    isPending: isPendingSave,
  } = useQuery({
    queryKey: ["Save"],
    queryFn: () => getSave(),
    enabled: !!router.isReady
  })

  const getCompetency = async() => {
    const res = await competencyServices.getCompetencyById(`${dataSave?.competency}`)
    const { data } = res
    return data.data
  }

  const {
    data: dataCompetency,
    isPending: isPendingCompetency,
  } = useQuery({
    queryKey: ["Competency", dataSave?.competency],
    queryFn: () => getCompetency(),
    enabled: !!dataSave?.competency
  })
  
  const getSubCompetency = async() => {
    const res = await subCompetencyServices.getSubCompetencyByCompetency(`${dataSave?.competency}`)
    const { data } = res
    return data.data
  }

  const {
    data: dataSubCompetency,
    isPending: isPendingSubCompetency,
  } = useQuery({
    queryKey: ["SubCompetency", dataSave?.competency],
    queryFn: () => getSubCompetency(),
    enabled: !!dataSave?.competency
  })

  const getAllCompetency = async() => {
    const res = await competencyServices.getAllCompetency()
    const { data } = res
    return data
  } 

  const {
    data: dataAllCompetency,
    isPending: isPendingAllCompetency,
  } = useQuery({
    queryKey: ["AllCompetency"],
    queryFn: () => getAllCompetency(),
    enabled: !!router.isReady || !!dataUser
  })

  const access = dataUser?.data?.access;

  const required = Array.isArray(dataAllCompetency?.data)
    ? dataAllCompetency.data.filter(
        (item: ICompetency) => item.access?.includes(access)
      )
    : [];

  const getLkp = async() => {
        const res = await LkpServices.getLkpByUser()
        const { data } = res
        return data.data
    }
    
    const {
        data: dataLkp,
    } = useQuery({
        queryKey: ["lkp"],
        queryFn: getLkp,
        enabled: !!router.isReady,
    })

  return {
    dataUser,
    isPendingUser,

    dataKajian,
    isPendingKajian,

    dataResume,
    isPendingResume,

    dataSave,
    isPendingSave,

    dataCompetency,
    isPendingCompetency,

    dataSubCompetency,
    isPendingSubCompetency,
    isPendingAllCompetency,

    required,

    dataLkp,
  };
};

export default useHome;
