import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getErrorMessage, resolveFileUrl } from "../api/client.js";
import { getOrder } from "../api/visaPacks.js";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Flag from "../components/Flag.jsx";
import Loading from "../components/Loading.jsx";
import Reveal from "../components/Reveal.jsx";
import { formatCurrency } from "../lib/currency.js";

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
    <div className="mx-auto max-w-xl px-4 sm:px-6 py-20 text-center">
      <Reveal>
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brass text-ink">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h1 className="font-display mt-6 text-3xl sm:text-4xl font-extrabold tracking-tight text-ink">
          You're all set, {order.customerName.split(" ")[0]}!
        </h1>
        <p className="mt-3 text-stone">
          Your {order.package.name} package for{" "}
          <strong className="text-ink">
            <Flag code={order.package.visaType.country.code} /> {order.package.visaType.name}
          </strong>{" "}
          is confirmed. We've sent details to <strong className="text-ink">{order.email}</strong>.
        </p>
      </Reveal>

      <Reveal delay={100} className="mt-10 rounded-[28px] border border-hairline bg-ivory p-6 text-left shadow-card">
        <div className="flex items-center justify-between text-sm">
          <span className="text-stone">Order number</span>
          <span className="font-mono font-semibold text-ink">{order.orderNumber}</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-stone">Status</span>
          <span className="rounded-full bg-petrol px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink">
            {order.status}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-stone">Amount</span>
          <span className="font-semibold text-ink">
            {formatCurrency(order.amount, order.currency)}
          </span>
        </div>
      </Reveal>

      {order.package.documents?.length > 0 && (
        <Reveal delay={130} className="mt-6 rounded-[28px] border border-hairline bg-ivory p-6 text-left shadow-card">
          <p className="text-xs font-bold uppercase tracking-wide text-stone">Your documents</p>
          <ul className="mt-4 space-y-3">
            {order.package.documents.map((doc) => (
              <li key={doc.id}>
                <a
                  href={resolveFileUrl(doc.fileUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-hairline p-3 text-sm transition-all duration-200 hover:border-ink hover:shadow-card-hover"
                >
                  <span>
                    <span className="block font-medium text-ink">{doc.title}</span>
                    {doc.description && (
                      <span className="mt-0.5 block text-xs text-stone">{doc.description}</span>
                    )}
                  </span>
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-stone group-hover:opacity-60">
                    {doc.fileType} ↓
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      <Reveal delay={160}>
        <Link
          to="/"
          className="mt-10 inline-block rounded-full bg-ink px-6 py-3 text-sm font-bold text-ivory transition-all duration-200 hover:bg-brass hover:text-ink hover:scale-[1.02]"
        >
          Browse more destinations
        </Link>
      </Reveal>
    </div>
  );
}
