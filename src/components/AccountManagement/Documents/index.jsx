import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';
import Img from 'components/common/Img';
import checkImageExists from 'helpers/checkImageExists';
import ImagePreviewModal from 'components/common/ImagePreviewModal';
import DocPlaceholder from './DocPlaceholder';
import './Documents.scss';

const Documents = ({ userData, documents }) => {
  const { userDocs, onImageChange } = documents;
  const { data } = userData;

  const [open, setOpen] = useState(false);
  const [imagePreviewSrc, setImagePreviewSrc] = useState('');
  const [IdDocExist, setIdDocExist] = useState(false);
  const [PoRDocExist, setPoRDocExist] = useState(false);

  useEffect(() => {
    if (data) {
      checkImageExists(data.UserIDURL).then(data => {
        setIdDocExist(data);
      });
      checkImageExists(data.UserProofOfAddressURL).then(data => {
        setPoRDocExist(data);
      });
    }
  }, [data]);

  const getDocStatus = doc => {
    switch (doc) {
      case '0':
        return {
          label: global.translate('Rejected', 1742),
          color: 'red',
        };

      case '1':
        return {
          label: global.translate('Verifed', 1480),
          color: 'green',
        };

      case '2':
        return {
          label: global.translate('Pending', 1743),
          color: null,
        };

      default:
        return null;
    }
  };
  return (
    <div className="documents-container">
      <ImagePreviewModal
        open={open}
        setOpen={setOpen}
        src={imagePreviewSrc}
      />
      <div className="large-v-margin">
        <span>{global.translate('Official ID document')}</span>
      </div>
      <div className="flex docs">
        <div className="description text-overflow-ellipsis center-align xlarge-v-padding large-h-padding border-radius-4">
          <span className="text-overflow-ellipsis">
            {global.translate(
              'This could be any government issued picture ID such as Passport, driving license, national ID card.',
              891,
            )}
          </span>
        </div>
        <div className="document-image">
          {IdDocExist && (
            <Label
              ribbon
              color={getDocStatus(data && data.IDVerified)?.color}
              className="status-label"
            >
              {getDocStatus(data && data.IDVerified)?.label}
            </Label>
          )}
          <Img
            compress
            format="png"
            height="138px"
            width="235px"
            hasError
            src={
              (userDocs.UserIDURL && userDocs.UserIDURL.imageUrl) ||
              (data && data.UserIDURL)
            }
            onImageChange={onImageChange}
            name="UserIDURL"
            className="id-doc cursor-pointer"
            onClick={() => {
              setOpen(!open);
              setImagePreviewSrc(
                (userDocs.UserIDURL && userDocs.UserIDURL.imageUrl) ||
                  (data && data.UserIDURL),
              );
            }}
            alt={
              <DocPlaceholder
                name="UserIDURL"
                onChooseFile={onImageChange}
              />
            }
          />
        </div>
      </div>
      <div className="large-v-margin">
        <span>{global.translate('Proof of current address')}</span>
      </div>
      <div className="flex docs">
        <div className="description center-align large-padding border-radius-4">
          <span>
            {global.translate(
              'This could be any official document bearing your name and your address such as utilities bill, bank statement, and landline telephone bill. In respect of close relatives or roommates living together, a certified statement of the person with the name on the document is required.',
              893,
            )}
          </span>
        </div>
        <div className="document-image">
          {PoRDocExist && (
            <Label
              ribbon
              color={getDocStatus(data && data.PoRVerified)?.color}
              className="status-label"
            >
              {getDocStatus(data && data.PoRVerified)?.label}
            </Label>
          )}
          <Img
            compress
            hasError
            format="png"
            height="235"
            width="138"
            src={
              (userDocs.UserProofOfAddressURL &&
                userDocs.UserProofOfAddressURL.imageUrl) ||
              (data && data.UserProofOfAddressURL)
            }
            onImageChange={onImageChange}
            name="UserProofOfAddressURL"
            className="id-doc cursor-pointer"
            onClick={() => {
              setOpen(!open);
              setImagePreviewSrc(
                (userDocs.UserProofOfAddressURL &&
                  userDocs.UserProofOfAddressURL.imageUrl) ||
                  (data && data.UserProofOfAddressURL),
              );
            }}
            alt={
              <DocPlaceholder
                name="UserProofOfAddressURL"
                onChooseFile={onImageChange}
              />
            }
          />
        </div>
      </div>
      <div className="large-v-margin">
        <span>{global.translate('Other documents')}</span>
      </div>
      <div className="other-documents flex">
        {Array(5)
          .fill()
          .map((_, index) => {
            return (
              <div className="other-doc">
                <Img
                  hasError
                  compress
                  format="png"
                  height="83px"
                  width="100px"
                  src={
                    (userDocs[`UserExtraDoc${index + 1}URL`] &&
                      userDocs[`UserExtraDoc${index + 1}URL`]
                        .imageUrl) ||
                    (data && data[`UserExtraDoc${index + 1}URL`])
                  }
                  onImageChange={onImageChange}
                  name={[`UserExtraDoc${index + 1}URL`]}
                  className="other-doc__image cursor-pointer"
                  camStyle={{ width: 25, height: 20 }}
                  onClick={() => {
                    setOpen(!open);
                    setImagePreviewSrc(
                      (userDocs[`UserExtraDoc${index + 1}URL`] &&
                        userDocs[`UserExtraDoc${index + 1}URL`]
                          .imageUrl) ||
                        (data && data[`UserExtraDoc${index + 1}URL`]),
                    );
                  }}
                  alt={
                    <DocPlaceholder
                      other
                      name={[`UserExtraDoc${index + 1}URL`]}
                      onChooseFile={onImageChange}
                    />
                  }
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

Documents.propTypes = {
  userData: PropTypes.instanceOf(Object),
  documents: PropTypes.instanceOf(Object),
};

Documents.defaultProps = {
  userData: {},
  documents: {},
};

export default Documents;
