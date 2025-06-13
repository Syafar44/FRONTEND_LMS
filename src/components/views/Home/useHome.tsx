import authServices from "@/services/auth.service";
import kajianServices from "@/services/kajian.service";
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

  return {
    dataUser,
    isPendingUser,

    dataKajian,
    isPendingKajian,
  };
};

export default useHome;
