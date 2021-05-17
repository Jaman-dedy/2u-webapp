import { lazy } from 'react';
export default {
  exact: true,
  name: 'Send to bank account',
  protected: true,
  path: '/send-money-to-bank',
  component: lazy(() =>
    import('containers/WalletsAndBankAccounts/SendMoneyToBank'),
  ),
};
