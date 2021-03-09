import React, { useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './style.scss';
import useWindowSize from 'utils/useWindowSize';

const AllTransactions = ({
  onClick,
  pendingVoucherData,
  selectedCard,
}) => {
  useEffect(() => {
  }, [pendingVoucherData]);
  const size = useWindowSize();
  return (
    <Table basic className="display-transactions" unstackable>
      <Table.Header className="table-headings">
        <Table.Row>
          <Table.HeaderCell className="date-title">
            {global.translate('Date', 1258)}
          </Table.HeaderCell>
          <Table.HeaderCell>
            {global.translate('Name', 2242)}
          </Table.HeaderCell>
          {size.width > 600 && (
            <>
              <Table.HeaderCell>
                {global.translate('Amount sent', 1259)}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {global.translate('Store name', 837)}
              </Table.HeaderCell>
            </>
          )}

          <Table.HeaderCell>
            {global.translate('Source wallet', 1260)}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body className="table-body-data">
        {pendingVoucherData &&
          pendingVoucherData.map(item => (
            <Table.Row onClick={() => onClick(item, selectedCard)}>
              <Table.Cell
                className="date-title"
                style={{ width: '125px' }}
              >
                {moment(item?.Date?.substr(0, 11)).format('ll')}
              </Table.Cell>
              <Table.Cell>{`${item?.Recipient?.FirstName} ${item?.Recipient?.LastName}`}</Table.Cell>
              {size.width > 600 && (
                <>
                  <Table.Cell>{`${item?.Amount} ${item?.Currency}`}</Table.Cell>
                  <Table.Cell>{item?.Store?.Name}</Table.Cell>
                </>
              )}

              <Table.Cell>{item?.SourceAccountNumber}</Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

AllTransactions.propTypes = {
  onClick: PropTypes.func,
  pendingVoucherData: PropTypes.arrayOf(PropTypes.any),
  selectedCard: PropTypes.number,
};
AllTransactions.defaultProps = {
  onClick: () => {},
  pendingVoucherData: [],
  selectedCard: 1,
};

export default AllTransactions;
