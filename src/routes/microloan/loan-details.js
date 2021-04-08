import { lazy } from 'react';

export default {
  exact: true,
  name: 'Loan-details',
  protected: true,
  path: '/loan-details',
  component: lazy(() => import('containers/Microloans/LoanDetails')),
};
