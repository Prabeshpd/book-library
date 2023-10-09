// Done to mimic pagination data from server
export const formatDataForReducer = (data: any[]) => {
  return {
    data,
    metadata: {
      limit: 10,
      totalCounts: 15,
      currentPage: 1,
    },
  };
};
