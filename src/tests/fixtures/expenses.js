import moment from 'moment';

const expenses = [
  {
    id: 1,
    description: 'Pickles',
    note: 'pickles',
    amount: 123,
    createdAt: moment(0).add(4, 'days').valueOf()
  },
  {
    id: 2,
    description: 'Lettuce',
    note: 'lettuce',
    amount: 234,
    createdAt: moment(0).subtract(4, 'days').valueOf()
  },
  {
    id: 3,
    description: 'Tomato',
    note: 'tomato',
    amount: 456,
    createdAt: 0
  }
]

export default expenses;