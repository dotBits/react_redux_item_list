import Api from '../api/Users'
import Notie from 'notie'

export const initReducer = () => { return { type: 'ACTIVE_COMPONENT_SET_ITEM', payload: {parent: 'user_list'} } }

//------------------------------------------------------------------------------------------------------------------------
// ITEM SELECTION ACTIONS
//------------------------------------------------------------------------------------------------------------------------
export const setSelectionSingle = (id) => { return { type: 'USERS_LIST_SELECT_SINGLE', id } };
export const setSelectionBulk = (selectionType) => { return { type: 'USERS_LIST_SELECT_BULK', selectionType } };

//------------------------------------------------------------------------------------------------------------------------
// FILTER AND PAGINATION
//------------------------------------------------------------------------------------------------------------------------
export const setFilters = (filters) => {
  return dispatch => {
    dispatch({ type: 'USERS_LIST_SET_FILTERS', payload: filters });
    dispatch(loadItemList());
  }
};

export const resetFilters = () => { return dispatch => {
    dispatch({type: 'USERS_LIST_FILTERS_RESET'});
    dispatch(loadItemList());
  }
}

export const setPagination = (pagination) => {
  return dispatch => {
    dispatch({ type: 'USERS_LIST_SET_PAGINATION', payload: pagination });
    dispatch(loadItemList());
  }
};

//------------------------------------------------------------------------------------------------------------------------
// LOAD ITEM LIST
//------------------------------------------------------------------------------------------------------------------------
export const setItems = (xhrPayload) => { return { type: 'USERS_LOAD_LIST', data: xhrPayload } }
export const setIsLoadingStatus = (status) => { return { type: 'USERS_LOAD_SET_IS_LOADING_STATUS', payload: status } }
export const loadItemList = () => {
  return (dispatch, getState) => {
    const state = getState(),
          xhrFilterParams = {
            filters: state.user_list.filters,
            pagination: state.user_list.pagination
          };

    dispatch(setIsLoadingStatus(true));

    Api.getList(xhrFilterParams).then(response => {
      dispatch(setItems(response));
      dispatch(setIsLoadingStatus(false));
    }).catch(error => {
      console.error(error);
      dispatch(setIsLoadingStatus(false));
    });
  }
}


export const loadMore = () => {
  return (dispatch, getState) => {
    const state = getState();
    if(state.user_list.is_loading) { return }

    let pagination = Object.assign({}, state.user_list.pagination);
    if(pagination.matches < 1) { return }

    pagination.limit += pagination.loadMore;

    if(pagination.limit > pagination.matches)
      pagination.limit = pagination.matches;


    dispatch(setPagination(pagination));
  }
}

//------------------------------------------------------------------------------------------------------------------------
// CREATE NEW USER
//------------------------------------------------------------------------------------------------------------------------
export const createNewItem = () => {
  return (dispatch, getState) => {

    Api.createUser({user: {}}).then(response => {
      Notie.alert(1, response.message, 1.5);

    }).catch(error => {
      console.error(error);
      Notie.alert(3, error.message, 3);
    });
  }
}

//------------------------------------------------------------------------------------------------------------------------
// DELETE USER LIST
//------------------------------------------------------------------------------------------------------------------------
export const deleteItemList = (itemId) => {
  return (dispatch, getState) => {
    let gotItems = getState().user_list.items, i, idListToDelete = [];

    for(let i=0; i<gotItems.length; i++)
      if(gotItems[i]._checked === true)
        idListToDelete.push(gotItems[i].id);

    Api.deleteUserList({ids: idListToDelete}).then(response => {
      Notie.alert(1, response.message, 1.5);

    }).catch(error => {
      console.error(error);
      Notie.alert(3, error.message, 3);
      reject(error);
    });

  }
}

//------------------------------------------------------------------------------------------------------------------------
// LOAD USER ROLE OPTIONS
//------------------------------------------------------------------------------------------------------------------------
export const setOptionUserRoles = (xhrPayload) => { return { type: 'USERS_LIST_SET_OPTIONS_USER_ROLES', payload: xhrPayload } }
export const loadOptions_userRoles = () => {
  return (dispatch) => {

    Api.getUserRoleList({}).then(response => {
      let optionList = response.user_roles.map(function(item) {
        return {value: item.id, label: item.name};
      });

      dispatch(setOptionUserRoles(optionList));

    }).catch(error => {
      console.log(error);
    });
  }
}

//------------------------------------------------------------------------------------------------------------------------
// LOAD USER STATUS OPTIONS
//------------------------------------------------------------------------------------------------------------------------
export const setOptionUserStatus = (xhrPayload) => { return { type: 'USERS_LIST_SET_OPTIONS_USER_STATUS', payload: xhrPayload } }
export const loadOptions_userStatus = () => {
  return (dispatch) => {

    Api.getUserStatusList({}).then(response => {
      let optionList = response.user_status.map(function(item) {
        return {value: item.id, label: item.name};
      });

      dispatch(setOptionUserStatus(optionList));

    }).catch(error => {
      console.log(error);
    });
  }
}
