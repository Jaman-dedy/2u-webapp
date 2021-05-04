import initialState from 'redux/initial-states/remindUsername';
import remindUsername from './remindUsername';

export default (state = initialState, action = {}) => ({
  ...state,
  ...remindUsername(state, action),
});
