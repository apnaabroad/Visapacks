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
        <p className="text-5xl">🎉</p>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-ink">
          You're all set, {order.customerName.split(" ")[0]}!
        </h1>
        <p className="mt-3 text-warm-gray">
          Your {order.package.name} package for{" "}
          <strong className="text-ink">
            <Flag code={order.package.visaType.country.code} /> {order.package.visaType.name}
          </strong>{" "}
          is confirmed. We've sent details to <strong className="text-ink">{order.email}</strong>.
        </p>
      </Reveal>

      <Reveal delay={100} className="mt-10 border border-hairline bg-ivory p-6 text-left shadow-card">
        <div className="flex items-center justify-between text-sm">
          <span className="text-warm-gray">Order number</span>
          <span className="font-mono font-semibold text-ink">{order.orderNumber}</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-warm-gray">Status</span>
          <span className="border border-hairline px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-ink">
            {order.status}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-warm-gray">Amount</span>
          <span className="font-semibold text-ink">
            {formatCurrency(order.amount, order.currency)}
          </span>
        </div>
      </Reveal>

      {order.package.documents?.length > 0 && (
        <Reveal delay={130} className="mt-6 border border-hairline bg-ivory p-6 text-left shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wide text-warm-gray">Your documents</p>
          <ul className="mt-4 space-y-3">
            {order.package.documents.map((doc) => (
              <li key={doc.id}>
                <a
                  href={resolveFileUrl(doc.fileUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 border border-hairline p-3 text-sm transition-all duration-200 hover:border-ink hover:shadow-card-hover"
                >
                  <span>
                    <span className="block font-medium text-ink">{doc.title}</span>
                    {doc.description && (
                      <span className="mt-0.5 block text-xs text-warm-gray">{doc.description}</span>
                    )}
                  </span>
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-warm-gray group-hover:text-burgundy">
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
          className="mt-10 inline-block bg-ink px-5 py-2.5 text-sm font-semibold text-ivory transition-all duration-200 hover:bg-burgundy hover:scale-[1.02] hover:shadow-lg"
        >
          Browse more destinations
        </Link>
      </Reveal>
    </div>
  );
}
