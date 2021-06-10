import { lazy } from 'react';

export default {
  name: 'Marketplace',
  protected: true,
  exact: false,
  indexPage: true,
  path: '/marketplace',
  component: lazy(() => import('containers/PeerServices')),
};
