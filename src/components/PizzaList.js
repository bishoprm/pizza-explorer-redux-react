import React from "react";
import { useSelector, useDispatch } from "react-redux";

// selectors go outside the component function because it's a pure function
// that does not rely on anything inside the component function
// so there's no need (and would only be confusing) to put inside

const selectUser = (reduxState) => {
  return reduxState.user;
};

const selectPizzas = (reduxState) => {
  return [...reduxState.pizzas].sort((pizzaA, pizzaB) => {
    return pizzaB.bought - pizzaA.bought;
  });
};

function selectLikedPizzas(reduxState) {
  return reduxState.user.likes.map((pizzaID) => {
    return reduxState.pizzas.find((pizza) => pizza.id === pizzaID).name;
  });
}

export default function PizzaList() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser); // useSelector does the "subscription" for us
  const pizza = useSelector(selectPizzas);
  const likedPizzaNames = useSelector(selectLikedPizzas);

  function like(pizzaID) {
    console.log("liked!", pizzaID); // but which pizza? we need to know by ID
    const action = { type: "LIKE_PIZZA", payload: pizzaID };
    dispatch(action); // now it's time to handle reaction in reducer...
  }

  return (
    <div>
      <h1>Pizza Explorer</h1>
      <p>
        Welcome back, <strong>{user.name}</strong>! Your favorite pizzas:
      </p>
      <dl>
        {likedPizzaNames.map((name) => (
          <div key={name.id}>
            <dt>
              <strong>{name}</strong>
            </dt>
          </div>
        ))}
      </dl>
      <h3>All pizzas:</h3>
      <dl>
        {pizza.map((pizza) => {
          return (
            <div key={pizza.id}>
              <dt>
                {pizza.name}{" "}
                <button onClick={() => like(pizza.id)}>
                  {user.likes.includes(pizza.id) ? "♥" : "♡"}{" "}
                </button>
              </dt>
              <dd>{pizza.description}</dd>
              <dd>number of times bought: {pizza.bought}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
