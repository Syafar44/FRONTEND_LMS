// import {
//   LIMIT_BANNER,
//   LIMIT_CATEGORY,
//   LIMIT_EVENT,
//   PAGE_DEFAULT,
// } from "@/constants/list.constants";
// import categoryServices from "@/services/category.service";
// import { useQuery } from "@tanstack/react-query";

// const useHome = () => {
//   const getCategories = async () => {
//     let params = `limit=${LIMIT_CATEGORY}&page=${PAGE_DEFAULT}`;
//     const res = await categoryServices.getCategories(params);
//     const { data } = res;
//     return data;
//   };

//   const { data: dataCategories, isLoading: isLoadingCategories } = useQuery({
//     queryKey: ["Categories"],
//     queryFn: getCategories,
//   });

//   const getEvents = async (params: string) => {
//     const res = await eventServices.getEvents(params);
//     const { data } = res;
//     return data;
//   };

//   const currentEventQuery = `limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}&isPublish=true`;

//   const { data: dataFeaturedEvents, isLoading: isLoadingFeaturedEvents } =
//     useQuery({
//       queryKey: ["FeaturedEvents"],
//       queryFn: () => getEvents(`${currentEventQuery}&isFeatured=true`),
//     });

//   const { data: dataLatestEvents, isLoading: isLoadingLatestEvents } = useQuery(
//     {
//       queryKey: ["LatestEvents"],
//       queryFn: () => getEvents(currentEventQuery),
//     },
//   );

//   return {
//     dataBanners,
//     isLoadingBanners,
//     dataFeaturedEvents,
//     isLoadingFeaturedEvents,
//     dataLatestEvents,
//     isLoadingLatestEvents,
//     dataCategories,
//     isLoadingCategories,
//   };
// };

// export default useHome;
