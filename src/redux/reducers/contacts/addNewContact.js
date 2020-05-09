import {
  ADD_NEW_CONTACT_ERROR,
  ADD_NEW_CONTACT_SUCCESS,
  ADD_NEW_CONTACT_START,
} from 'constants/action-types/contacts';

export default (state, { type, payload }) => {
  switch (type) {
    case ADD_NEW_CONTACT_START:
      return {
        ...state,
        newContact: {
          ...state.newContact,
          loading: true,
          error: null,
        },
      };

    case ADD_NEW_CONTACT_SUCCESS:
      if (payload.endpoint === '/AddToContact') {
        if (payload.type === 'isEditing') {
          return {
            ...state,
            newContact: {
              ...state.newContact,
              data: payload.data,
              loading: false,
              success: true,
            },
            allContacts: {
              ...state.allContacts,
              updated: true,
            },
          };
        }

        return {
          ...state,
          newContact: {
            ...state.newContact,
            data: payload.data,
            loading: false,
            success: true,
          },

          allContacts: {
            ...state.allContacts,
            data: [...state.allContacts.data, payload.data[0]],
          },
        };
      }
      if (payload.type === 'isEditingExternal') {
        return {
          ...state,
          newContact: {
            ...state.newContact,
            data: payload.data,
            loading: false,
            success: true,
          },
          externalContacts: {
            ...state.externalContacts,
            data: state.externalContacts.data.map(person =>
              person.PhoneNumber === payload.contact.PhoneNumber
                ? payload.contact
                : person,
            ),
          },
          activeContacts: {
            ...state.activeContacts,
            data: state.activeContacts.data
              .filter(item => item !== null)
              .map(person =>
                person.DestPhoneNum === payload.contact.PhoneNumber
                  ? payload.contact
                  : person,
              ),
          },
        };
      }

      return {
        ...state,
        newContact: {
          ...state.newContact,
          data: payload.data,
          loading: false,
          success: true,
        },
        activeContacts: {
          ...state.activeContacts,
          data: [payload.contact, ...state.activeContacts.data],
        },
        externalContacts: {
          ...state.externalContacts,
          data: [...state.externalContacts.data, payload.contact],
        },
      };
    case ADD_NEW_CONTACT_ERROR:
      return {
        ...state,
        newContact: {
          ...state.newContact,
          error: payload,
          loading: false,
        },
      };
    default:
      return null;
  }
};