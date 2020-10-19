import React from 'react';
import { Card, Image, List } from 'semantic-ui-react';
import EventsImage from 'assets/images/marketplace/liberation_day_rw.png';
import './style.scss';
import {
  COMPANY_NAME,
  TERMS_AND_CONDITIONS_URL,
  PRIVACY_POLICY_URL,
  HOME_WEBSITE,
} from 'constants/general';

const SidebarAd = ({ className = '' }) => {
  return (
    <div className={className}>
      <Card>
        <Image
          src="https://images.pexels.com/photos/4689912/pexels-photo-4689912.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          wrapped
          ui={false}
        />
        <Card.Content className="cp-footer">
          <div className="cp-footer">
            <List horizontal>
              <List.Item
                as="a"
                target="_blank"
                href={TERMS_AND_CONDITIONS_URL}
              >
                {global.translate('Terms and Conditions')}
              </List.Item>
              <List.Item
                as="a"
                target="_blank"
                href={PRIVACY_POLICY_URL}
              >
                {global.translate('Privacy Policy.')}
              </List.Item>
              <List.Item as="a" target="_blank" href={HOME_WEBSITE}>
                {global.translate('More')}
              </List.Item>
            </List>
            &copy; {new Date().getFullYear()} {COMPANY_NAME}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default SidebarAd;
