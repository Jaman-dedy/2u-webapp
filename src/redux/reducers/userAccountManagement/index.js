import initialState from 'redux/initial-states/userAccountManagement';
import saveUserDataReducer from './saveUserData';
import updateUserPhoneListReducer from './updateUserPhoneList';
import updateUserEmailListReducer from './updateUserEmailList';
import updateSecurityQuestionsReducer from './updateSecurityQuestions';
import updatePasswordReducer from './updatePassword';
import updatePINReducer from './updatePIN';
import updateDOBReducer from './updateDOB';
import updateGenderReducer from './updateGender';
import switchUserAccount from './switchUserAccount';
import getBusinessType from './getBusinessType';
import deletePhoneReducer from './deletePhone';

export default (state = initialState, action = {}) => ({
  ...state,
  ...saveUserDataReducer(state, action),
  ...updateUserPhoneListReducer(state, action),
  ...updateUserEmailListReducer(state, action),
  ...updateSecurityQuestionsReducer(state, action),
  ...updatePINReducer(state, action),
  ...updatePasswordReducer(state, action),
  ...updateDOBReducer(state, action),
  ...updateGenderReducer(state, action),
  ...switchUserAccount(state, action),
  ...getBusinessType(state, action),
  ...deletePhoneReducer(state, action),
});
