/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Card, Button, Label, Tab, Menu } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import { Link } from 'react-router-dom';
import WelcomeBar from 'components/Dashboard/WelcomeSection';
import DashboardLayout from 'components/common/DashboardLayout';
import Message from 'components/common/Message';
import LoaderComponent from 'components/common/Loader';
import AppTable from 'components/common/Table';
import SimplePieChart from 'components/common/charts/pie';
import CustomDropdown from 'components/common/Dropdown/WalletDropdown';
import UnPaidCashList from './UnPaidCashList';

const Transactions = ({
  userData,
  walletTransactions: { data, error, loading },
  onChange,
  form,
  chartData,
  getTransactions,
  walletNumber,
  unPaidCashList,
  getUnPaidCashList,
  walletList,
  currentOption,
  tableVisible,
  amountChartData,
  contact,
  onCancelTransactionConfirm,
}) => {
  const pendingTransactions =
    unPaidCashList.data &&
    walletNumber &&
    unPaidCashList.data.filter(
      item => item.SourceAccountNumber === walletNumber,
    );

  let allSourceWalletFilterOptions = null;

  let allDestFilterWalletOptions = null;

  if (data) {
    allDestFilterWalletOptions = data.map(item => item.TargetAccount);
    allSourceWalletFilterOptions = data.map(
      item => item.WalletNumber,
    );
  }

  const showExternalContactsTransactionsUI = () => {
    return (
      <>
        {loading && (
          <LoaderComponent
            style={{ marginTop: 20, marginLeft: 24 }}
            loaderContent={global.translate('Working…', 412)}
          />
        )}
        {data && data[0].Error && !loading && !error && (
          <Message
            style={{ marginTop: 24, marginLeft: 24 }}
            message={global.translate(data[0].Description, 2016)}
            error={false}
          />
        )}
        {data && !data[0].Error && (
          <UnPaidCashList
            unPaidCashList={{ data, error, loading }}
            getUnPaidCashList={getTransactions}
            pendingTransactions={data}
            contactType="EXTERNAL"
            showAll
            onCancelTransactionConfirm={onCancelTransactionConfirm}
          />
        )}
      </>
    );
  };

  const filterUi = (
    <div className="table-header">
      <p className="sub-title" />
      <div className="from-to">
        <div className="from">
          <h4>{global.translate('From', 114)}</h4>
          <DateInput
            name="fromDate"
            onChange={onChange}
            icon="dropdown"
            popupPosition="top left"
            animation="fade"
            placeholder={global.translate('To')}
            iconPosition="right"
            dateFormat="YYYY-MM-DD"
            value={form.fromDate}
          />
        </div>
        <div className="to">
          <h4>{global.translate('To')}</h4>
          <DateInput
            name="toDate"
            onChange={onChange}
            icon="dropdown"
            popupPosition="top left"
            animation="fade"
            placeholder={global.translate('To')}
            iconPosition="right"
            dateFormat="YYYY-MM-DD"
            value={form.toDate}
          />
          &nbsp;
          <Button
            icon="refresh"
            color="orange"
            onClick={() => {
              getTransactions();
            }}
          />
        </div>
      </div>
    </div>
  );
  const walletOptions =
    walletList &&
    walletList.map(el => {
      return {
        id: el.AccountNumber,
        text: el.AccountNumber,
        value: el.AccountNumber,
        Flag: el.Flag,
        AccountName: el.AccountName,
        AccountNumber: el.AccountNumber,
      };
    });
  const showTransactionsUI = () => (
    <>
      <div className="all-user-transactions">
        <div className="all-transactions">
          {data && !data[0].Error && (
            <AppTable
              data={data}
              allDestFilterWalletOptions={Array.from(
                new Set(allDestFilterWalletOptions),
              )}
              allSourceWalletFilterOptions={Array.from(
                new Set(allSourceWalletFilterOptions),
              )}
              tableVisible={tableVisible}
              filterUi={filterUi}
              onRefreshClicked={getTransactions}
              loading={loading}
              userLanguage={
                (userData.data &&
                  userData.data.Language !== '' &&
                  userData.data.Language) ||
                'en'
              }
              isAtAllTransactions
              error={error}
              searchFields={[
                'Amount',
                'TargetAccount',
                'Date',
                'Description',
              ]}
              itemsPerPage={9}
              headers={[
                { key: 'Date', value: 'Date' },

                {
                  key: 'Amount',
                  value: global.translate('Debit'),
                },
                {
                  key: 'Amount',
                  value: global.translate('Credit'),
                },
                {
                  key: 'TargetAccount',
                  value: global.translate('Account number', 501),
                },
                {
                  key: 'Description',
                  value: global.translate('Description', 119),
                },
              ]}
            />
          )}

          <div>
            {loading && (
              <LoaderComponent
                style={{ marginTop: 20 }}
                loaderContent={global.translate('Working…', 412)}
              />
            )}

            {error && (
              <Message
                style={{ marginTop: 50 }}
                message={
                  error.error
                    ? global.translate(error.error)
                    : global.translate(error[0].Description, 195)
                }
                action={{
                  onClick: () => {
                    getTransactions();
                  },
                }}
              />
            )}
            {data && data[0].Error && !loading && !error && (
              <Message
                style={{ marginTop: 50 }}
                message={global.translate(data[0].Description, 2016)}
                error={false}
              />
            )}
          </div>
        </div>
      </div>
      {!loading && !error && tableVisible && data && !data[0].Error && (
        <div>
          <div className="last-year-header">
            <p className="sub-title">
              {global.translate(
                'Transactions overview for the period',
                1232,
              )}
            </p>
          </div>
          <div className="chart-area-header">
            <Card fluid className="chart-card">
              <Card.Content>
                <div className="charts">
                  <SimplePieChart data={chartData} />
                  <SimplePieChart data={amountChartData} />
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      )}
    </>
  );

  return (
    <DashboardLayout>
      <WelcomeBar
        loading={userData.loading}
        style={
          !contact
            ? { paddingBottom: '11px', paddingTop: '23px' }
            : { paddingBottom: '22px', paddingTop: '35px' }
        }
      >
        <span className="lighter">
          {contact
            ? `${global.translate('My Transactions with')} ${
                contact.FirstName
              }`
            : global.translate('Transactions for')}
          &nbsp;
        </span>
        {!contact && (
          <span>
            <CustomDropdown
              style={{
                backgroundColor: '#eee',
              }}
              setCurrentOption={() =>
                walletList.find(
                  item => item.AccountNumber === form.wallet,
                )
              }
              options={walletOptions}
              currentOption={currentOption}
              onChange={onChange}
            />
          </span>
        )}
      </WelcomeBar>

      <div className="main-container">
        {contact ? (
          !contact.ContactPID ? (
            showExternalContactsTransactionsUI()
          ) : (
            showTransactionsUI()
          )
        ) : (
          <Tab
            menu={{ secondary: true, pointing: true }}
            panes={[
              {
                menuItem: global.translate('Transactions', 62),
                render: () => showTransactionsUI(),
              },
              {
                menuItem: (
                  <Menu.Item key="Pending cash sent">
                    {global.translate('Pending cash sent', 916)}
                    <Label as={Link} color="orange">
                      {(pendingTransactions &&
                        pendingTransactions.length) ||
                        0}
                    </Label>
                  </Menu.Item>
                ),
                render: () => (
                  <>
                    <UnPaidCashList
                      unPaidCashList={unPaidCashList}
                      getUnPaidCashList={getUnPaidCashList}
                      walletNumber={walletNumber}
                      pendingTransactions={pendingTransactions}
                      onCancelTransactionConfirm={
                        onCancelTransactionConfirm
                      }
                    />
                  </>
                ),
              },
            ]}
          />
        )}
      </div>
    </DashboardLayout>
  );
};
Transactions.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  walletTransactions: PropTypes.objectOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  chartData: PropTypes.arrayOf(PropTypes.any).isRequired,
  amountChartData: PropTypes.arrayOf(PropTypes.any).isRequired,
  getTransactions: PropTypes.func.isRequired,
  walletNumber: PropTypes.string.isRequired,
  unPaidCashList: PropTypes.objectOf(PropTypes.any).isRequired,
  getUnPaidCashList: PropTypes.func.isRequired,
  walletList: PropTypes.arrayOf(PropTypes.any).isRequired,
  currentOption: PropTypes.objectOf(PropTypes.any).isRequired,
  tableVisible: PropTypes.bool,
  contact: PropTypes.objectOf(PropTypes.any),
  onCancelTransactionConfirm: PropTypes.func,
};

Transactions.defaultProps = {
  tableVisible: true,
  contact: null,
  onCancelTransactionConfirm: () => {},
};
export default Transactions;