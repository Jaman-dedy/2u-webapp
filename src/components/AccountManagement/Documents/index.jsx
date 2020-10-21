import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Label, Form, Dropdown, Message } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Img from 'components/common/Img';
import checkImageExists from 'helpers/checkImageExists';
import ImagePreviewModal from 'components/common/ImagePreviewModal';
import './Documents.scss';
import {
  idID,
  idPassport,
  idDriverLicence,
  idOther,
} from 'constants/general';
import countryCodeLetters from 'utils/countryCodeLetters';
import DocPlaceholder from './DocPlaceholder';

const Documents = ({ userData, documents }) => {
  const {
    userDocs,
    onImageChange,
    onOptionsChange,
    submitHandler,
    expiryDate,
    setExpiryDate,
    setIssueDate,
    issueDate,
    form,
    errors,
    loading,
    iDCardInfo,
    IdInfo,
  } = documents;

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
  const options = [
    {
      key: idID,
      text: global.translate('ID card', 1143),
      value: idID,
    },
    {
      key: idPassport,
      text: global.translate('Passport', 1142),
      value: idPassport,
    },
    {
      key: idDriverLicence,
      text: global.translate("Driver's license", 1144),
      value: idDriverLicence,
    },
    {
      key: idOther,
      text: global.translate('Other', 1409),
      value: idOther,
    },
  ];
  return (
    <div className="documents-container">
      <ImagePreviewModal
        open={open}
        setOpen={setOpen}
        src={imagePreviewSrc}
      />
      <div className="doc-title">
        <span>{global.translate('Official ID document')}</span>
      </div>
      <span className="doc-sub-title">
        {global.translate(
          'This could be any government issued picture ID such as Passport, driving license, national ID card.',
          891,
        )}
      </span>
      <div className="doc-status">
        {IdDocExist && (
          <Label
            color={getDocStatus(data && data.IDVerified)?.color}
            className="status-label"
          >
            Status : {getDocStatus(data && data.IDVerified)?.label}
          </Label>
        )}
      </div>
      <div className="justify-content-space-between id-forms">
        <div className="document-image">
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

        <div className="id-doc-form">
          <Form size="mini">
            <div>
              <span> Select the ID type </span>
              <br />
              <Dropdown
                fluid
                label="Select the ID type"
                options={options}
                selection
                placeholder="ID type"
                onChange={onOptionsChange}
                name="IDType"
                defaultValue={iDCardInfo?.IDType}
              />
              {errors?.IDType && (
                <Message color="orange">{errors.IDType}</Message>
              )}
            </div>
            <br />

            <div>
              <Form.Input
                fluid
                label="Id number"
                placeholder="Id number"
                onChange={onOptionsChange}
                name="IDNumber"
                value={
                  form?.IDNumber ||
                  IdInfo?.IDNumber ||
                  iDCardInfo?.IDNumber
                }
              />
              {errors?.IDNumber && (
                <Message color="orange">{errors.IDNumber}</Message>
              )}
            </div>
            <br />
            <div>
              <span> Date of issue</span>
              <br />

              <DatePicker
                selected={issueDate}
                onChange={date => setIssueDate(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                value={IdInfo?.DateIssue || iDCardInfo?.IssueDate}
              />
            </div>
            <br />
            <div>
              <span> Expiration date </span>
              <br />
              <DatePicker
                selected={expiryDate}
                onChange={date => setExpiryDate(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                value={
                  IdInfo?.ExpirationDate || iDCardInfo?.ExpirationDate
                }
              />
            </div>
            <br />

            <div>
              <span> Select Country </span>
              <br />
              <Dropdown
                label="Select Country"
                placeholder="Select Country"
                fluid
                search
                selection
                options={countryCodeLetters}
                onChange={onOptionsChange}
                name="IDCountryCode"
                defaultValue="rw"
              />
              {errors?.IDCountryCode && (
                <Message color="orange">
                  {errors.IDCountryCode}
                </Message>
              )}
            </div>
            <div className="submit-button">
              <Form.Button
                loading={loading}
                disabled={
                  loading ||
                  !!errors?.IDCountryCode ||
                  !!errors?.IDNumber ||
                  !!errors?.IDType
                }
                onClick={() => submitHandler()}
              >
                Submit
              </Form.Button>
            </div>
          </Form>
        </div>
      </div>

      {/* <div className="large-v-margin">
        <span>{global.translate('Proof of current address')}</span>
      </div> */}
      {/* <div className="flex docs">
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
      </div> */}
      {/* <div className="large-v-margin">
        <span>{global.translate('Other documents')}</span>
      </div> */}
      {/* <div className="other-documents flex">
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
      </div> */}
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
