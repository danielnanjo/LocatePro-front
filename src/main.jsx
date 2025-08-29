import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import Home from './pages/Home.jsx';
import Track from './pages/Track.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Blog from './pages/Blog.jsx';
import Contact from './pages/Contact.jsx';
import Payments from './pages/Payments.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import TawkToChat from './components/TawkToChat.jsx'; // <-- add this

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TawkToChat /> {/* <-- add this */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/track" element={<Track />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        {/* <Route path="/pricing" element={<Pricing />} /> */}
        <Route path="/blog" element={<Blog />} />
        {/* <Route path="/careers" element={<Careers />} /> */}
        <Route path="/contact" element={<Contact />} />
        
        <Route path="/payments" element={<Payments />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        {/* Future pages can be added below */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

function App() {
  return (
    <div className="App">
      <TawkMessengerReact
        propertyId="68a924307d18e21931dd2518"
        widgetId="1j3abao74"
      />
      {/* ...rest of your app... */}
    </div>
  );
}

export default App;