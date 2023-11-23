/* eslint-disable react/prop-types */

import Service from "./Service";

export default function Services({
  dispatch,
  isActive,
  add,
  remove,
  balance,
  loan,
  request,
  payloan,
}) {
  const isEnoughMoneyToClearLoan = balance >= payloan;
  return (
    <div className="lg:w-[40%] md:w-[60%] sm:w-[90%] ssm:w-[95%] h-[55%] p-2 bg-slate-400 flex flex-col justify-center items-center gap-4 rounded-md">
      <Service>
        <button
          className={isActive ? "disabled" : "service-button"}
          disabled={isActive}
          onClick={() => dispatch({ type: "openAccount" })}
        >
          <p>Open New Account</p>
        </button>
      </Service>

      {isActive && (
        <>
          <Service>
            <label htmlFor="depo-money" className=" text-sm">
              Amount
            </label>
            <input
              type="text"
              name="amount"
              id="depo-money"
              className="rounded-lg w-[40%] border-none"
              value={add}
              onChange={(e) =>
                dispatch({ type: "addAmount", payload: Number(e.target.value) })
              }
            />
            <button
              className="service-button"
              onClick={() => dispatch({ type: "deposit" })}
            >
              <p>Deposit</p>
            </button>
          </Service>
          <Service>
            <label htmlFor="rem-money" className=" text-sm">
              Amount
            </label>
            <input
              type="text"
              name="amount"
              id="rem-money"
              className="rounded-lg w-[40%] border-none"
              value={remove}
              onChange={(e) =>
                dispatch({
                  type: "removeAmount",
                  payload: Number(e.target.value),
                })
              }
            />
            <button
              className="service-button"
              disabled={balance < 0 || remove > balance}
              onClick={() => dispatch({ type: "withdraw" })}
            >
              <p>WithDraw</p>
            </button>
          </Service>
          <Service>
            <label htmlFor="loan-money" className=" text-sm">
              Amount
            </label>
            <input
              type="text"
              name="amount"
              id="loan-money"
              className="rounded-lg w-[40%] border-none"
              value={loan}
              disabled={request === 0 && payloan > 0}
              onChange={(e) =>
                dispatch({
                  type: "loanAmount",
                  payload: Number(e.target.value),
                })
              }
            />
            <button
              className="service-button"
              disabled={request === 0 && payloan !== 0}
              onClick={() => dispatch({ type: "loan" })}
            >
              <p>Request A Loan</p>
            </button>
          </Service>
          <Service>
            <button
              className="service-button"
              onClick={() =>
                dispatch({ type: "payLoan", payload: isEnoughMoneyToClearLoan })
              }
              disabled={loan === 0}
            >
              <p>Pay Loan</p>
            </button>
          </Service>
          <Service>
            <button
              className="service-button"
              disabled={!isActive}
              onClick={() => dispatch({ type: "closeAccount" })}
            >
              <p>Close Account</p>
            </button>
          </Service>
        </>
      )}
    </div>
  );
}
