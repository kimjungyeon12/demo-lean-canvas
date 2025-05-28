import { useState } from 'react';
import { createCanvas, deleteCanvas, getCanvases } from '../api/canvas';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Button from '../components/Button';
// import useApiRequest from '../hooks/useApiRequest';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { useMatch } from 'react-router-dom';
import CategoryFilter from '../components/CategoryFilter';

function Home() {

  const [filter, setFilter] = useState({
    searchText: undefined,
    category: undefined
  })
  const handleFilter = (key, value) => setFilter({
    ...filter,
    [key]: value
  })
  const [isGridView, setIsGridView] = useState(true);

  const queryClient = useQueryClient();

  // 데이터 조회
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['canvases', filter.searchText, filter.category],
    queryFn: () => {
      console.log('fetch data');
      return getCanvases({
        title_like: filter.searchText,
        category: filter.category
      })
    },
    // initialData: [],
    // setTime: 1000 * 60 * 5
    refetchOnWindowFocus: false
  })

  // 등록
  const { mutate: createNewCanvas, isLoading: isLoadingCreate } = useMutation({
    mutationFn: createCanvas,
    onSuccess: () => queryClient.invalidateQueries(['canvases']),
    onError: err => alert(err.message),
  });


  // 삭제
  const { mutate: deleteCanvasMutation } = useMutation({
    mutationFn: deleteCanvas,
    onSuccess: () => queryClient.invalidateQueries(['canvases']),
    onError: err => alert(err.message),
  });

  const handleDeleteItem = async id => {
    deleteCanvasMutation(id);
  };

  const handleCreateCanvas = async () => {
    createNewCanvas();

  };

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <div className='flex gap-2 flex-col w-full sm:flex-row  mb-4 sm:mb-0'>
          <SearchBar searchText={filter.searchText} onSearch={val => handleFilter('searchText', val)} />
          <CategoryFilter category={filter.category} onChange={val => handleFilter('category', val)} />
        </div>
        <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
      </div>
      <div className="flex justify-end mb-6">
        <Button onClick={handleCreateCanvas} loading={isLoadingCreate}>
          등록하기
        </Button>
      </div>
      {isLoading && <Loading />}
      {error && (
        <Error
          message={error.message}
          onRetry={refetch}
        />
      )}
      {!isLoading && !error && (
        <CanvasList
          filteredData={data}
          isGridView={isGridView}
          searchText={filter.searchText}
          onDeleteItem={handleDeleteItem}
        />
      )}
    </>
  );
}

export default Home;
