import { useEffect, useMemo, useRef, useState } from "react";
import Nav from "../components/Nav.jsx";
import { api } from "../lib/api.js";
import { io } from "socket.io-client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import QRCode from "react-qr-code";
import { FaBox, FaClock, FaLocationDot, FaTruckFast, FaMapPin, FaEnvelope, FaWeightHanging, FaUser, FaBuilding } from "react-icons/fa6";


// Custom marker icon for realism
const markerIcon = new L.Icon({
  iconUrl: "https://i.pinimg.com/1200x/c2/e3/aa/c2e3aa3a6acbbfef1ab09d62e0859479.jpg",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -36],
});

const socket = io(import.meta.env.VITE_API_BASE || "https://locatepro-back.onrender.com");

// Emojis for icons as requested
const emojiMap = {
  from: "🛫", // Departure
  to: "🛬",   // Arrival
  status: "📦", // Box
  location: "📍", // Pin
  eta: "⏰",   // Clock
  freightType: "🚛", // Truck
  sender: "🧑",   // User
  product: "🎁",  // Gift
};

export default function Track() {
  const [trackingId, setTrackingId] = useState("");
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [joining, setJoining] = useState(false);

  // Map refs
  const mapNodeRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Derived
  const progress = useMemo(
    () => Math.min(100, Math.max(0, Number(shipment?.progress ?? 0))),
    [shipment]
  );

  // Parse "lat,lng" into [lat,lng] or null
  const parseLatLng = (str) => {
    if (!str || typeof str !== "string") return null;
    const parts = str.split(",").map((x) => Number(x.trim()));
    if (parts.length === 2 && parts.every((n) => Number.isFinite(n))) {
      return parts;
    }
    return null;
  };

  // Fetch shipment
  const fetchShipment = async (id) => {
    if (!id) return;
    setLoading(true);
    setError("");
    setShipment(null);
    try {
      const { data } = await api.get(`/shipments/${id}`);
      setShipment(data);
      setError("");
      if (!joining) {
        socket.emit("join", { trackingId: id });
        setJoining(true);
      }
    } catch (e) {
      setShipment(null);
      setError("Tracking number not found. Please check and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Socket updates
  useEffect(() => {
    const handler = (payload) => {
      if (payload?.trackingId && shipment?.trackingId === payload.trackingId) {
        setShipment((prev) => (prev ? { ...prev, ...payload.data } : prev));
      }
    };
    socket.on("shipment:update", handler);
    return () => socket.off("shipment:update", handler);
  }, [shipment?.trackingId]);

  // Initialize / update map
  useEffect(() => {
    const coords = parseLatLng(shipment?.currentLocation);
    if (!mapNodeRef.current) return;

    // Create map once
    if (!mapRef.current) {
      mapRef.current = L.map(mapNodeRef.current, {
        zoomControl: true,
        attributionControl: false,
        scrollWheelZoom: false,
        dragging: true,
      }).setView(coords || [20, 0], coords ? 6 : 2);

      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    // Update view + marker when shipment changes
    if (coords && mapRef.current) {
      mapRef.current.setView(coords, 7, { animate: true });

      if (!markerRef.current) {
        markerRef.current = L.marker(coords, { icon: markerIcon }).addTo(mapRef.current);
      } else {
        markerRef.current.setLatLng(coords);
      }
      markerRef.current.bindPopup(
        `<b>${shipment?.status || "In Transit"}</b><br/>${shipment?.currentLocation}`
      );
    }
  }, [shipment?.currentLocation, shipment?.status]);

  // Cleanup map on unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Print function
  const printReceipt = () => {
    window.print();
  };

  // UI helpers
  const Field = ({ label, value, emoji }) => (
    <div className="flex items-center gap-2 text-base text-gray-700">
      <span className="text-xl">{emoji}</span>
      <span className="font-semibold">{label}:</span>
      <span className="text-gray-800">{value || "—"}</span>
    </div>
  );

  // Professional receipt layout for printing (Hidden by default)
  const Receipt = () => (
    <div className="receipt-print w-[210mm] min-h-[297mm] p-10 bg-white text-gray-800 mx-auto font-sans">
      <div className="receipt-header flex items-center justify-between border-b-2 border-slate-300 pb-4 mb-8">
        <div className="flex items-center gap-4">
          <img
            src="https://i.pinimg.com/736x/2d/d8/ca/2dd8ca4f2d23619e6bcfd845e207d16b.jpg"
            alt="LocatePro Logo"
            className="h-16"
          />
          <div>
            <h2 className="text-3xl font-bold text-[#0057ff]">LocatePro Logistics</h2>
            <p className="text-sm text-gray-500">
              Your Reliable Logistics Partner | www.locatepro.com
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="p-2 border border-gray-200">
            <QRCode value={shipment?.trackingId || ""} size={96} />
          </div>
          <span className="text-sm text-gray-600 mt-2">Scan to track</span>
        </div>
      </div>

      <div className="receipt-body grid grid-cols-2 gap-8 text-sm mb-8">
        <div>
          <h3 className="text-lg font-bold text-gray-700 mb-2 border-b border-gray-200 pb-1">Shipment Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center"><span className="text-gray-500 font-semibold">Tracking ID:</span> <span className="font-bold text-lg text-[#0057ff]">{shipment?.trackingId}</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-500">Status:</span> <span className="font-medium text-gray-800">{shipment?.status}</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-500">From:</span> <span className="font-medium">{shipment?.origin}</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-500">To:</span> <span className="font-medium">{shipment?.destination}</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-500">Freight Type:</span> <span className="font-medium">{shipment?.freightType}</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-500">ETA:</span> <span className="font-medium">{shipment?.eta}</span></div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-gray-700 mb-2 border-b border-gray-200 pb-1">Sender & Recipient</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center"><span className="text-gray-500">Sender:</span> <span className="font-medium">{shipment?.sender}</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-500">Recipient:</span> <span className="font-medium">{shipment?.recipient || "N/A"}</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-500">Product:</span> <span className="font-medium">{shipment?.product}</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-500">Amount:</span> <span className="font-medium">{shipment?.amount ? `$${shipment.amount}` : "N/A"}</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-500">Payment:</span> <span className="font-medium">{shipment?.paid ? "Paid" : "Unpaid"}</span></div>
          </div>
        </div>
      </div>

      <div className="receipt-history border-t-2 border-slate-300 pt-4 mb-8">
        <h4 className="text-xl font-bold text-gray-700 mb-4">Tracking History</h4>
        <ul className="space-y-3 text-sm">
          {(shipment?.events || []).map((e, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-gray-500 w-24 flex-shrink-0">{new Date(e.time).toLocaleDateString()}:</span>
              <span className="font-semibold text-gray-800">{e.text}</span>
              {e.location && <span className="text-gray-500">({e.location})</span>}
            </li>
          ))}
        </ul>
      </div>

      <div className="receipt-footer border-t-2 border-slate-300 pt-4 flex justify-between items-center text-xs text-gray-500">
        <div>
          <p>Thank you for choosing LocatePro for your logistics needs!</p>
          <p className="mt-1">This receipt is auto-generated on {new Date().toLocaleDateString()}.</p>
        </div>
        {shipment?.status === "Delivered" && (
          <div className="flex items-center gap-2">
            <img src="https://i.pinimg.com/736x/55/dc/f7/55dcf734bd22f4277d10444622b2b825.jpg" alt="Delivered" className="h-8" />
            <span className="text-green-600 font-bold text-xl">DELIVERED</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="track-page relative min-h-screen font-sans bg-gray-100/90 backdrop-blur-md overflow-hidden">
      {/* Background particles from Home.jsx */}
      <div className="fixed inset-0 z-0 opacity-80" aria-hidden="true">
        <div id="particle-container" className="absolute inset-0"></div>
      </div>
      <style>
        {`
          /* Custom print styles */
          @media print {
            body > :not(.print-container) {
              display: none !important;
            }
            .print-container {
              display: block !important;
              width: 100vw;
              min-height: 100vh;
              background-color: #fff;
              color: #000;
              margin: 0;
              padding: 0;
            }
            .receipt-print {
              box-shadow: none !important;
              max-width: none;
              border: none;
            }
          }

          /* Match Index.css styling */
          .glass-card {
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .btn {
            background-image: linear-gradient(135deg, #0057ff, #00eaff);
            color: white;
            padding: 0.75rem 2rem;
            border-radius: 9999px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 87, 255, 0.2);
          }
          .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0, 87, 255, 0.3);
          }
        `}
      </style>
      <Nav />
      {/* Print overlay, only visible in print mode */}
      {shipment && (
        <div className="fixed inset-0 z-50 hidden print:block">
          <div className="print-container">
            <Receipt />
          </div>
        </div>
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-10 pt-24 md:pt-32 no-print">
        <header className="text-center mb-12">
          <img
            src="https://i.pinimg.com/736x/2d/d8/ca/2dd8ca4f2d23619e6bcfd845e207d16b.jpg"
            alt="LocatePro Logo"
            className="mx-auto mb-4 h-20 animate-pulse"
          />
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0057ff] to-[#00eaff] tracking-tight drop-shadow-lg">
            LocatePro Tracking
          </h1>
          <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
            Get instant, real-time updates on your shipment's journey with our intuitive tracking system.
          </p>
        </header>

        {/* Search */}
        <div className="glass-card max-w-3xl mx-auto p-6 md:p-8 mb-12">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (trackingId.trim()) fetchShipment(trackingId.trim());
            }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <input
              className="w-full px-6 py-4 rounded-full bg-white/70 border-2 border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0057ff] text-lg shadow-inner transition-all duration-300"
              placeholder="Enter Tracking ID (e.g., LPL-2001)"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              disabled={loading}
            />
            <button
              className="btn px-10 py-4 min-w-[150px] transform hover:scale-105"
              disabled={loading}
            >
              {loading ? "Tracking..." : "Track Now"}
            </button>
          </form>
        </div>

         {/* Contact Form */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="glass-card bg-white/70 backdrop-blur-md p-8 shadow-xl"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">Your Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                          placeholder="Full Name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">Your Email</label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                          placeholder="Email Address"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1">Message</label>
                        <textarea
                          className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                          placeholder="Type your message here..."
                          rows={4}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn w-full px-5 py-3 text-lg"
                      >
                        Send Message
                      </button>
                    </form>
                  </motion.div>

        {error && (
          <div className="mb-8 text-center text-red-600 font-medium bg-red-100 p-5 rounded-2xl border border-red-300 animate-fade-in">{error}</div>
        )}

        {/* Empty state */}
        {!shipment && !loading && !error && (
          <div className="text-center text-gray-400 py-24 opacity-70 animate-pulse">
            <img
                src="https://i.pinimg.com/1200x/39/2a/26/392a261b73dbcd361a0dac2e93a05284.jpg"
                alt="Empty State"
                className="h-20 w-20 mx-auto mb-4"
              />
            <p className="text-xl">Your journey to a better logistics experience begins here.</p>
          </div>
        )}

        {/* Results */}
        {shipment && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: details + history */}
            <div className="space-y-8 animate-fade-in">
              {/* Card: Overview */}
              <div className="glass-card p-6 md:p-10 relative">
                <div className="flex items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-[#0057ff] flex items-center gap-2">
                      <FaBox className="text-3xl text-[#00eaff]" />
                      Shipment Details
                    </h2>
                    <p className="text-gray-500 text-sm mt-2">
                      Tracking ID: <span className="text-gray-800 font-mono font-semibold">{shipment.trackingId}</span>
                    </p>
                  </div>
                  <button
                    onClick={printReceipt}
                    className="btn btn-sm"
                    title="Print receipt"
                  >
                    Print Receipt
                  </button>
                </div>
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-500 font-medium">Progress</span>
                    <span className="text-[#0057ff] font-bold text-xl">{progress}%</span>
                  </div>
                  <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#0057ff] to-[#00eaff] transition-all duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                  <Field label="From" value={shipment.origin} emoji={emojiMap.from} />
                  <Field label="To" value={shipment.destination} emoji={emojiMap.to} />
                  <Field label="Status" value={shipment.status} emoji={emojiMap.status} />
                  <Field label="Current Location" value={shipment.currentLocation} emoji={emojiMap.location} />
                  <Field label="ETA" value={shipment.eta} emoji={emojiMap.eta} />
                  <Field label="Freight Type" value={shipment.freightType} emoji={emojiMap.freightType} />
                  <Field label="Sender" value={shipment.sender} emoji={emojiMap.sender} />
                  <Field label="Product" value={shipment.product} emoji={emojiMap.product} />
                </div>
              </div>

              {/* Card: History */}
              <div className="glass-card p-6 md:p-10">
                <h3 className="text-xl font-bold text-[#0057ff] mb-6 flex items-center gap-2">
                  <FaTruckFast className="text-3xl text-[#00eaff]" />
                  Tracking History
                </h3>
                {(shipment.events || []).length === 0 ? (
                  <p className="text-gray-500">No history yet.</p>
                ) : (
                  <ul className="space-y-6 max-h-96 overflow-y-auto pr-3">
                    {shipment.events.map((e, i) => (
                      <li
                        key={i}
                        className="relative flex items-center pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-gray-300 last:before:h-0"
                      >
                        <div className="absolute left-[-6px] top-0 w-3 h-3 rounded-full bg-[#0057ff] shadow-md"></div>
                        <div className="ml-4">
                          <p className="text-gray-800 font-medium">{e.text}</p>
                          <p className="text-gray-500 text-sm mt-1">
                            {new Date(e.time).toLocaleString()} — <span className="font-semibold">{e.location || "—"}</span>
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Right: Map */}
            <div className="glass-card p-6 md:p-10 flex flex-col animate-fade-in">
              <h3 className="text-xl font-bold text-[#0057ff] mb-4 flex items-center gap-2">
                <FaMapPin className="text-3xl text-[#00eaff]" />
                Real-Time Map View
              </h3>
              <div
                ref={mapNodeRef}
                className="flex-grow rounded-2xl overflow-hidden border border-gray-200"
              />
              <p className="text-gray-500 text-xs mt-4">
                Map data is provided by OpenStreetMap. Live tracking requires a valid `currentLocation`.
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
