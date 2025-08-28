// import Nav from '../components/Nav.jsx'

// export default function Pricing() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900">
//       <Nav />
//       <div className="max-w-4xl mx-auto px-4 py-16">
//         <div className="flex flex-col items-center mb-10">
//           <img
//             src="https://cdn.jsdelivr.net/gh/real3dassets/pricing-3d.png"
//             alt="Pricing"
//             className="h-24 w-24 mb-4 drop-shadow-xl"
//           />
//           <h1 className="text-4xl font-extrabold text-cyan-400 mb-2 text-center">Pricing Plans</h1>
//           <p className="text-slate-300 text-lg text-center max-w-xl">
//             Choose the plan that fits your business. All plans include secure tracking, analytics, and support.
//           </p>
//         </div>
//         <div className="grid md:grid-cols-3 gap-8">
//           <div className="card p-6 rounded-xl border border-slate-800 bg-slate-900/70 shadow-lg flex flex-col items-center">
//             <img src="https://cdn.jsdelivr.net/gh/real3dassets/plan-basic-3d.png" alt="Starter" className="h-16 mb-2" />
//             <h2 className="text-xl font-bold text-cyan-300 mb-2">Starter</h2>
//             <div className="text-2xl font-bold text-cyan-400 mb-2">$49/mo</div>
//             <ul className="text-slate-400 text-sm mb-2 list-disc pl-4 text-left w-full">
//               <li>Up to 100 shipments/month</li>
//               <li>Basic tracking</li>
//               <li>Email support</li>
//             </ul>
//             <button className="mt-2 px-6 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold shadow hover:bg-cyan-400 transition">Choose</button>
//           </div>
//           <div className="card p-6 rounded-xl border-2 border-cyan-400 bg-slate-900/80 shadow-lg flex flex-col items-center">
//             <img src="https://cdn.jsdelivr.net/gh/real3dassets/plan-business-3d.png" alt="Business" className="h-16 mb-2" />
//             <h2 className="text-xl font-bold text-cyan-300 mb-2">Business</h2>
//             <div className="text-2xl font-bold text-cyan-400 mb-2">$199/mo</div>
//             <ul className="text-slate-400 text-sm mb-2 list-disc pl-4 text-left w-full">
//               <li>Up to 1,000 shipments/month</li>
//               <li>3D visualization</li>
//               <li>Analytics dashboard</li>
//               <li>Priority support</li>
//             </ul>
//             <button className="mt-2 px-6 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold shadow hover:bg-cyan-400 transition">Choose</button>
//           </div>
//           <div className="card p-6 rounded-xl border border-slate-800 bg-slate-900/70 shadow-lg flex flex-col items-center">
//             <img src="https://cdn.jsdelivr.net/gh/real3dassets/plan-enterprise-3d.png" alt="Enterprise" className="h-16 mb-2" />
//             <h2 className="text-xl font-bold text-cyan-300 mb-2">Enterprise</h2>
//             <div className="text-2xl font-bold text-cyan-400 mb-2">Custom</div>
//             <ul className="text-slate-400 text-sm mb-2 list-disc pl-4 text-left w-full">
//               <li>Unlimited shipments</li>
//               <li>API access</li>
//               <li>ERP integration</li>
//               <li>Dedicated manager</li>
//             </ul>
//             <button className="mt-2 px-6 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold shadow hover:bg-cyan-400 transition">Contact Sales</button>
//           </div>
//         </div>
//         <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg text-center">
//           <h2 className="text-xl font-bold text-cyan-300 mb-2">Frequently Asked Questions</h2>
//           <ul className="text-slate-400 text-left max-w-2xl mx-auto space-y-2">
//             <li><span className="font-semibold text-cyan-300">Can I change my plan?</span> Yes, you can upgrade or downgrade anytime.</li>
//             <li><span className="font-semibold text-cyan-300">Is my data secure?</span> Absolutely. We are ISO 27001 certified and PCI DSS compliant.</li>
//             <li><span className="font-semibold text-cyan-300">Do you offer custom solutions?</span> Yes, contact us for enterprise quotes and integrations.</li>
//           </ul>
//         </div>
//         <div className="mt-8 text-center">
//           <p className="text-slate-300">
//             For enterprise pricing, email <span className="text-cyan-400">sales@locatepro.com</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }