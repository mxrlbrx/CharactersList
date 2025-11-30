import axios from 'axios';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export function DataProvider({ children }) {
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilters, setCurrentFilters] = useState({});

  const fetchCharacters = useCallback(async (page = 1, filters = {}) => {
    console.log('Fetching page:', page, 'with filters:', filters);

    setIsFetching(true);
    setIsError(false);

    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', page.toString());

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });

      const url = `${API_URL}?${queryParams.toString()}`;
      console.log('Fetching URL:', url);

      const { data } = await axios.get(url);

      setCharacters(data.results || []);
      setInfo(data.info || {});
      setCurrentPage(page);
      setCurrentFilters(filters);

      console.log('Successfully fetched:', data.results?.length, 'characters');
      console.log('Total pages:', data.info?.pages);
    } catch (e) {
      console.error('Fetch error:', e);
      setIsError(true);
      setCharacters([]);
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchCharacters(1);
  }, [fetchCharacters]);

  const changePage = useCallback(
    (newPage) => {
      console.log('Changing page to:', newPage);
      fetchCharacters(newPage, currentFilters);
    },
    [fetchCharacters, currentFilters]
  );

  const applyFilters = useCallback(
    (filters) => {
      console.log('Applying filters:', filters);
      fetchCharacters(1, filters); // всегда начинаем с первой страницы при фильтрации
    },
    [fetchCharacters]
  );

  const dataValue = useMemo(
    () => ({
      characters,
      isFetching,
      isError,
      info,
      currentPage,
      totalPages: info.pages || 1,
      currentFilters,
      fetchCharacters,
      changePage,
      applyFilters
    }),
    [
      characters,
      isFetching,
      isError,
      info,
      currentPage,
      currentFilters,
      fetchCharacters,
      changePage,
      applyFilters
    ]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
