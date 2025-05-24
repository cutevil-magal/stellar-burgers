// import { useSelector } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';

import { useDispatch, useSelector } from '../../services/store'; // Используем наши типизированные хуки
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { useEffect } from 'react';
import { selectIngredient } from '../../services/slices/ingredientSlice';

export const ConstructorPage: FC = () => {
  /** TODO: взять переменную из стора */
  // const isIngredientsLoading = false;

  const dispatch = useDispatch();
  const isIngredientsLoading = useSelector(
    (state) => state.ingredients.isLoading
  );

  useEffect(() => {
    dispatch(fetchIngredients()); // Теперь ошибки не будет
  }, [dispatch]);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
