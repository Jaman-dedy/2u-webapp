import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import './style.scss';

const TransactionLimit = () => {
  return (
    <div className="transaction-limit-container">
      <Table basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="transaction-header">
              {global.translate('Transaction limits')}
            </Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell textAlign="right">
              <Button className="transaction-button">
                {' '}
                {global.translate('Request change limit')}
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              {' '}
              {global.translate('Maximum money transfer per day')}
            </Table.Cell>
            <Table.Cell />
            <Table.Cell textAlign="right">1,000,000 RWF</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {' '}
              {global.translate('Transaction limits')}
            </Table.Cell>
            <Table.Cell />
            <Table.Cell textAlign="right">1,000,000 RWF</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {global.translate('Number of transactions per day')}
            </Table.Cell>
            <Table.Cell />
            <Table.Cell textAlign="right">5 transactions</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {global.translate('Maximum amount per day')}
            </Table.Cell>
            <Table.Cell />
            <Table.Cell textAlign="right">1,000,000 RWF</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {global.translate('Maximum amount per transaction')}
            </Table.Cell>
            <Table.Cell />
            <Table.Cell textAlign="right">1,000,000 RWF</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default TransactionLimit;
