/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Tab,
  Container,
  Grid,
  Menu,
  Label,
  Divider,
} from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useWindowSize from 'utils/useWindowSize';
import DashboardLayout from 'components/common/DashboardLayout';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import './style.scss';
import AddStoreContainer from 'containers/Stores/AddStore';
import StoreInfoTab from './StoreInfoTab';
import StorePendingVoucherTab from './StorePendingVoucherTab';
import NotificationSettingsTab from './NotificationSettingsTab';
import StoreAvailabilitySettings from './StoreAvailabilitySettings';
import StoreWalletSettingsTab from './StoreWalletSettingsTab';

const SettingView = props => {
  const { width } = useWindowSize();

  const settingsPanes = [
    {
      menuItem:
        width > 700
          ? `${global.translate('Edit')} ${global
              .translate('Your store')
              .toLowerCase()}`
          : global.translate('Edit'),
      render: ({ currentStore }) => (
        <Tab.Pane>
          <Grid>
            <Grid.Column>
              {' '}
              <AddStoreContainer currentStore={currentStore} />
            </Grid.Column>
          </Grid>
        </Tab.Pane>
      ),
    },
    {
      menuItem: global.translate('Notifications'),
      render: props => {
        return <NotificationSettingsTab {...props} />;
      },
    },

    {
      menuItem: global.translate('Wallets', 61),
      render: props => {
        return <StoreWalletSettingsTab {...props} />;
      },
    },
    {
      menuItem: global.translate('General', 293),
      render: props => {
        return <StoreAvailabilitySettings {...props} />;
      },
    },
  ];
  return (
    <Tab
      className="settings-tabs"
      menu={{ fluid: true, vertical: width > 800, tabular: true }}
      panes={settingsPanes}
      {...props}
    />
  );
};

const StoreDetailsComponent = ({
  pendingVouchers,
  onCancelTransactionConfirm,
  store,
  onRejectVoucher,
  form,
  setForm,
  onEditChange,
  getPendingStoreVouchers,
  currentStore,
  deleteStore,
  deleteStoreData,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [cancelOpen, setCancelOpen] = useState(false);
  const { setStoreStatus } = useSelector(state => state.user);

  const panes = [
    {
      menuItem: global.translate('Details', 94),
      render: ({ currentStore, onChangeTab }) => (
        <StoreInfoTab
          currentStore={currentStore}
          onChangeTab={onChangeTab}
        />
      ),
    },
    {
      menuItem: (
        <Menu.Item key="'Pending Vouchers'">
          {global.translate('Pending vouchers', 858)}
          <Label as={Link} color="orange">
            {currentStore.PendingVouchers}
          </Label>
        </Menu.Item>
      ),
      render: props => {
        return <StorePendingVoucherTab {...props} />;
      },
    },
    {
      menuItem: global.translate('Settings'),
      render: ({
        form,
        onEditChange,
        setStoreStatus,
        deleteStore,
        currentStore,
        deleteStoreData,
      }) => (
        <Tab.Pane attached={false}>
          <SettingView
            form={form}
            onEditChange={onEditChange}
            setStoreStatus={setStoreStatus}
            currentStore={currentStore}
            deleteStore={deleteStore}
            deleteStoreData={deleteStoreData}
          />
        </Tab.Pane>
      ),
    },
  ];

  const tabRef = useRef(null);
  const location = useLocation();

  const onTabChange = (activeIndex = 2) => {
    tabRef.current.trySetState({ activeIndex });
  };

  useEffect(() => {
    if (location.state && location.state.detailTab) {
      onTabChange(location.state.detailTab);
    }
  }, []);

  return (
    <DashboardLayout>
      <WelcomeBar loading={false}>
        <span className="lighter">
          {' '}
          {global.translate('Manage', 131)} {currentStore.StoreName}
        </span>
      </WelcomeBar>
      <>
        <Divider hidden />
      </>
      {currentStore && (
        <Container>
          <Tab
            ref={tabRef}
            onChangeTab={onTabChange}
            menu={{ secondary: true, pointing: true, fluid: true }}
            panes={panes}
            pendingVouchers={pendingVouchers}
            onCancelTransactionConfirm={onCancelTransactionConfirm}
            store={store}
            setSelectedItem={setSelectedItem}
            selectedItem={selectedItem}
            setCancelOpen={setCancelOpen}
            cancelOpen={cancelOpen}
            onRejectVoucher={onRejectVoucher}
            form={form}
            currentStore={currentStore}
            setStoreStatus={setStoreStatus}
            getPendingStoreVouchers={getPendingStoreVouchers}
            onEditChange={onEditChange}
            setForm={setForm}
            deleteStore={deleteStore}
            deleteStoreData={deleteStoreData}
          />
        </Container>
      )}
    </DashboardLayout>
  );
};

StoreDetailsComponent.propTypes = {
  currentStore: PropTypes.objectOf(PropTypes.any),
  pendingVouchers: PropTypes.objectOf(PropTypes.any),
  onCancelTransactionConfirm: PropTypes.func,
  store: PropTypes.objectOf(PropTypes.any),
  onRejectVoucher: PropTypes.func,
  form: PropTypes.objectOf(PropTypes.any),
  setForm: PropTypes.func,
  onEditChange: PropTypes.func,
  getPendingStoreVouchers: PropTypes.func,
  deleteStore: PropTypes.objectOf(PropTypes.any),
  deleteStoreData: PropTypes.objectOf(PropTypes.any),
};

StoreDetailsComponent.defaultProps = {
  currentStore: {},
  pendingVouchers: {},
  deleteStore: {},
  deleteStoreData: {},
  onCancelTransactionConfirm: () => null,
  store: {},
  onRejectVoucher: () => null,
  form: {},
  setForm: () => null,
  onEditChange: () => null,
  getPendingStoreVouchers: () => null,
};
export default StoreDetailsComponent;