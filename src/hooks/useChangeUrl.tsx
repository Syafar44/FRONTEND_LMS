import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import { useRouter } from "next/router";
import useDebounce from "./useDebounce";
import { ChangeEvent } from "react";

const useChangeUrl = () => {
  const router = useRouter();
  const debounce = useDebounce();
  const DEFAULT_YEAR = new Date().getFullYear();

  const currentLimit = router.query.limit;
  const currentPage = router.query.page;
  const currentSearch = router.query.search;
  const currentFullName = router.query.fullName;
  const currentEmail = router.query.email;
  const currentDepartment = router.query.department;
  const currentMonth = router.query.month;
  const currentYear = router.query.year;

  const pathWithoutQuery = router.asPath.split("?")[0];

  const setUrl = () => {
    router.replace({
      pathname: pathWithoutQuery,
      query: {
        limit: currentLimit || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
        search: currentSearch || "",
      },
    });
  };

  const setUrlExplore = () => {
    router.replace({
      query: {
        limit: currentLimit || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
        fullName: currentFullName || "",
        department: currentDepartment || "",
        month: currentMonth || "",
        year: currentYear || DEFAULT_YEAR,
      },
    });
  };

  const setUrlAktivitas = () => {
    router.replace({
      query: {
        limit: currentLimit || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
        search: currentSearch || "",
        fullName: currentFullName || "",
      },
    });
  };

  const handleChangePage = (page: number) => {
    router.push({
      query: {
        ...router.query,
        page,
      },
    });
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLimit = e.target.value;
    router.push({
      query: {
        ...router.query,
        limit: selectedLimit,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleChangeFullName = (fullName: string) => {
    debounce(() => {
      router.push({
        query: {
          ...router.query,
          fullName,
          page: PAGE_DEFAULT,
        },
      });
    }, DELAY);
  };

  const handleChangeEmail = (email: string) => {
    debounce(() => {
      router.push({
        query: {
          ...router.query,
          email,
          page: PAGE_DEFAULT,
        },
      });
    }, DELAY);
  };

  const handleChangeDepartment = (department: string) => {
    debounce(() => {
      router.push({
        query: {
          ...router.query,
          department,
          page: PAGE_DEFAULT,
        },
      });
    }, DELAY);
  };

  const handleChangeKajian = (kajian: string) => {
    debounce(() => {
      router.push({
        query: {
          ...router.query,
          kajian,
          page: PAGE_DEFAULT,
        },
      });
    }, DELAY);
  };

  const handleChangeMonth = (month: string) => {
    router.push({
      query: {
        ...router.query,
        month,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleChangeYear = (year: string) => {
    router.push({
      query: {
        ...router.query,
        year,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      const search = e.target.value;
      router.push({
        query: {
          ...router.query,
          search,
          page: PAGE_DEFAULT,
        },
      });
    }, DELAY);
  };

  const handleClearSearch = () => {
    router.push({
      query: {
        ...router.query,
        search: "",
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleClearFullname = () => {
    router.push({
      query: {
        ...router.query,
        fullName: "",
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleClearEmail = () => {
    router.push({
      query: {
        ...router.query,
        email: "",
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleClearDepartment = () => {
    router.push({
      query: {
        ...router.query,
        department: "",
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleClearKajian = () => {
    router.push({
      query: {
        ...router.query,
        kajian: "",
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleClearMonth = () => {
    router.push({
      query: {
        ...router.query,
        month: "",
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleClearYear = () => {
    router.push({
      query: {
        ...router.query,
        year: "",
        page: PAGE_DEFAULT,
      },
    });
  };
  
  return {
    setUrl,
    setUrlExplore,
    setUrlAktivitas,
    currentLimit,
    currentPage,
    currentSearch,
    currentFullName,
    currentEmail,
    currentDepartment,
    currentMonth,
    currentYear,
    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleChangeFullName,
    handleChangeEmail,
    handleChangeDepartment,
    handleChangeKajian,
    handleChangeMonth,
    handleChangeYear,
    handleClearSearch,
    handleClearFullname,
    handleClearEmail,
    handleClearDepartment,
    handleClearKajian,
    handleClearMonth,
    handleClearYear,
  };
};

export default useChangeUrl;
