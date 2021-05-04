import { lazy } from 'react';

export default {
  exact: true,
  name: 'Apply-loan',
  protected: true,
  path: '/apply-loan',
  component: lazy(() => import('containers/Microloans/ApplyLoan')),
};
