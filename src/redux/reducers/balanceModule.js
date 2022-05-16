const INIT_STATE = {
  balance: [],
  total: "",
};

export const balanceReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_BALANCE":
      return {
        ...state,
        balance: [...state.balance, action.payload],
      };
    case "TOTAL":
      return {
        ...state,
        total: action.payload,
      };
    case "REDUCEBALANCE":
      return {
        ...state,
        total: Number(state.total) - action.payload,
      };

    default:
      return state;
  }
};
