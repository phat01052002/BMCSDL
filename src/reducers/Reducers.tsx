const initialState = {
  user: undefined
};

const myReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'CHANGE_USER':
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
};
export default myReducer;
export { initialState };
