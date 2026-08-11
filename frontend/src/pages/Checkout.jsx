import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getErrorMessage } from "../api/client.js";
import { createOrder, getPackage } from "../api/visaPacks.js";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Flag from "../components/Flag.jsx";
import Loading from "../components/Loading.jsx";
import Reveal from "../components/Reveal.jsx";
import { formatCurrency } from "../lib/currency.js";

const emptyForm = { customerName: "", email: "", phone: "", travelDate: "", notes: "" };

export default function Checkout() {
  const { packageId } = useParams();
  const navigate = useNavigate();

  const [pkg, setPkg] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitError, setSubmitError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getPackage(packageId)
      .then(setPkg)
      .catch((err) => setLoadError(getErrorMessage(err)));
  }, [packageId]);

  if (loadError) return <ErrorMessage message={loadError} />;
  if (!pkg) return <Loading label="Loading package..." />;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError(null);
    setSubmitting(true);
    try {
      const order = await createOrder({ packageId: pkg.id, ...form });
      navigate(`/order-confirmation/${order.id}`);
    } catch (err) {
      setSubmitError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-14">
      <Link
        to={`/countries/${pkg.visaType.country.slug}/${pkg.visaType.slug}`}
        className="text-sm text-ink hover:text-burgundy font-medium transition-colors duration-200"
      >
        ← Back to packages
      </Link>

      <Reveal as="h1" className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-ink">
        Checkout
      </Reveal>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-8">
        <Reveal
          as="form"
          onSubmit={handleSubmit}
          className="md:col-span-3 space-y-5 border border-hairline bg-ivory p-6 sm:p-8 shadow-card"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full name" name="customerName" required value={form.customerName} onChange={handleChange} />
            <Field
              label="Email address"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Phone (optional)" name="phone" value={form.phone} onChange={handleChange} />
            <Field
              label="Planned travel date (optional)"
              name="travelDate"
              type="date"
              value={form.travelDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">
              Anything we should know? (optional)
            </label>
            <textarea
              name="notes"
              rows={4}
              value={form.notes}
              onChange={handleChange}
              className="w-full border border-hairline px-3 py-2 text-sm transition-all duration-200 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink"
              placeholder="E.g. previous visa refusals, tight travel dates, dependents on the application..."
            />
          </div>

          {submitError && <p className="text-sm text-burgundy">{submitError}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-ink px-4 py-3 text-sm font-semibold text-ivory transition-all duration-200 hover:bg-burgundy hover:scale-[1.02] hover:shadow-lg disabled:opacity-60 disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            {submitting ? "Placing order..." : `Confirm purchase - ${formatCurrency(pkg.price, pkg.currency)}`}
          </button>
          <p className="text-xs text-warm-gray text-center">
            This is a demo checkout. No payment is collected; a payment provider can be
            plugged into the backend order flow later.
          </p>
        </Reveal>

        <Reveal as="aside" delay={80} className="md:col-span-2 h-fit border border-hairline bg-ivory p-6 shadow-card">
          <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-warm-gray">
            <Flag code={pkg.visaType.country.code} />
            {pkg.visaType.country.name}
          </p>
          <h2 className="mt-1 font-semibold tracking-tight text-ink">{pkg.visaType.name}</h2>
          <div className="mt-4 flex items-center justify-between border-t border-hairline pt-4">
            <span className="text-sm text-warm-gray">{pkg.name} package</span>
            <span className="font-bold text-ink">{formatCurrency(pkg.price, pkg.currency)}</span>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-ink">
            {pkg.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="text-warm-gray">—</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", required, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink mb-1">
        {label} {required && <span className="text-burgundy">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full border border-hairline px-3 py-2 text-sm transition-all duration-200 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink"
      />
    </div>
  );
}
