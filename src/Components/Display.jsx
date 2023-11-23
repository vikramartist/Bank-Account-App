/* eslint-disable react/prop-types */
export default function Display({ balance, loan }) {
  return (
    <div className="lg:w-[35%] md:w-[50%] sm:w-full h-[8rem] flex flex-col justify-around items-center">
      <h1 className="text-4xl">Bank Account</h1>
      <section className="flex flex-col font-serif">
        <span>Balance: {balance}</span>
        <span>Loan: {loan}</span>
      </section>
    </div>
  );
}
