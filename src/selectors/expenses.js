import moment from 'moment';

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter(expense => {
    const createdAtMoment = moment(expense.createdAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date-hi') {
      return a.createdAt < b.createdAt ? -1 : 1;
    } else if (sortBy === 'date-lo') {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'increment') {
      return a.amount < b.amount ? -1 : 1;
    } else if (sortBy === 'decrement') {
      return a.amount < b.amount ? 1 : -1;
    } else return 0;
  });
};

export default getVisibleExpenses;