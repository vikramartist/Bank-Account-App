import { useReducer } from "react";
import Display from "./Components/Display";
import Services from "./Components/Services";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  depositAmount: 0,
  withdrawAmount: 0,
  loanAmount: 0,
  loanRequest: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      return { ...state, balance: 500, isActive: true };
    case "addAmount":
      return { ...state, depositAmount: action.payload };
    case "removeAmount":
      return { ...state, withdrawAmount: action.payload };
    case "loanAmount":
      return {
        ...state,
        loanAmount: action.payload,
      };
    case "deposit":
      return {
        ...state,
        balance: state.balance + state.depositAmount,
        isActive: true,
      };
    case "withdraw":
      return {
        ...state,
        balance:
          state.balance > 0
            ? state.balance - state.withdrawAmount
            : state.balance,
      };
    case "loan":
      return {
        ...state,

        loan:
          state.loanRequest === 1 ? state.loan + state.loanAmount : state.loan,
        balance:
          state.loanRequest === 1
            ? state.balance + state.loanAmount
            : state.balance,
        loanRequest: state.loanRequest - 1,
      };
    case "payLoan":
      return {
        ...state,
        balance: action.payload ? state.balance - state.loan : state.loan,
        loan: 0,
        loanRequest: 1,
      };
    case "closeAccount":
      return {
        ...initialState,
        isActive: false,
        loanRequest: 1,
        balance: 0,
        loan: 0,
        depositAmount: 0,
        loanAmount: 0,
        withdrawAmount: 0,
      };
    default:
      throw new Error("Unknown Action!!");
  }
}

function App() {
  const [
    {
      balance,
      loan,
      isActive,
      depositAmount,
      withdrawAmount,
      loanAmount,
      loanRequest,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  return (
    <div className="w-full h-[100vh] flex justify-center items-center flex-col">
      <Display balance={balance} loan={loan} />
      <Services
        dispatch={dispatch}
        isActive={isActive}
        add={depositAmount}
        remove={withdrawAmount}
        balance={balance}
        loan={loanAmount}
        request={loanRequest}
        payloan={loan}
      />
    </div>
  );
}

export default App;
