const selectExpensesTotal = (expenses) => (
    expenses
            .map((expense) => expense.amount)
            .reduce((acc, cur) => acc + cur, 0)
);

export default selectExpensesTotal;