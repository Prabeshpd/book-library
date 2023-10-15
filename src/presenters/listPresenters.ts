// Done to mimic pagination data from server
export const formatDataForReducer = (data: any[]) => {
  return {
    data,
    meta: {
      limit: 10,
      totalCounts: 15,
      currentPage: 1,
    },
  };
};
