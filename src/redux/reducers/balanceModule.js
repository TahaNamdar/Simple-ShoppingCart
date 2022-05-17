const INIT_STATE = {
  balance: [],
};

export const balanceReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_BALANCE":
      return {
        ...state,
        balance: [
          ...state.balance,
          { value: action.payload, createdAt: Date.now(), status: "payment" },
        ],
      };

    case "REDUCEBALANCE":
      return {
        ...state,
        balance: [
          ...state.balance,
          { value: action.payload, createdAt: Date.now(), status: "withDraw" },
        ],
      };

    default:
      return state;
  }
};
