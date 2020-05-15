import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function AddPizzaForm() {
  const [name, set_name] = useState("");
  const [description, set_description] = useState("");

  const dispatch = useDispatch(); // placed inside the component, but if it's in the submit
  // function it will break

  const handleSubmit = (event) => {
    // to make sure that the form does not redirect (which is normal browser behavior)
    event.preventDefault();

    // 1. create the action
    const action = {
      type: "ADD_PIZZA",
      payload: {
        id: Math.random(),
        name,
        description,
      },
    };

    // 2. dispatch the action! (->3 then handle the reaction in the reducer on reducer.js)
    dispatch(action);

    set_name(""); // clear the input
    set_description("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a new pizza</h2>
      <p>
        <label>
          Name:{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => set_name(e.target.value)}
          />
        </label>
      </p>
      <p>
        <label>
          Description:{" "}
          <input
            type="text"
            value={description}
            onChange={(e) => set_description(e.target.value)}
          />
        </label>
      </p>
      <p>
        <button type="submit">Add this pizza!</button>
      </p>
    </form>
  );
}
