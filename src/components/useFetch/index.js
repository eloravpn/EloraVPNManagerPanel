import { useState, useEffect, useCallback } from 'react';
import HttpService from '../httpService';
import Http from '../httpService/Http';

function useFetch(url, search, pageNum, paginateServ, name, filters) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const refresh = () => {
    setData([]);
    get();
  };

  const get = useCallback(() => {
    setIsLoading(true);
    +pageNum === 1 && setData([]);
    HttpService()
      .get(url, {
        params: {
          offset: pageNum === 0 ? 0 : pageNum,
          limit: 30,
          sort: `${search.ASC ? '' : '-'}${search?.sort}`,
          ...search,
          ...filters
        }
      })
      .then((res) => {
        if (!paginateServ) {
          if (name) setData(res.data[name]);
          else setData(res.data.data || res.data);
        } else {
          if (pageNum === 0) setData(res.data[name]);
          else
            setData((prev) => {
              return [...new Set([...prev, ...res.data[name]])];
            });

          setTotal(res?.data?.total);
        }
      })
      .catch((err) => {
        setData([]);
        Http.error(err);
      })
      .finally(() => setIsLoading(false));
  }, [filters, name, pageNum, paginateServ, search, url]);

  useEffect(() => {
    get();
  }, [get]);

  const editRow = (row) => {
    const newData = data.map((item) => (+item.id === +row.id ? row : item));
    setData(newData);
  };
  const deleteRow = (row) => {
    const newData = data.filter((i) => +i?.id !== +row?.id);
    setData(newData);
  };
  const createRow = (row) => {
    const newData = [row, ...data];
    setData(newData);
  };

  return {
    isLoading,
    data,
    deleteRow,
    editRow,
    createRow,
    total,
    refresh,
    setData
  };
}

export default useFetch;
