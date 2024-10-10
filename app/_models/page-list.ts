type PageList<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

export default PageList;
