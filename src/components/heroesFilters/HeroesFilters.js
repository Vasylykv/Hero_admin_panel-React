import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../spinner/Spinner';

import { filtersActiveFilterChanged, fetchFilters } from './filtersSlice';

import classNames from 'classnames';

const HeroesFilters = () => {
  const { filters, filtersLoadingStatus, activeFilter } = useSelector(
    (state) => state.filters
  );
  const dispatch = useDispatch();
  console.log(filters);
  useEffect(() => {
    dispatch(fetchFilters());
    // eslint-disable-next-line
  }, []);
  // active

  const renderFilters = (arr) => {
    const btns = arr.map(({ name, className, label }, i) => {
      const btnClass = classNames('btn', className, {
        active: name === activeFilter,
      });

      return (
        <button
          key={name}
          className={btnClass}
          onClick={() => dispatch(filtersActiveFilterChanged(name))}
        >
          {label}
        </button>
      );
    });

    return <div className="btn-group">{btns}</div>;
  };

  if (filtersLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (filtersLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        {renderFilters(filters)}
      </div>
    </div>
  );
};

export default HeroesFilters;
