import React, { useState } from 'react';

// Custom SVG Icons to replace react-icons/md
const IconPerson = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
  </svg>
);

const IconEmail = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
  </svg>
);

const IconMessage = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"></path>
  </svg>
);

const IconSend = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
  </svg>
);

const IconCheckCircle = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
  </svg>
);

const From = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', description: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex justify-center items-center md:px-10 px-2 py-5 font-sans">
      {/* Subtle decorative background accents */}
    

      <div className="w-full max-w-xl bg-white rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 relative z-10">
        
        {/* Header Section */}
        <div className="mb-10 text-center">
          <div className="inline-block p-3 rounded-2xl bg-blue-900 shadow-lg shadow-blue-900/20 mb-4">
            <div className="text-2xl text-yellow-500">
              <IconSend />
            </div>
          </div>
          <h1 className="md:text-3xl text-2xl font-bold text-blue-900 tracking-tight">
            CONTACT
          </h1>
          <p className="text-slate-500 text-[13px] mt-2 font-medium">Contact us for reliable support, product information, or business inquiries.</p>
        </div>

        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center py-12 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <div className="text-5xl text-yellow-600">
                <IconCheckCircle />
              </div>
            </div>
            <h2 className="text-xl font-bold text-blue-900">Message sent!</h2>
            <p className="text-slate-500">We'll be in touch very soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1 text-blue-900">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <div className="text-xl text-slate-400 group-focus-within:text-blue-900 transition-colors">
                    <IconPerson />
                  </div>
                </div>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-900 focus:bg-white focus:border-transparent outline-none transition-all placeholder-slate-400 text-slate-900"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1 text-blue-900">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <div className="text-xl text-slate-400 group-focus-within:text-blue-900 transition-colors">
                    <IconEmail />
                  </div>
                </div>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-900 focus:bg-white focus:border-transparent outline-none transition-all placeholder-slate-400 text-slate-900"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1 text-blue-900">Description</label>
              <div className="relative group">
                <div className="absolute top-3.5 left-4 pointer-events-none">
                  <div className="text-xl text-slate-400 group-focus-within:text-blue-900 transition-colors">
                    <IconMessage />
                  </div>
                </div>
                <textarea
                  required
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-900 focus:bg-white focus:border-transparent outline-none transition-all placeholder-slate-400 text-slate-900 resize-none"
                  placeholder="Describe your requirements..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-blue-900 hover:bg-[#0a1633] active:scale-[0.99] text-yellow-500 font-bold py-4 rounded-2xl transition-all shadow-xl shadow-blue-900/10 flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              {status === 'sending' ? (
                <div className="w-6 h-6 border-2 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin" />
              ) : (
                <>
                  <span>Send Message</span>
                  <div className="text-lg">
                    <IconSend />
                  </div>
                </>
              )}
            </button>
          </form>
        )}

        {/* Footer Note */}
        <p className="text-center text-xs text-slate-400 mt-8 font-medium">
          We respect your privacy. No spam, ever.
        </p>
      </div>
    </div>
  );
};

export default From;