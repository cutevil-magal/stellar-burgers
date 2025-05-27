import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { getFeeds } from '../../services/slices/feedSlice';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams();

  const selectedOrder = useSelector((state) => state.feed.selectedOrder);
  const orders = useSelector((state) => state.feed.orders);
  const ingredients: TIngredient[] = useSelector(
    (state) => state.ingredients.ingredients
  );
  const isLoadingOrders = useSelector((state) => state.feed.isLoading);
  const isLoadingIngredients = useSelector(
    (state) => state.ingredients.isLoading
  );

  useEffect(() => {
    if (orders.length === 0) {
      dispatch(getFeeds());
    }
    if (ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [orders, ingredients, dispatch]);

  const orderData =
    selectedOrder || orders.find((order) => order.number.toString() === number);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) {
      return null;
    }

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) {
          acc[item] = {
            ...ingredient,
            count: (acc[item]?.count || 0) + 1
          };
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total,
      status: orderData.status
    };
  }, [orderData, ingredients]);

  if (isLoadingOrders || isLoadingIngredients || !orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
