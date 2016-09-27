import { connect } from 'react-redux'
import * as Actions from '../../actions/UserList'
import List from './List'

const mapStateToProps = (state) => {
  return {
    list: state.user_list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadList: () => { dispatch(Actions.loadItemList()) },
    loadMore: () => { dispatch(Actions.loadMore()) },
    deleteItemList: () => { dispatch(Actions.deleteItemList()) },
    loadUserStatus: () => { dispatch(Actions.loadOptions_userStatus()) },
    loadUserRoles: () => { dispatch(Actions.loadOptions_userRoles()) },
    resetFilters: () => { dispatch(Actions.resetFilters()) },
    setSelectionSingle: (itemId) => { dispatch(Actions.setSelectionSingle(itemId)) },
    setSelectionBulk: (selectionType) => { dispatch(Actions.setSelectionBulk(selectionType)) },
    setFilters: (prmFilters) => { dispatch(Actions.setFilters(prmFilters)) },
    createNewItem: () => { dispatch(Actions.createNewItem()) },
    initReducer: () => { dispatch(Actions.initReducer()) },
  }
}

const ListRx = connect(
  mapStateToProps,
  mapDispatchToProps
)(List)

export default ListRx
