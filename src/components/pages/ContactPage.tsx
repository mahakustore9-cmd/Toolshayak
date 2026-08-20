import React, { useState } from "react";
import { Mail, MessageSquare, Send, CheckCircle2, Clock, MapPin, Sparkles, AlertCircle } from "lucide-react";
import { SITE_CONFIG } from "../../config";
import { AdPlaceholder } from "../common/AdPlaceholder";

export const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Feedback / Inquiry");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    // Create mailto fallback link
    const mailto = `mailto:${SITE_CONFIG.author.email}?subject=${encodeURIComponent(`[ToolSahayak Contact] ${subject}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm text-center space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
          Contact & Support
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Get in Touch with ToolSahayak
        </h1>
        <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Have a question, feedback, or suggestion for a new free tool? We would love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Contact Form */}
        <div className="md:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
            <span>Send Us a Message</span>
          </h2>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-emerald-900">Message Prepared!</h3>
              <p className="text-xs text-slate-600">
                Your default email app has been opened with your inquiry. We typically reply within 24–48 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs text-emerald-700 font-bold hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@example.com"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Inquiry Topic</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Tool Suggestion">Suggest a New Tool</option>
                  <option value="Bug Report">Report a Problem / Bug</option>
                  <option value="Advertising">Advertising / Partnership</option>
                  <option value="General Feedback / Inquiry">General Feedback / Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Message *</label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe your suggestion or question in detail..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Sidebar */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-slate-900">Direct Support Channels</h2>
            
            <div className="flex items-start gap-3 text-xs">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-800">Support & Inquiries</p>
                <a href={`mailto:${SITE_CONFIG.author.email}`} className="text-emerald-600 hover:underline font-mono text-xs">
                  {SITE_CONFIG.author.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-800">Response Time</p>
                <p className="text-slate-500">Mon – Sat (9:00 AM – 6:00 PM IST)</p>
                <p className="text-[11px] text-slate-400">Usually within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-800">Operational Location</p>
                <p className="text-slate-500">New Delhi, India</p>
              </div>
            </div>
          </div>

          <AdPlaceholder slot="sidebar-rect" />
        </div>

      </div>

    </div>
  );
};
