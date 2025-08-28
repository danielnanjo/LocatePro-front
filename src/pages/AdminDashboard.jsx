import { useEffect, useState, useRef } from 'react';
import Nav from '../components/Nav.jsx';
import { api, loadAuth } from '../lib/api.js';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  TruckIcon,
  PlusCircleIcon,
  MapPinIcon,
  Cog6ToothIcon,
  UsersIcon,
  PencilSquareIcon,
  TrashIcon,
  PrinterIcon,
} from '@heroicons/react/24/outline';

// Ensure the auth token is loaded on page load
loadAuth();

const TABS = [
  { key: 'dashboard', label: 'Dashboard', icon: ChartBarIcon },
  { key: 'shipments', label: 'Manage Shipments', icon: TruckIcon },
  { key: 'create', label: 'Create Shipment', icon: PlusCircleIcon },
  { key: 'map', label: 'Customize Map', icon: MapPinIcon },
  { key: 'settings', label: 'Settings', icon: Cog6ToothIcon },
  { key: 'admins', label: 'Admin Sessions', icon: UsersIcon },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState('dashboard');
  const [shipments, setShipments] = useState([]);
  const [form, setForm] = useState({
    trackingId: '',
    origin: '',
    destination: '',
    status: 'Pending',
    progress: 0,
    cost: '',
    bookingMode: '',
    freightType: '',
    sender: '',
    product: '',
    paymentMethod: '',
    photo: '',
  });
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState('');
  const [stats, setStats] = useState({ total: 0, delivered: 0, pending: 0, revenue: 0 });
  const [mapLocation, setMapLocation] = useState({ lat: '', lng: '' });
  const [admins, setAdmins] = useState([]);
  const [settings, setSettings] = useState({
    siteName: 'LocatePro',
    logo: '',
    freightTypes: ['Air', 'Road', 'Sea'],
    bookingModes: ['Express', 'Standard'],
    statuses: ['Pending', 'In Transit', 'Delivered', 'Cancelled'],
    mapApiKey: '', // You need to set your Google Maps API key here
    mapProvider: 'google',
  });
  const [receipt, setReceipt] = useState(null);

  // Load all shipments and calculate stats
  async function loadShipments() {
    try {
      const { data } = await api.get('/shipments');
      setShipments(data);
      setStats({
        total: data.length,
        delivered: data.filter((s) => s.status === 'Delivered').length,
        pending: data.filter((s) => s.status !== 'Delivered').length,
        revenue: data.reduce((sum, s) => sum + (Number(s.cost) || 0), 0),
      });
    } catch (error) {
      console.error('Failed to load shipments:', error);
      setMessage('Failed to load data.');
    }
  }

  // Effect to load initial data
  useEffect(() => {
    loadShipments();
    // Dummy data for other sections
    setAdmins([
      { name: 'Admin1', session: 'Active', lastLogin: '2025-08-24 10:00' },
      { name: 'Admin2', session: 'Inactive', lastLogin: '2025-08-23 18:30' },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handler for creating a new shipment
  async function createShipment() {
    try {
      await api.post('/shipments', { ...form, mapLocation });
      setMessage('Shipment created successfully!');
      // Reset the form
      setForm({
        trackingId: '',
        origin: '',
        destination: '',
        status: 'Pending',
        progress: 0,
        cost: '',
        bookingMode: '',
        freightType: '',
        sender: '',
        product: '',
        paymentMethod: '',
        photo: '',
      });
      setMapLocation({ lat: '', lng: '' });
      loadShipments();
    } catch (error) {
      console.error('Failed to create shipment:', error);
      setMessage('Failed to create shipment.');
    }
  }

  // Handler for updating a shipment
  async function updateShipment(updatedShipment) {
    try {
      await api.put(`/shipments/${updatedShipment.id}`, updatedShipment);
      setMessage('Shipment updated successfully!');
      setSelected(null);
      loadShipments();
    } catch (error) {
      console.error('Failed to update shipment:', error);
      setMessage('Failed to update shipment.');
    }
  }

  // Handler for deleting a shipment
  async function removeShipment(id) {
    try {
      await api.delete(`/shipments/${id}`);
      setMessage('Shipment deleted successfully!');
      loadShipments();
    } catch (error) {
      console.error('Failed to delete shipment:', error);
      setMessage('Failed to delete shipment.');
    }
  }

  // Handler for adding a new event to a shipment's timeline
  async function addEvent(shipmentId, eventText, eventLocation) {
    try {
      await api.post(`/shipments/${shipmentId}/events`, {
        text: eventText,
        location: eventLocation,
      });
      setMessage('Event added successfully!');
      loadShipments();
    } catch (error) {
      console.error('Failed to add event:', error);
      setMessage('Failed to add event.');
    }
  }

  // Handler for printing a receipt
  function handlePrintReceipt(shipment) {
    setReceipt(shipment);
    setTimeout(() => {
      window.print();
      setReceipt(null); // Clear receipt after printing
    }, 500);
  }

  // Handler for saving dynamic dropdown options
  function handleSaveOptions(key, values) {
    setSettings((prev) => ({ ...prev, [key]: values }));
    setMessage(`${key} updated successfully! (Not implemented)`);
  }

  return (
    <div className="min-h-screen font-sans bg-gray-50 text-gray-800 print:bg-white print:text-black relative overflow-hidden">
      {/* Particle background for aesthetic consistency */}
      <div className="fixed inset-0 z-0 opacity-80" aria-hidden="true">
        <div id="particle-container" className="absolute inset-0"></div>
      </div>
      <Nav />
      <div className="container mx-auto px-4 py-20 relative z-10 flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0 mb-4 md:mb-0">
          <div className="sticky top-20 flex flex-col glass-card p-4 rounded-3xl">
            <nav className="space-y-2">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  className={`w-full flex items-center gap-3 px-5 py-3 rounded-2xl text-left font-semibold transition-all shadow-sm
                    ${tab === t.key ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  onClick={() => {
                    setTab(t.key);
                    setMessage('');
                    setSelected(null);
                    setReceipt(null);
                  }}
                >
                  <t.icon className="h-5 w-5" />
                  {t.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 rounded-3xl min-h-[70vh] shadow-xl"
          >
            {tab === 'dashboard' && <DashboardStats stats={stats} />}
            {tab === 'shipments' && (
              <div>
                <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Manage Shipments</h2>
                <div className="overflow-x-auto -mx-8">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead>
                      <tr className="text-gray-500 uppercase font-semibold text-xs border-b border-gray-200">
                        <th className="p-4">Tracking ID</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Route</th>
                        <th className="p-4">Progress</th>
                        <th className="p-4">Cost</th>
                        <th className="p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shipments.map((s) => (
                        <tr
                          key={s.id}
                          className="border-b border-gray-100 transition-colors duration-200 hover:bg-gray-50"
                        >
                          <td className="p-4 font-semibold text-gray-800">{s.trackingId}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {s.status}
                            </span>
                          </td>
                          <td className="p-4 text-gray-600">
                            {s.origin} → {s.destination}
                          </td>
                          <td className="p-4">
                            <div className="w-32 bg-gray-200 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-blue-500 h-2 rounded-full transition-all"
                                style={{ width: `${s.progress || 0}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500 mt-1 block">
                              {s.progress || 0}%
                            </span>
                          </td>
                          <td className="p-4 text-green-600 font-semibold">${s.cost}</td>
                          <td className="p-4 flex gap-2 flex-wrap">
                            <button
                              className="px-3 py-1 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
                              onClick={() => setSelected(s)}
                            >
                              <PencilSquareIcon className="h-4 w-4 inline-block mr-1" />
                              Edit
                            </button>
                            <button
                              className="px-3 py-1 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                              onClick={() => removeShipment(s.id)}
                            >
                              <TrashIcon className="h-4 w-4 inline-block mr-1" />
                              Delete
                            </button>
                            <button
                              className="px-3 py-1 rounded-full bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition"
                              onClick={() => handlePrintReceipt(s)}
                            >
                              <PrinterIcon className="h-4 w-4 inline-block mr-1" />
                              Receipt
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {tab === 'create' && (
              <CreateShipmentForm
                form={form}
                setForm={setForm}
                createShipment={createShipment}
                options={settings}
                mapLocation={mapLocation}
                setMapLocation={setMapLocation}
              />
            )}
            {tab === 'map' && (
              <div className="max-w-xl mx-auto">
                <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Customize Map Location</h2>
                <p className="text-gray-500 mb-6">Set a specific map location for a shipment.</p>
                <MapSelector
                  apiKey={settings.mapApiKey}
                  provider={settings.mapProvider}
                  location={mapLocation}
                  onSelect={(lat, lng) => setMapLocation({ lat, lng })}
                />
                <div className="mt-4 text-sm text-gray-600">
                  Selected: {mapLocation?.lat}, {mapLocation?.lng}
                </div>
              </div>
            )}
            {tab === 'settings' && (
              <AdminSettingsPanel
                settings={settings}
                setSettings={setSettings}
                onSaveOptions={handleSaveOptions}
              />
            )}
            {tab === 'admins' && (
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-extrabold mb-6 text-gray-900">
                  Administrator Sessions
                </h2>
                <p className="text-gray-500 mb-6">Manage active and inactive admin sessions.</p>
                <div className="overflow-x-auto -mx-8">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead>
                      <tr className="text-gray-500 uppercase font-semibold text-xs border-b border-gray-200">
                        <th className="p-4">Name</th>
                        <th className="p-4">Session</th>
                        <th className="p-4">Last Login</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admins.map((a, i) => (
                        <tr
                          key={i}
                          className="border-b border-gray-100 transition-colors duration-200 hover:bg-gray-50"
                        >
                          <td className="p-4 font-semibold text-gray-800">{a.name}</td>
                          <td className="p-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${a.session === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                                }`}
                            >
                              {a.session}
                            </span>
                          </td>
                          <td className="p-4 text-gray-600">{a.lastLogin}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {message && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center text-blue-600 font-semibold text-lg"
              >
                {message}
              </motion.p>
            )}
          </motion.div>
        </main>
      </div>

      {/* Modals are rendered outside the main content for proper layering */}
      {selected && (
        <EditShipmentModal
          shipment={selected}
          onClose={() => setSelected(null)}
          onSave={updateShipment}
          onAddEvent={addEvent}
          options={settings}
        />
      )}

      {receipt && <ReceiptPreviewModal shipment={receipt} onClose={() => setReceipt(null)} onPrint={() => handlePrintReceipt(receipt)} />}
    </div>
  );
}

function DashboardStats({ stats }) {
  return (
    <div>
      <h2 className="text-3xl font-extrabold mb-8 text-gray-900">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Shipments" value={stats.total} icon={TruckIcon} color="blue" />
        <StatCard
          label="Delivered"
          value={stats.delivered}
          icon={ChartBarIcon}
          color="green"
        />
        <StatCard label="Pending" value={stats.pending} icon={TruckIcon} color="orange" />
        <StatCard
          label="Total Revenue"
          value={`$${stats.revenue}`}
          icon={ChartBarIcon}
          color="purple"
        />
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }) {
  const cardStyles = {
    blue: 'bg-blue-500/10 border-blue-200 text-blue-700',
    green: 'bg-green-500/10 border-green-200 text-green-700',
    orange: 'bg-orange-500/10 border-orange-200 text-orange-700',
    purple: 'bg-purple-500/10 border-purple-200 text-purple-700',
  };
  const iconStyles = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 10 }}
      className={`rounded-2xl border p-6 flex flex-col items-center shadow-md ${cardStyles[color]}`}
    >
      <div
        className={`rounded-full p-2 mb-3 flex items-center justify-center ${iconStyles[color]}`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <span className="text-sm font-semibold text-gray-500 mb-1">{label}</span>
      <span className="text-3xl font-bold">{value}</span>
    </motion.div>
  );
}

function CreateShipmentForm({ form, setForm, createShipment, options, mapLocation, setMapLocation }) {
  const fieldList = [
    { key: "trackingId", label: "Tracking ID", type: "text" },
    { key: "origin", label: "Origin", type: "text" },
    { key: "destination", label: "Destination", type: "text" },
    {
      key: "status",
      label: "Status",
      type: "dropdown",
      options: options.statuses,
    },
    { key: "progress", label: "Progress (%)", type: "number" },
    { key: "cost", label: "Cost ($)", type: "number" },
    {
      key: "bookingMode",
      label: "Booking Mode",
      type: "dropdown",
      options: options.bookingModes,
    },
    {
      key: "freightType",
      label: "Freight Type",
      type: "dropdown",
      options: options.freightTypes,
    },
    { key: "sender", label: "Sender", type: "text" },
    { key: "product", label: "Product", type: "text" },
    { key: "paymentMethod", label: "Payment Method", type: "text" },
    { key: "photo", label: "Photo URL", type: "text" },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Create Shipment</h2>
      <p className="text-gray-500 mb-6">Fill in the details to create a new shipment record.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {fieldList.map((field) =>
          field.type === "dropdown" ? (
            <div key={field.key}>
              <label className="block text-gray-700 text-sm font-medium mb-1">{field.label}</label>
              <select
                className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={form[field.key] || field.options[0]}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [field.key]: e.target.value,
                  })
                }
                required
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <input
              key={field.key}
              className="px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder={field.label}
              type={field.type}
              value={form[field.key] || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  [field.key]: field.type === "number" ? Number(e.target.value) : e.target.value,
                })
              }
              required
            />
          )
        )}
      </div>
      {/* Map location selector */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-1">Map Location</label>
        <MapSelector
          apiKey={options.mapApiKey}
          provider={options.mapProvider}
          location={mapLocation}
          onSelect={(lat, lng) => setMapLocation({ lat, lng })}
        />
        <div className="mt-2 text-sm text-gray-600">
          Selected: {mapLocation?.lat}, {mapLocation?.lng}
        </div>
      </div>
      <button className="btn w-full" onClick={createShipment}>
        Create Shipment
      </button>
    </div>
  );
}

function EditShipmentModal({ shipment, onClose, onSave, onAddEvent, options }) {
  const [editedShipment, setEditedShipment] = useState(shipment);
  const [newEvent, setNewEvent] = useState({ text: '', location: '' });

  const handleSave = () => {
    onSave(editedShipment);
  };

  const handleAddEvent = () => {
    if (newEvent.text.trim() === '') return;
    const newEvents = [
      ...(editedShipment.events || []),
      {
        text: newEvent.text,
        location: newEvent.location,
        time: new Date().toISOString(),
      },
    ];
    onAddEvent(editedShipment.id, newEvent.text, newEvent.location);
    setEditedShipment({ ...editedShipment, events: newEvents });
    setNewEvent({ text: '', location: '' });
  };

  const fieldList = [
    { key: 'trackingId', label: 'Tracking ID', type: 'text' },
    { key: 'origin', label: 'Origin', type: 'text' },
    { key: 'destination', label: 'Destination', type: 'text' },
    { key: 'status', label: 'Status', type: 'dropdown', options: options.statuses },
    { key: 'progress', label: 'Progress (%)', type: 'number' },
    { key: 'cost', label: 'Cost ($)', type: 'number' },
    { key: 'bookingMode', label: 'Booking Mode', type: 'dropdown', options: options.bookingModes },
    { key: 'freightType', label: 'Freight Type', type: 'dropdown', options: options.freightTypes },
    { key: 'sender', label: 'Sender', type: 'text' },
    { key: 'product', label: 'Product', type: 'text' },
    { key: 'paymentMethod', label: 'Payment Method', type: 'text' },
    { key: 'photo', label: 'Photo URL', type: 'text' },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 12 }}
        className="glass-card bg-white/80 backdrop-blur-md p-8 rounded-3xl w-full max-w-2xl shadow-2xl relative"
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h3 className="text-2xl font-bold mb-6 text-gray-900">
          <PencilSquareIcon className="h-6 w-6 inline-block mr-2 text-blue-600" />
          Edit Shipment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-h-[60vh] overflow-y-auto pr-2">
          {fieldList.map((field) => (
            field.type === 'dropdown' ? (
              <div key={field.key}>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  {field.label}
                </label>
                <select
                  className="w-full px-4 py-2 rounded-xl bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  value={editedShipment[field.key] || field.options[0]}
                  onChange={(e) =>
                    setEditedShipment({
                      ...editedShipment,
                      [field.key]: e.target.value,
                    })
                  }
                >
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div key={field.key}>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  {field.label}
                </label>
                <input
                  className="w-full px-4 py-2 rounded-xl bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  type={field.type}
                  value={editedShipment[field.key] || ''}
                  onChange={(e) =>
                    setEditedShipment({
                      ...editedShipment,
                      [field.key]: field.type === 'number' ? Number(e.target.value) : e.target.value,
                    })
                  }
                />
              </div>
            )
          ))}
          <div className="md:col-span-2">
            <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Timeline Events</h4>
            <div className="space-y-2">
              {(editedShipment.events || []).map((event, i) => (
                <div key={i} className="bg-gray-100 p-3 rounded-lg text-sm text-gray-700">
                  <p className="font-medium">{event.text}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(event.time).toLocaleString()} - {event.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 mt-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Add New Event</h4>
            <div className="flex flex-col md:flex-row gap-2">
              <input
                className="flex-1 px-4 py-2 rounded-xl bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Event description"
                value={newEvent.text}
                onChange={(e) => setNewEvent({ ...newEvent, text: e.target.value })}
              />
              <input
                className="flex-1 px-4 py-2 rounded-xl bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              />
              <button
                type="button"
                className="px-4 py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
                onClick={handleAddEvent}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <button
          className="btn w-full mt-4"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </motion.div>
    </div>
  );
}

// --- MapSelector with Google Maps integration ---
function MapSelector({ apiKey, provider, location, onSelect }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!window.google && provider === "google") {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.onload = () => initMap();
      document.body.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      if (!window.google || !mapRef.current) return;
      const center = {
        lat: Number(location?.lat) || 0,
        lng: Number(location?.lng) || 0,
      };
      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 5,
      });
      markerRef.current = new window.google.maps.Marker({
        position: center,
        map,
        draggable: true,
      });
      markerRef.current.addListener("dragend", (e) => {
        onSelect(e.latLng.lat(), e.latLng.lng());
      });
      map.addListener("click", (e) => {
        markerRef.current.setPosition(e.latLng);
        onSelect(e.latLng.lat(), e.latLng.lng());
      });
    }

    // Cleanup
    return () => {
      if (mapRef.current) mapRef.current.innerHTML = "";
    };
  }, [apiKey, provider, location?.lat, location?.lng, onSelect]);

  return (
    <div className="flex flex-col gap-2">
      <div
        ref={mapRef}
        style={{ width: "100%", height: "250px", borderRadius: "1rem", border: "1px solid #e5e7eb" }}
      />
      <div className="flex gap-2 items-center mt-2">
        <input
          type="number"
          step="any"
          className="px-4 py-2 rounded-xl bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Latitude"
          value={location?.lat || ""}
          onChange={(e) => onSelect(Number(e.target.value), location?.lng || "")}
        />
        <input
          type="number"
          step="any"
          className="px-4 py-2 rounded-xl bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Longitude"
          value={location?.lng || ""}
          onChange={(e) => onSelect(location?.lat || "", Number(e.target.value))}
        />
        <span className="text-xs text-gray-500">Pick location on map or enter manually</span>
      </div>
    </div>
  );
}

// --- Admin Settings Panel ---
function AdminSettingsPanel({ settings, setSettings, onSaveOptions }) {
  const [freightTypes, setFreightTypes] = useState(settings.freightTypes);
  const [bookingModes, setBookingModes] = useState(settings.bookingModes);
  const [statuses, setStatuses] = useState(settings.statuses);
  const [mapApiKey, setMapApiKey] = useState(settings.mapApiKey);
  const [mapProvider, setMapProvider] = useState(settings.mapProvider);

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Site Settings</h2>
      <p className="text-gray-500 mb-6">Update the site's name, logo, dropdown options, and map settings.</p>
      <div className="space-y-4">
        <input
          className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Site Name"
          value={settings.siteName}
          onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
        />
        <input
          className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Logo URL"
          value={settings.logo}
          onChange={(e) => setSettings({ ...settings, logo: e.target.value })}
        />
        <EditableDropdown
          label="Freight Types"
          values={freightTypes}
          setValues={setFreightTypes}
          onSave={() => onSaveOptions("freightTypes", freightTypes)}
        />
        <EditableDropdown
          label="Booking Modes"
          values={bookingModes}
          setValues={setBookingModes}
          onSave={() => onSaveOptions("bookingModes", bookingModes)}
        />
        <EditableDropdown
          label="Shipment Statuses"
          values={statuses}
          setValues={setStatuses}
          onSave={() => onSaveOptions("statuses", statuses)}
        />
        <div className="flex gap-2">
          <input
            className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Google Maps API Key"
            value={mapApiKey}
            onChange={(e) => setMapApiKey(e.target.value)}
          />
          <select
            className="px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-800"
            value={mapProvider}
            onChange={(e) => setMapProvider(e.target.value)}
          >
            <option value="google">Google Maps</option>
            <option value="mapbox">Mapbox (coming soon)</option>
          </select>
        </div>
        <button
          className="btn w-full"
          onClick={() => {
            setSettings({
              ...settings,
              freightTypes,
              bookingModes,
              statuses,
              mapApiKey,
              mapProvider,
            });
            setMessage('Settings saved successfully!');
          }}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

// --- EditableDropdown utility ---
function EditableDropdown({ label, values, setValues, onSave }) {
  const [newValue, setNewValue] = useState("");
  return (
    <div>
      <label className="block text-gray-700 text-sm font-medium mb-1">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {values.map((v, i) => (
          <span key={i} className="bg-gray-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            {v}
            <button
              className="ml-1 text-red-500 hover:text-red-700"
              onClick={() => setValues(values.filter((_, idx) => idx !== i))}
              type="button"
              aria-label="Remove"
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="px-3 py-2 rounded-xl bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder={`Add ${label.slice(0, -1)}`}
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <button
          className="px-4 py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          onClick={() => {
            if (newValue.trim() && !values.includes(newValue.trim())) {
              setValues([...values, newValue.trim()]);
              setNewValue("");
            }
          }}
          type="button"
        >
          Add
        </button>
        <button
          className="px-4 py-2 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition"
          onClick={onSave}
          type="button"
        >
          Save
        </button>
      </div>
    </div>
  );
}

// --- Receipt Preview Modal ---
function ReceiptPreviewModal({ shipment, onClose, onPrint }) {
  // This modal is intended for printing, so it uses `print:` styles
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 print:static print:bg-white print:text-black">
      <div className="bg-white text-black p-8 rounded-2xl w-full max-w-2xl shadow-2xl relative print:rounded-none print:shadow-none print:p-0 print:w-full print:max-w-full">
        {/* Close button, hidden during print */}
        <button
          className="absolute top-2 right-2 text-gray-500 text-2xl print:hidden"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="relative">
          {/* Watermark for print */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
            <span className="text-7xl font-extrabold text-blue-700 -rotate-12">LocatePro</span>
          </div>
          <div className="relative z-10 p-4">
            <div className="flex items-center justify-between mb-6 border-b-2 border-blue-600 pb-4">
              <span className="text-2xl font-bold text-gray-800">LocatePro Shipment Receipt</span>
              <span className="border-2 border-blue-600 px-4 py-1 rounded-full text-blue-600 font-bold text-sm">
                CONFIRMED
              </span>
            </div>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-bold text-gray-700 mb-2">Shipment Details</h4>
                <p>
                  <span className="font-semibold">Order ID:</span> {shipment.trackingId}
                </p>
                <p>
                  <span className="font-semibold">Route:</span> {shipment.origin} &rarr; {shipment.destination}
                </p>
                <p>
                  <span className="font-semibold">Status:</span> {shipment.status}
                </p>
                <p>
                  <span className="font-semibold">Progress:</span> {shipment.progress}%
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-700 mb-2">Billing Details</h4>
                <p>
                  <span className="font-semibold">Total Cost:</span> ${shipment.cost}
                </p>
                <p>
                  <span className="font-semibold">Payment Method:</span> {shipment.paymentMethod}
                </p>
                {shipment.photo && (
                  <div className="mt-2">
                    <img src={shipment.photo} alt="Payment Proof" className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
                  </div>
                )}
              </div>
            </div>
            <div className="mb-6">
              <h4 className="font-bold text-gray-700 mb-2">Sender & Product Information</h4>
              <p>
                <span className="font-semibold">Sender:</span> {shipment.sender}
              </p>
              <p>
                <span className="font-semibold">Product:</span> {shipment.product}
              </p>
              <p>
                <span className="font-semibold">Freight Type:</span> {shipment.freightType}
              </p>
              <p>
                <span className="font-semibold">Booking Mode:</span> {shipment.bookingMode}
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 mb-2">Timeline</h4>
              <ol className="list-disc list-inside text-sm text-gray-600">
                {(shipment.events || []).map((e, i) => (
                  <li key={i}>
                    <span className="font-medium text-gray-800">
                      {new Date(e.time).toLocaleString()}
                    </span>{' '}
                    &mdash; {e.text}
                    {e.location && <span className="text-gray-500"> ({e.location})</span>}
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-8 text-center text-gray-600">
              <p className="text-sm">Thank you for choosing LocatePro for your logistics needs.</p>
            </div>
            <div className="mt-8 flex justify-center">
              <button className="btn px-8 py-3" onClick={onPrint}>
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}