const expensesReducer = (state, action) => {
  if (typeof state === 'undefined') { 
    return [] 
  }
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.edits
          };
        } else { return expense };
      });
    default:
      return state;
  }
}

export default expensesReducer;