import { useCallback, useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);
  const fetchMeals = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://react-http-practice-b4a1b-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong :(");
      }
      const data = await response.json();
      const meals = [];
      for (const key in data) {
        meals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        });
      }

      setAvailableMeals(meals);
      // setHttpError(null);
    } catch (error) {
      setIsLoading(false);
      setHttpError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);
  const mealsList = availableMeals.map((meal) => (
    <MealItem key={meal.id} item={meal} />
  ));

  return (
    <section className={classes.meals}>
      {httpError && !isLoading && (
        <p className={classes.mealsLoading}>{httpError}</p>
      )}
      {isLoading && <p className={classes.mealsLoading}>Loading Menu ...</p>}
      {!isLoading && !httpError && (
        <Card>
          <ul>{mealsList}</ul>
        </Card>
      )}
    </section>
  );
};
export default AvailableMeals;
