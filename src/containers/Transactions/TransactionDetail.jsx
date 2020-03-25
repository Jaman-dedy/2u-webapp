import React from 'react';
import TransactionDetailComponent from 'components/TransactionComponent/TransactionDetails';

const Transactions = ({
  location: {
    state: { item },
  },
}) => {
  return <TransactionDetailComponent item={item} />;
};

export default Transactions;
