export const ADD = (item) => {
  return {
    type: "ADD_CART",
    payload: item,
  };
};

// remove iteams
export const DLT = (id) => {
  return {
    type: "RMV_CART",
    payload: id,
  };
};

// remove individual iteam

export const REMOVE = (iteam) => {
  return {
    type: "RMV_ONE",
    payload: iteam,
  };
};

export const ADDTOBALANCE = (item) => {
  return {
    type: "ADD_BALANCE",
    payload: item,
  };
};

export const TOTAL = (item) => {
  return {
    type: "TOTAL",
    payload: item,
  };
};

export const REDUCEBALANCE = (item) => {
  return {
    type: "REDUCEBALANCE",
    payload: item,
  };
};
