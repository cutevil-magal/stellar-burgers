import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import {
  removeIngredient,
  updateIngredients
} from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const ingredients = useSelector(
      (state) => state.burgerConstructor.ingredients
    );

    const handleClose = () => {
      if (ingredient.type !== 'bun') {
        dispatch(removeIngredient(index)); // Удаляем только один экземпляр
      }
    };
    const handleMoveUp = () => {
      if (index > 0) {
        const updatedIngredients = [...ingredients];
        [updatedIngredients[index], updatedIngredients[index - 1]] = [
          updatedIngredients[index - 1],
          updatedIngredients[index]
        ];
        dispatch(updateIngredients(updatedIngredients)); // поднимает
      }
    };
    const handleMoveDown = () => {
      if (index < ingredients.length - 1) {
        const updatedIngredients = [...ingredients];
        [updatedIngredients[index], updatedIngredients[index + 1]] = [
          updatedIngredients[index + 1],
          updatedIngredients[index]
        ];
        dispatch(updateIngredients(updatedIngredients)); // опускаем
      }
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
