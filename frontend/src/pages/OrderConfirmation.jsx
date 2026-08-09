import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getErrorMessage } from "../api/client.js";
import { getOrder } from "../api/visaPacks.js";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Loading from "../components/Loading.jsx";

const currencyFormat = (amount, currency) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getOrder(orderId)
      .then(setOrder)
      .catch((err) => setError(getErrorMessage(err)));
  }, [orderId]);

  if (error) return <ErrorMessage message={error} />;
  if (!order) return <Loading label="Loading your order..." />;

  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 py-16 text-center">
      <p className="text-5xl">🎉</p>
      <h1 className="mt-4 text-3xl font-extrabold text-slate-900">You're all set, {order.customerName.split(" ")[0]}!</h1>
      <p className="mt-2 text-slate-600">
        Your {order.package.name} package for{" "}
        <strong>
          {order.package.visaType.country.flagEmoji} {order.package.visaType.name}
        </strong>{" "}
        is confirmed. We've sent details to <strong>{order.email}</strong>.
      </p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Order number</span>
          <span className="font-mono font-semibold text-slate-900">{order.orderNumber}</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-slate-500">Status</span>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
            {order.status}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-slate-500">Amount</span>
          <span className="font-semibold text-slate-900">
            {currencyFormat(order.amount, order.currency)}
          </span>
        </div>
      </div>

      <Link
        to="/"
        className="mt-8 inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
      >
        Browse more destinations
      </Link>
    </div>
  );
}
