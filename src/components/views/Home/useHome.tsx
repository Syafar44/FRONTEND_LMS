import authServices from "@/services/auth.service";
import kajianServices from "@/services/kajian.service";
import resumeServices from "@/services/resume.service";
import { useQuery } from "@tanstack/react-query";

const useHome = () => {

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

  return {
    dataUser,
    isPendingUser,

    dataKajian,
    isPendingKajian,

    dataResume,
    isPendingResume,
  };
};

export default useHome;
