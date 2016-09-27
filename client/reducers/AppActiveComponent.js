const ActiveComponentStore = (state = { parent:null, child:null }, action) => {
  switch (action.type) {
    case 'ACTIVE_COMPONENT_SET_ITEM':
      return Object.assign({}, action.payload); break;

    case 'ACTIVE_COMPONENT_SET_PARENT':
      return { ...state, parent: action.payload, child: null };

    case 'ACTIVE_COMPONENT_SET_CHILD':
      return { ...state, child: action.payload };

    default:
      return state;
  }
}

export default ActiveComponentStore
