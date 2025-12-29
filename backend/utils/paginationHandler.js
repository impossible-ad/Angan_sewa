export const paginationTool = (query) => {
  const page = Math.max(parseInt(query.page) || 1, 1);
  const limit = Math.max(parseInt(query.limit) || 5, 1);

  const offset = (page - 1) * limit;
  return { page, limit, offset };
};

export const paginatedData = (data, page, limit, total) => {
  const totalPages = Math.ceil(total / limit);
  return {
    data,
    meta: {
      totalItems: total,
      totalPages: totalPages,
      currentPage: page,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};
