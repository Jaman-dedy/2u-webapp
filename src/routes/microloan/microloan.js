import { lazy } from 'react';

export default {
  exact: true,
  name: 'Microloan',
  protected: true,
  path: '/microloan',
  component: lazy(() => import('containers/Microloans')),
};
