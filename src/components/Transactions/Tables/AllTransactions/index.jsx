import React from 'react';
import { Table, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import creditImg from 'assets/images/transactions/credit.svg';
import debitImg from 'assets/images/transactions/debit.svg';
import '../style.scss';
import useWindowSize from 'utils/useWindowSize';

const AllTransactions = ({
  onClick,
  allTransactionData,
  selectedCard,
}) => {
  const size = useWindowSize();
  return (
    <Table basic className="display-transactions" unstackable>
      <Table.Header className="table-headings">
        <Table.Row>
          <Table.HeaderCell className="date-title">
            {global.translate('Date')}
          </Table.HeaderCell>
          <Table.HeaderCell>
            {global.translate('Description')}
          </Table.HeaderCell>
          {size.width > 600 && (
            <>
              <Table.HeaderCell>
                {global.translate('Source wallet')}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {global.translate('Recipient wallet')}
              </Table.HeaderCell>

              <Table.HeaderCell>
                {global.translate('Debit')}
              </Table.HeaderCell>

              <Table.HeaderCell>
                {global.translate('Credit')}
              </Table.HeaderCell>
            </>
          )}
        </Table.Row>
      </Table.Header>

      <Table.Body className="table-body-data">
        {allTransactionData &&
          allTransactionData.map(item => (
            <Table.Row onClick={() => onClick(item, selectedCard)}>
              <Table.Cell
                className="date-title"
                style={{ width: '125px' }}
              >
                {moment(item.Date.substr(0, 11)).format('ll')}
              </Table.Cell>
              <Table.Cell>{item.Description}</Table.Cell>
              {size.width > 600 && (
                <>
                  <Table.Cell>{item.WalletNumber}</Table.Cell>
                  <Table.Cell>{item.TargetAccount}</Table.Cell>
                </>
              )}

              <Table.Cell>
                {item.OpsType === '-' ? (
                  <span style={{ color: '#E01B22' }}>
                    {`${item.Amount} ${item.Currency}`}
                  </span>
                ) : (
                  ''
                )}
              </Table.Cell>

              <Table.Cell>
                {item.OpsType === '+' ? (
                  <span style={{ color: '#3B9C62' }}>
                    {`${item.Amount} ${item.Currency}`}
                  </span>
                ) : (
                  ''
                )}
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

AllTransactions.propTypes = {
  onClick: PropTypes.func,
  allTransactionData: PropTypes.arrayOf(PropTypes.any),
  selectedCard: PropTypes.number,
};
AllTransactions.defaultProps = {
  onClick: () => {},
  allTransactionData: [],
  selectedCard: 1,
};

export default AllTransactions;
