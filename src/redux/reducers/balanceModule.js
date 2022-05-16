const INIT_STATE = {
  balance: [],
  total: [],
};

export const balanceReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_BALANCE":
      return {
        ...state,
        balance: [
          ...state.balance,
          { value: action.payload, createdAt: Date.now() },
        ],
      };
    case "TOTAL":
      return {
        ...state,
        total: action.payload,
      };
    case "REDUCEBALANCE":
      const total = Number(state.total) - action.payload;

      return {
        ...state,
        balance: [{ value: total, createdAt: Date.now() }],
      };

    default:
      return state;
  }
};
