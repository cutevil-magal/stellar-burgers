import { FC, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import { selectIngredient } from '../../services/slices/ingredientSlice';
import {
  addIngredient,
  setBun
} from '../../services/slices/burgerConstructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const ingredientCount = useSelector(
      (state) => state.burgerConstructor.ingredientCount[ingredient._id]
    );

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        dispatch(setBun(ingredient)); // Если булка — заменяем её
      } else {
        dispatch(addIngredient(ingredient)); // добавляем в центральную часть
      }
    };

    const handleIngredientClick = () => {
      dispatch(selectIngredient(ingredient)); // открытие модального окна
      navigate(`/ingredients/${ingredient._id}`, {
        state: { background: location }
      });
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={ingredientCount}
        locationState={{ background: location }}
        handleAdd={handleAdd}
        handleIngredientClick={handleIngredientClick}
      />
    );
  }
);
