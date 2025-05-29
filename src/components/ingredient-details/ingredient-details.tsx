import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector, useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const selectedIngredient = useSelector(
    (state) => state.ingredient.selectedIngredient
  );
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [ingredients, dispatch]);

  const ingredientData =
    selectedIngredient || ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
