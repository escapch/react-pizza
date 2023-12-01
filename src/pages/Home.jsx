import Card from '../components/PizzaBlock';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setSortType } from '../redux/slices/filterSlice';

import { useState, useEffect, useContext } from 'react';
import Pagination from '../components/Pagination';
import { MyContext } from '../App';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  
  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const sortType = useSelector((state) => state.filterSlice.sortType);
  const dispatch = useDispatch();

  const onCategoryClick = (id) => {
    dispatch(setCategoryId(id));
  };
  const onSortClick = (i) => {
    dispatch(setSortType(i));
  };

  const { searchValue } = useContext(MyContext);
  useEffect(() => {
    setIsLoad(true);
    const categoryFiltr = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&title=*${searchValue}` : '';
    const sortFilter = sortType.sortProperty;

    fetch(
      `https://6267e76691c67b2f.mokky.dev/items?page=${currentPage}&limit=4&${categoryFiltr}&sortBy=${sortFilter}&orderBy=desc${search}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr.items);
        setTotalPage(arr.meta.total_pages);
        setIsLoad(false);
      });
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onCategoryClick={onCategoryClick} />
        <Sort sortValue={sortType} onSortClick={onSortClick} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoad
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : pizzas.map((obj) => <Card {...obj} key={obj.id} />)}
      </div>
      <Pagination onChangeCurrentPage={setCurrentPage} totalPages={totalPage} />
    </div>
  );
};

export default Home;
