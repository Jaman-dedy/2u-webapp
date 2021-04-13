import React from 'react';
import { Placeholder } from 'semantic-ui-react';

const ImagePlaceHolder = ({ style }) => {
  return (
    <Placeholder style={style} fluid>
      <Placeholder.Image />
    </Placeholder>
  );
};

export default ImagePlaceHolder;
