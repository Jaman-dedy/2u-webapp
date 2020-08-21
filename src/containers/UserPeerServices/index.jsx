import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ProfileComponent from 'components/PeerServices/OfferService';
import getMyServices from 'redux/actions/peerServices/getMyServices';

const Index = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const userId = location.pathname.split('/')[2];
  const { data: user } = useSelector(
    ({ user: { userData } }) => userData,
  );

  const { data } = useSelector(
    ({ peerServices: { myServices } }) => myServices,
  );
  const userPID = userId === 'me' ? user?.PID : userId.toUpperCase();

  const loadMyServices = () => {
    getMyServices({
      ServiceID: '',
      PID: userPID,
      Categories: [],
      CountryCodes: [],
      Tags: [],
      FreeText: [],
      DistanceKms: '',
      Longitude: '',
      Latitude: '',
      PageNumber: '1',
      RecordPerPage: '20',
      CommentCount: '10',
      GettingRelated: 'NO',
      UserReview: user?.PID,
    })(dispatch);
  };

  const userServicesExist = useCallback(() => {
    if (data?.Data) {
      return (
        data?.Data.filter(item => item.Owner.OwnerPID === userPID)
          .length > 0
      );
    }
    return false;
  }, [data]);

  useEffect(() => {
    if (userPID && !userServicesExist()) {
      loadMyServices();
    }
  }, [userPID]);

  return <ProfileComponent userPID={userId} />;
};

export default Index;