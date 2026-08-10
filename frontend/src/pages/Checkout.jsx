import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getErrorMessage } from "../api/client.js";
import { createOrder, getPackage } from "../api/visaPacks.js";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Loading from "../components/Loading.jsx";

const currencyFormat = (amount, currency) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);

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
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <Link
        to={`/countries/${pkg.visaType.country.slug}/${pkg.visaType.slug}`}
        className="text-sm text-ink hover:text-burgundy font-medium transition-colors"
      >
        ← Back to packages
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink">Checkout</h1>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-8">
        <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5">
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
              className="w-full border border-hairline px-3 py-2 text-sm focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink"
              placeholder="E.g. previous visa refusals, tight travel dates, dependents on the application..."
            />
          </div>

          {submitError && <p className="text-sm text-burgundy">{submitError}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-ink px-4 py-3 text-sm font-semibold text-ivory hover:bg-burgundy disabled:opacity-60 transition-colors"
          >
            {submitting ? "Placing order..." : `Confirm purchase - ${currencyFormat(pkg.price, pkg.currency)}`}
          </button>
          <p className="text-xs text-warm-gray text-center">
            This is a demo checkout. No payment is collected; a payment provider can be
            plugged into the backend order flow later.
          </p>
        </form>

        <aside className="md:col-span-2 h-fit border border-hairline p-6">
          <p className="text-xs font-medium uppercase tracking-wide text-warm-gray">
            {pkg.visaType.country.flagEmoji} {pkg.visaType.country.name}
          </p>
          <h2 className="mt-1 font-semibold tracking-tight text-ink">{pkg.visaType.name}</h2>
          <div className="mt-4 flex items-center justify-between border-t border-hairline pt-4">
            <span className="text-sm text-warm-gray">{pkg.name} package</span>
            <span className="font-bold text-ink">{currencyFormat(pkg.price, pkg.currency)}</span>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-ink">
            {pkg.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="text-warm-gray">—</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </aside>
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
        className="w-full border border-hairline px-3 py-2 text-sm focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink"
      />
    </div>
  );
}
