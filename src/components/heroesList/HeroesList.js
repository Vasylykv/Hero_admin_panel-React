import { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';

import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';
import './heroesList.scss';

const HeroesList = () => {
  const { data: heroes = [], isLoading, isError } = useGetHeroesQuery();
  const [deleteHero] = useDeleteHeroMutation();

  const activeFilter = useSelector((state) => state.filters.activeFilter);

  const filteredHeroes = useMemo(() => {
    const filteredHeroes = heroes.slice();

    if (activeFilter === 'all') {
      return filteredHeroes;
    } else {
      return filteredHeroes.filter((item) => item.element === activeFilter);
    }
    // eslint-disable-next-line
  }, [heroes, activeFilter]);

  if (isLoading === 'loading') {
    return <Spinner />;
  } else if (isError === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const onDelete = (id) => {
    deleteHero(id);
  };

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return (
        <CSSTransition timeout={0} classNames="hero">
          <h5 className="text-center mt-5">Героев пока нет</h5>
        </CSSTransition>
      );
    }

    return arr.map(({ id, ...props }) => {
      return (
        <CSSTransition classNames={'hero'} timeout={500} key={id}>
          <HeroesListItem onDelete={() => onDelete(id)} {...props} />
        </CSSTransition>
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);
  return <TransitionGroup component={'ul'}>{elements}</TransitionGroup>;
};

export default HeroesList;
