import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { selectAll } from '../heroesFilters/filtersSlice';
import store from '../../store';
import { useCreateHeroMutation } from '../../api/apiSlice';

const HeroesAddForm = () => {
  const [heroName, setHeroName] = useState('');
  const [heroDescr, setHeroDescr] = useState('');
  const [heroElement, setHeroElement] = useState('');

  const [createHero, { isLoading }] = useCreateHeroMutation();

  const filters = selectAll(store.getState());

  const handleHeroCreation = (e) => {
    e.preventDefault();

    const newHero = {
      id: uuidv4(),
      name: heroName,
      description: heroDescr,
      element: heroElement,
    };

    createHero(newHero).unwrap();

    setHeroName('');
    setHeroDescr('');
    setHeroElement('');
  };

  const renderFilters = (filters, status) => {
    if (status === 'loading') {
      return <option>Загрука элементов</option>;
    } else if (status === 'error') {
      return <option>Ошибка загрузки</option>;
    }

    if (filters && filters.length > 0) {
      return filters.map(({ name, label }) => {
        // eslint-disable-next-line
        if (name === 'all') return;

        return (
          <option key={name} value={name}>
            {label}
          </option>
        );
      });
    }
  };

  return (
    <form className="border p-4 shadow-lg rounded">
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
          onChange={(e) => setHeroName(e.target.value)}
          value={heroName}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: '130px' }}
          onChange={(e) => setHeroDescr(e.target.value)}
          value={heroDescr}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          value={heroElement}
          onChange={(e) => setHeroElement(e.target.value)}
          required
          className="form-select"
          id="element"
          name="element"
        >
          <option>Я владею элементом...</option>
          {renderFilters(filters, isLoading)}
        </select>
      </div>

      <button
        onClick={handleHeroCreation}
        type="submit"
        className="btn btn-primary"
      >
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
