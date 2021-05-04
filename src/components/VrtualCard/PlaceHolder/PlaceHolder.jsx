import React from 'react';
import { Image } from 'semantic-ui-react';
import CardListPlaceholder from 'assets/images/placeholder_listing_cards.svg';

const CreditCardListPlaceHolder = () => (
  <div className="animate-placeholder">
    <Image src={CardListPlaceholder} />
  </div>
);

export default CreditCardListPlaceHolder;
