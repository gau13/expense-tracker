import React, { useState } from "react";

function ContextMenu({
  menuPosition,
  setMenuPosition,
  expenses,
  setExpenses,
  rowId,
  setExpense,
  setEditingRowId,
}) {
  if (!menuPosition.left) return;

  return (
    <div className="context-menu" style={{ ...menuPosition }}>
      <div
        onClick={() => {
          console.log("editing", rowId);
          const findExpense = expenses.find((expense) => expense.id === rowId);
          setExpense(findExpense);
          console.log(findExpense);
          setEditingRowId(rowId);
          setMenuPosition({});
        }}
      >
        Edit
      </div>
      <div
        onClick={() => {
          setExpenses((prevState) =>
            prevState.filter((expense) => expense.id !== rowId)
          );
          setMenuPosition({});
        }}
      >
        Delete
      </div>
    </div>
  );
}

export default ContextMenu;
