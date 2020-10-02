/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import updateUserProfileImageAction from 'redux/actions/userAccountManagement/updateUserProfileImage';
import uploadFile from 'helpers/uploadImages/uploadFile';
import isFileImage from 'utils/isFileImage';

export default () => {
  const { userData } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  const [profileImage, setProfileImage] = useState({
    imageUrl: '',
    image: null,
  });

  const [profileImageState, setProfileImageState] = useState({
    loading: false,
    error: null,
  });

  const uploadProfileImage = async () => {
    setProfileImageState({
      ...profileImage,
      loading: true,
    });
    const { status, data } = await uploadFile(
      {
        ProfileImage: profileImage.image,
      },
      '/UploadUserPicture',
      null,
      userData.data?.PID,
    );
    if (!status) {
      toast.error(data[0].Description);
      return setProfileImageState({
        ...profileImage,
        loading: false,
        error: data,
      });
    }
    if (data) {
      updateUserProfileImageAction(data[0].url)(dispatch);
    }
    toast.success(
      global.translate('Profile image updated successfully', 2059),
    );
    return setProfileImageState({
      ...profileImage,
      loading: false,
    });
  };

  const onImageChange = ({ target }) => {
    const { files } = target;

    if (target.files[0]) {
      if (isFileImage(files[0]))
        setProfileImage({
          imageUrl: URL.createObjectURL(files[0]),
          image: files[0],
        });
      else
        toast.error(
          global.translate(
            'Please, choose a image for the profile picture',
          ),
        );
    }
  };

  useEffect(() => {
    if (userData.data && profileImage.imageUrl === '') {
      setProfileImage({
        ...profileImage,
        imageUrl: userData.data?.PictureURL,
      });
    }
  }, [userData]);

  useEffect(() => {
    if (profileImage.imageUrl && profileImage.image) {
      uploadProfileImage();
    }
  }, [profileImage]);

  return {
    profileImage,
    onImageChange,
    profileImageState,
  };
};
