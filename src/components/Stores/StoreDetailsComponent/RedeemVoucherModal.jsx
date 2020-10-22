import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'semantic-ui-react';

import { useSelector, useDispatch } from 'react-redux';
import redeemStoreVoucher from 'redux/actions/vouchers/redeemStoreVoucher';
import VoucherTokenVerification from 'components/common/VoucherTokenVerification';
import VoucherSecurityCode from 'components/common/VoucherSecurityCode';
import Message from 'components/common/Message';

import verifyVoucherFn from 'redux/actions/vouchers/verifyStoreVoucher';
import PendingVoucherDetails from './pendingVoucherDetail';
import VoucherReceiptModal from './VoucherReceiptModal';

const RedeemVoucherModal = ({ open, setOpen, item }) => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    VoucherNumber: '',
    SecurityCode: '',
  });

  const [
    openVoucherReceiptModal,
    setOpenVoucherReceiptModal,
  ] = useState(false);

  const [error] = useState(null);
  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const { error: err, data, loading: verifyLoading } = useSelector(
    state => state.voucher.verifyVoucher,
  );

  const { data: redeemData, loading: redeemLoading } = useSelector(
    state => state.voucher.redeemVoucher,
  );

  useEffect(() => {
    if (data) {
      setStep(step + 1);
    }
  }, [data]);

  useEffect(() => {
    setForm({ ...form, VoucherNumber: '', SecurityCode: '' });
  }, [open]);

  useEffect(() => {
    setStep(1);
    setOpen(false);

    if (redeemData) {
      setOpenVoucherReceiptModal(true);
    }
  }, [redeemData]);

  const dataTest = [
    {
      OK: '200',
      ReturnCode: '0',
      Description: 'This transaction has been completed.',
      PID: 'LAFOUINEBABY',
      Result: 'Success',
      AmountToBeReceived: '0.00 CDF',
      Amount: '11.00 AED',
      Fees: '0.00 AED',
      ExternalFees: '3.67 AED',
      ExchangeFees: '0.07 AED',
      Taxes: '0.00 AED',
      TotalAmount: '14.74 AED',
      ExchangeRate: '1:0.000000',
      SecurityCode: '3321',
      VoucherPIN: '0905733892',
      VoucherQRCode:
        'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=09057338923321',
      Sender: {
        ContactType: 'INTERNAL',
        SenderPID: 'LAFOUINEBABY',
        FirstName: 'LaFouine',
        LastName: 'Ouinny',
        PhoneNumber: '32460227441',
        Email: 'lafouine@gmail.com',
        DefaultWallet: 'AED-05-LAFOUINEBABY',
        PictureURL:
          'https://celinemoneypicfiles.blob.core.windows.net/zones/lafouinebaby-0.png',
      },
      Beneficiary: {
        ContactType: 'INTERNAL',
        BenefPID: 'DANSON777',
        FirstName: 'Danson',
        LastName: 'Serge',
        PhoneNumber: '250788211908',
        Email: '',
        DefaultWallet: 'USD-01-DANSON777',
        PictureURL:
          'https://celinemoneypicfiles.blob.core.windows.net/zones/danson777-0.png',
      },
      Address: 'Kigali/Rwanda',
      Store: {
        StoreID: 'ST-01-LAFOUINEBABY',
        StoreName: 'First Store',
        ShortDesc: 'Store Leading words',
        City: 'Kigali',
        Country: 'Rwanda',
        CountryCode: 'rw',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
        PhoneNumber: '250781234567',
        PhonePrefix: '250',
        Phone: '781 234 567',
        StoreBanner:
          'https://celinemoneypicfiles.blob.core.windows.net/medias/st-01-lafouinebaby.png',
        StoreLogo:
          'https://celinemoneypicfiles.blob.core.windows.net/medias/st-01-lafouinebabylogo.png',
      },
    },
  ];

  return (
    <div>
      <Modal
        size="mini"
        open={open}
        onClose={() => setOpen(false)}
        className="redeem-voucher-modal"
      >
        <Modal.Header className="modal-title">
          {global.translate('Redeem voucher')}
        </Modal.Header>
        <Modal.Content centered className="main-content">
          {step === 2 && (
            <div className="pin-number-inputs">
              {step === 2 && data && (
                <PendingVoucherDetails item={data} />
              )}
            </div>
          )}
          {step === 2 && error && <Message message={error} />}
          {step === 2 && err && (
            <Message
              message={err.error ? err.error : err[0]?.Description}
            />
          )}

          {step !== 2 && (
            <>
              <div
                className="pin-number-inputs"
                style={{ marginTop: 10 }}
              >
                <VoucherTokenVerification
                  form={form}
                  label={global.translate(
                    'Enter the voucher token ',
                    941,
                  )}
                  onInputChange={onChange}
                  name="VoucherNumber"
                  value={form.VoucherNumber || ''}
                />
              </div>
              <div
                className="pin-number-inputs"
                style={{ marginBottom: 10 }}
              >
                <VoucherSecurityCode
                  label={global.translate(
                    'Enter the Security code',
                    941,
                  )}
                  onChange={onChange}
                  name="SecurityCode"
                  value={form.SecurityCode || ''}
                />
              </div>
            </>
          )}
        </Modal.Content>
        <Modal.Actions className="redeem-voucher-modal-actions">
          {step !== 2 && (
            <div className="main-content">
              <Button
                disabled={redeemLoading}
                basic
                color="red"
                onClick={() => setOpen(false)}
              >
                {global.translate('Close')}
              </Button>
              <Button
                className="verify-voucher-btn"
                disabled={verifyLoading}
                loading={verifyLoading}
                positive
                onClick={() => {
                  const SecurityCode = `${form?.digit0}${form?.digit1}${form?.digit2}${form?.digit3}`;
                  const postData = {
                    SecurityCode,
                    VoucherNumber: form?.VoucherNumber,
                    StoreID: item?.StoreSID,
                  };
                  verifyVoucherFn(postData)(dispatch);
                }}
              >
                {global.translate('verify')}
              </Button>
            </div>
          )}

          {step === 2 && (
            <>
              <Button
                disabled={redeemLoading}
                basic
                color="red"
                onClick={() => setStep(step - 1)}
              >
                {global.translate('Back')}
              </Button>
              <Button
                disabled={redeemLoading}
                loading={redeemLoading}
                positive
                onClick={() => {
                  const SecurityCode = `${form?.digit0}${form?.digit1}${form?.digit2}${form?.digit3}`;
                  const postData = {
                    SecurityCode,
                    VoucherNumber: form?.VoucherNumber,
                    StoreID: item?.StoreSID,
                  };
                  redeemStoreVoucher(postData)(dispatch);
                }}
              >
                {global.translate('Redeem')}
              </Button>
            </>
          )}
        </Modal.Actions>
      </Modal>

      <VoucherReceiptModal
        data={redeemData?.[0]}
        isOpened={openVoucherReceiptModal}
        onClose={() => setOpenVoucherReceiptModal(false)}
      />

      {/*  <VoucherReceiptModal
        data={dataTest?.[0]}
        isOpened={open}
        onClose={() => setOpen(false)}
      /> */}
    </div>
  );
};
RedeemVoucherModal.propTypes = {
  open: PropTypes.bool,
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  setOpen: PropTypes.func.isRequired,
};

RedeemVoucherModal.defaultProps = {
  open: false,
};
export default RedeemVoucherModal;
