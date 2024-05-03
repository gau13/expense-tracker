import React, { useEffect, useRef, useState } from "react";
import Select from "./Select";

export default function Form({
  setExpenses,
  expense,
  setExpense,
  editingRowId,
  setEditingRowId,
}) {
  const [errors, setErrors] = useState({});

  const validate = (formData) => {
    const errorsData = {};
    console.log(errorsData);

    if (!formData.title) {
      errorsData.title = "Title is required";
    }

    if (!formData.category) {
      errorsData.category = "Please Select a Category";
    }

    if (!formData.amount) {
      errorsData.amount = "Amount is required";
    }

    setErrors(errorsData);
    return errorsData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateResult = validate(expense);
    console.log(Object.keys(validateResult).length);
    if (Object.keys(validateResult).length) return;

    if (editingRowId) {
      setExpenses((prevState) =>
        prevState.map((singleExpense) => {
          if (singleExpense.id === editingRowId) {
            return { ...expense, id: editingRowId };
          }
          return singleExpense;
        })
      );
      setEditingRowId("");
      setExpense({
        title: "",
        category: "",
        amount: "",
      });
      return;
    }

    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);
    setExpense({
      title: "",
      category: "",
      amount: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors({});
  };

  const arr = ["Grocery", "Clothes", "Bills", "Education", "Medicine"];

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={expense.title}
          onChange={handleChange}
        />
        <p className="error">{errors.title}</p>
      </div>
      {/* <div className="input-container">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="" hidden>
            Select Category
          </option>
          <option value="Grocery">Grocery</option>
          <option value="Clothes">Clothes</option>
          <option value="Bills">Bills</option>
          <option value="Education">Education</option>
          <option value="Medicine">Medicine</option>
        </select>
        <p className="error">{errors.category}</p>
      </div> */}
      <Select
        id="category"
        name="category"
        value={expense.category}
        onChange={handleChange}
        arr={arr}
        defaultVal={"Select Category"}
        error={errors.category}
      />
      <div className="input-container">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
        <p className="error">{errors.amount}</p>
      </div>
      <button className="add-btn">{editingRowId ? "Save" : "Add"}</button>
    </form>
  );
}
