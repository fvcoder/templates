export async function getDataWithPagination<T, A>({
  model,
  findMany = {} as A,
  page = 1,
  limitPerPage = 8,
}: {
  model: {
    findMany: (args?: A) => Promise<T[]>;
    count: (args?: { where?: A extends { where: infer W } ? W : never }) => Promise<number>;
  };
  findMany?: Omit<A, "skip" | "take">;
  page?: number;
  limitPerPage?: number;
}) {
  const skip = (page - 1) * limitPerPage;

  const [data, total] = await Promise.all([
    model.findMany({
      ...findMany,
      skip,
      take: limitPerPage,
    } as A),
    model.count({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      where: (findMany as any)?.where,
    }),
  ]);

  return {
    data,
    total,
    totalPages: Math.ceil(total / limitPerPage),
  };
}
