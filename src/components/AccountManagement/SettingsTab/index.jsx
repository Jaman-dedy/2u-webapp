import React from 'react';
import { Table } from 'semantic-ui-react';
import './style.scss';

const Settings = () => {
  return (
    <div className="settings-container">
      <Table basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="settings-header">
              {global.translate('settings')}
            </Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              {' '}
              {global.translate('Account type')}
            </Table.Cell>
            <Table.Cell>
              {' '}
              {global.translate('Personal account')}
            </Table.Cell>
            <Table.Cell textAlign="right" className="settings-action">
              {global.translate('Change')}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell> {global.translate('Language')}</Table.Cell>
            <Table.Cell>
              {' '}
              {global.translate('English(UK)')}
            </Table.Cell>
            <Table.Cell textAlign="right" className="settings-action">
              {global.translate('Change')}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default Settings;
