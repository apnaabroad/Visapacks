import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import Checkout from "./pages/Checkout.jsx";
import CountryDetail from "./pages/CountryDetail.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import VisaTypeDetail from "./pages/VisaTypeDetail.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countries/:countrySlug" element={<CountryDetail />} />
          <Route path="/countries/:countrySlug/:visaTypeSlug" element={<VisaTypeDetail />} />
          <Route path="/checkout/:packageId" element={<Checkout />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
