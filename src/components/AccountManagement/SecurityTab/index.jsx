import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import './style.scss';

const SecurityTab = () => {
  return (
    <div className="security-container">
      <Table basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="security-header">
              {global.translate('Security')}
            </Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell> {global.translate('Password')}</Table.Cell>
            <Table.Cell>
              {' '}
              {global.translate(
                "It's a good idea to use a strong password that you don't use elsewhere",
              )}
            </Table.Cell>
            <Table.Cell textAlign="right" className="security-action">
              {global.translate('Change')}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell> {global.translate('PIN Number')}</Table.Cell>
            <Table.Cell>
              {' '}
              {global.translate(
                '4 digit security code for verifying your identity when performing substantial operations such as transactions',
              )}
            </Table.Cell>
            <Table.Cell textAlign="right" className="security-action">
              {global.translate('Change')}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default SecurityTab;
