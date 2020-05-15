import React from "react";
import { useSelector } from "react-redux";

// outside the component function because it's a pure function
// that does not rely on anything inside the component function
// so there's no need (and would only be confusing) to put inside

const selectUser = (reduxState) => {
  return reduxState.user;
};

const selectPizzas = (reduxState) => {
  return reduxState.pizzas.sort((pizzaA, pizzaB) => {
    return pizzaB.bought - pizzaA.bought;
  });
};

export default function PizzaList() {
  const user = useSelector(selectUser);
  const pizza = useSelector(selectPizzas);

  return (
    <div>
      <h1>Pizza Explorer</h1>
      <p>
        Welcome back, <strong>{user.name}</strong>! Your favorite pizzas:
      </p>
      <dl>
        {pizza.map((pizza) => {
          return (
            <>
              <dt>{pizza.name}</dt>
              <dd>{pizza.description}</dd>
              <dd>number of times bought: {pizza.bought}</dd>
            </>
          );
        })}
      </dl>
    </div>
  );
}
