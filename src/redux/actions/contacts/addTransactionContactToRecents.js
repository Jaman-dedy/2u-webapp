import { ADD_CONTACT_TO_RECENTS } from 'constants/action-types/contacts/getLastActiveContacts';

export default data => dispatch => {
  return dispatch({
    type: ADD_CONTACT_TO_RECENTS,
    payload: data,
  });
};
