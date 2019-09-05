const initialState = {
    modalVisible: false,
    modalProps: {}
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        modalVisible: true,
        modalProps: action.modalProps
      }
    case 'HIDE_MODAL':
      return {
        ...state,
        modalVisible: false
      }
    default:
      return state
  }
}

export default modalReducer;