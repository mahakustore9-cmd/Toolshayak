import React, { useState, useEffect, useRef } from "react";
import { 
  QrCode, 
  Download, 
  Copy, 
  Check, 
  RotateCcw, 
  Globe, 
  CreditCard, 
  Wifi, 
  Phone, 
  Mail, 
  Type, 
  Palette,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import QRCode from "qrcode";

type QrType = "url" | "upi" | "wifi" | "text" | "phone" | "email";

export const QrGeneratorTool: React.FC = () => {
  const [qrType, setQrType] = useState<QrType>("url");
  
  // Fields
  const [urlVal, setUrlVal] = useState("https://toolsahayak.com");
  const [textVal, setTextVal] = useState("");
  
  // UPI fields
  const [upiId, setUpiId] = useState("");
  const [payeeName, setPayeeName] = useState("");
  const [upiAmount, setUpiAmount] = useState("");
  const [upiNote, setUpiNote] = useState("");

  // WiFi fields
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPass, setWifiPass] = useState("");
  const [wifiType, setWifiType] = useState<"WPA" | "WEP" | "nopass">("WPA");
  const [wifiHidden, setWifiHidden] = useState(false);

  // Phone / Email
  const [phoneVal, setPhoneVal] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  // Customization
  const [fgColor, setFgColor] = useState("#0f172a");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState<number>(400);
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("M");
  
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Compute payload based on type
  const computePayload = (): string => {
    switch (qrType) {
      case "url":
        return urlVal.trim() || "https://toolsahayak.com";
      case "upi":
        if (!upiId) return "upi://pay?pa=name@upi";
        let upiStr = `upi://pay?pa=${encodeURIComponent(upiId.trim())}`;
        if (payeeName) upiStr += `&pn=${encodeURIComponent(payeeName.trim())}`;
        if (upiAmount) upiStr += `&am=${encodeURIComponent(upiAmount.trim())}&cu=INR`;
        if (upiNote) upiStr += `&tn=${encodeURIComponent(upiNote.trim())}`;
        return upiStr;
      case "wifi":
        const escapeStr = (s: string) => s.replace(/([\\;,:"])/g, "\\$1");
        return `WIFI:S:${escapeStr(wifiSsid)};T:${wifiType};P:${escapeStr(wifiPass)};H:${wifiHidden ? "true" : "false"};;`;
      case "phone":
        return phoneVal.trim() ? `tel:${phoneVal.trim()}` : "tel:+91";
      case "email":
        let mailStr = `mailto:${emailTo.trim()}`;
        const params: string[] = [];
        if (emailSubject) params.push(`subject=${encodeURIComponent(emailSubject)}`);
        if (emailBody) params.push(`body=${encodeURIComponent(emailBody)}`);
        if (params.length) mailStr += `?${params.join("&")}`;
        return mailStr;
      case "text":
      default:
        return textVal.trim() || "Welcome to ToolSahayak!";
    }
  };

  useEffect(() => {
    const generate = async () => {
      const payload = computePayload();
      try {
        const dataUrl = await QRCode.toDataURL(payload, {
          width: size,
          margin: 2,
          color: {
            dark: fgColor,
            light: bgColor,
          },
          errorCorrectionLevel: errorLevel,
        });
        setQrDataUrl(dataUrl);
      } catch (err) {
        console.error(err);
      }
    };
    generate();
  }, [qrType, urlVal, textVal, upiId, payeeName, upiAmount, upiNote, wifiSsid, wifiPass, wifiType, wifiHidden, phoneVal, emailTo, emailSubject, emailBody, fgColor, bgColor, size, errorLevel]);

  const downloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `ToolSahayak_QR_${qrType}_${size}px.png`;
    link.click();
  };

  const copyToClipboard = async () => {
    if (!qrDataUrl) return;
    try {
      const res = await fetch(qrDataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob })
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // Fallback copy text
      navigator.clipboard.writeText(computePayload());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetAll = () => {
    setUrlVal("https://toolsahayak.com");
    setTextVal("");
    setUpiId("");
    setPayeeName("");
    setUpiAmount("");
    setUpiNote("");
    setWifiSsid("");
    setWifiPass("");
    setPhoneVal("");
    setEmailTo("");
    setEmailSubject("");
    setEmailBody("");
    setFgColor("#0f172a");
    setBgColor("#ffffff");
    setSize(400);
    setErrorLevel("M");
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Type Selection Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200">
        <button
          onClick={() => setQrType("url")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            qrType === "url"
              ? "bg-amber-500 text-white shadow-xs"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Website URL</span>
        </button>

        <button
          onClick={() => setQrType("upi")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            qrType === "upi"
              ? "bg-amber-500 text-white shadow-xs"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>UPI / Payment QR</span>
        </button>

        <button
          onClick={() => setQrType("wifi")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            qrType === "wifi"
              ? "bg-amber-500 text-white shadow-xs"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          <Wifi className="w-4 h-4" />
          <span>WiFi Network</span>
        </button>

        <button
          onClick={() => setQrType("phone")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            qrType === "phone"
              ? "bg-amber-500 text-white shadow-xs"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>Phone / Call</span>
        </button>

        <button
          onClick={() => setQrType("email")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            qrType === "email"
              ? "bg-amber-500 text-white shadow-xs"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Email Address</span>
        </button>

        <button
          onClick={() => setQrType("text")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            qrType === "text"
              ? "bg-amber-500 text-white shadow-xs"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          <Type className="w-4 h-4" />
          <span>Plain Text</span>
        </button>
      </div>

      {/* Main Form & Live Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs Form */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* URL Input */}
          {qrType === "url" && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Target Website URL
              </label>
              <input
                type="url"
                value={urlVal}
                onChange={(e) => setUrlVal(e.target.value)}
                placeholder="https://example.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all font-mono"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Scanners will directly open this webpage when pointed at the QR code.
              </p>
            </div>
          )}

          {/* UPI Inputs */}
          {qrType === "upi" && (
            <div className="space-y-3 bg-amber-50/50 p-4 rounded-xl border border-amber-200 text-xs">
              <div className="flex items-center gap-1 text-amber-900 font-bold text-sm">
                <CreditCard className="w-4 h-4 text-amber-600" />
                <span>UPI Payment Configuration</span>
              </div>
              
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Recipient UPI ID (VPA) *
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="e.g. yourname@okhdfcbank or 9876543210@paytm"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-mono focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Payee Name (Business/Person)
                  </label>
                  <input
                    type="text"
                    value={payeeName}
                    onChange={(e) => setPayeeName(e.target.value)}
                    placeholder="e.g. Ramesh General Store"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Fixed Amount in ₹ (Optional)
                  </label>
                  <input
                    type="number"
                    value={upiAmount}
                    onChange={(e) => setUpiAmount(e.target.value)}
                    placeholder="e.g. 500"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-mono focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* WiFi Inputs */}
          {qrType === "wifi" && (
            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  WiFi Network Name (SSID) *
                </label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  placeholder="e.g. Home_WiFi_5G"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  WiFi Password
                </label>
                <input
                  type="text"
                  value={wifiPass}
                  onChange={(e) => setWifiPass(e.target.value)}
                  placeholder="e.g. secretpassword123"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-mono focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-1.5 font-medium text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="wifitype"
                    checked={wifiType === "WPA"}
                    onChange={() => setWifiType("WPA")}
                    className="text-amber-500"
                  />
                  <span>WPA/WPA2 (Standard)</span>
                </label>
                <label className="flex items-center gap-1.5 font-medium text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="wifitype"
                    checked={wifiType === "nopass"}
                    onChange={() => setWifiType("nopass")}
                    className="text-amber-500"
                  />
                  <span>No Password</span>
                </label>
              </div>
            </div>
          )}

          {/* Plain Text Input */}
          {qrType === "text" && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Text Message or Notes
              </label>
              <textarea
                rows={4}
                value={textVal}
                onChange={(e) => setTextVal(e.target.value)}
                placeholder="Type any message, address, serial number or coupon code..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm text-slate-900 focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>
          )}

          {/* Phone Input */}
          {qrType === "phone" && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Phone / Mobile Number
              </label>
              <input
                type="tel"
                value={phoneVal}
                onChange={(e) => setPhoneVal(e.target.value)}
                placeholder="e.g. +91 9876543210"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-amber-500 font-mono"
              />
            </div>
          )}

          {/* Email Input */}
          {qrType === "email" && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Recipient Email Address *
                </label>
                <input
                  type="email"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  placeholder="contact@business.com"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Subject Line
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Inquiry about services"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          )}

          {/* Color & Size Customization Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 border-b border-slate-200 pb-2">
              <Palette className="w-4 h-4 text-amber-600" />
              <span>QR Style & Dimensions</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Foreground Color */}
              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Pattern Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-8 h-8 rounded-md border border-slate-300 cursor-pointer p-0.5"
                  />
                  <span className="font-mono text-[11px] text-slate-700">{fgColor}</span>
                </div>
              </div>

              {/* Background Color */}
              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Background
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-8 h-8 rounded-md border border-slate-300 cursor-pointer p-0.5"
                  />
                  <span className="font-mono text-[11px] text-slate-700">{bgColor}</span>
                </div>
              </div>

              {/* Size */}
              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Export Size
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-xs text-slate-800"
                >
                  <option value={300}>300 × 300 px (Web)</option>
                  <option value={500}>500 × 500 px (Sharp)</option>
                  <option value={1000}>1000 × 1000 px (HD Print)</option>
                </select>
              </div>

              {/* Error correction */}
              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Error Correction
                </label>
                <select
                  value={errorLevel}
                  onChange={(e) => setErrorLevel(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-xs text-slate-800"
                >
                  <option value="L">Level L (7%)</option>
                  <option value="M">Level M (15%)</option>
                  <option value="Q">Level Q (25%)</option>
                  <option value="H">Level H (30% Best)</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Right Live Preview Box */}
        <div className="lg:col-span-5 bg-gradient-to-br from-amber-50/60 to-slate-50 p-6 rounded-2xl border border-amber-200/80 flex flex-col items-center justify-center text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
            Live QR Code Preview
          </span>

          <div 
            className="p-4 bg-white rounded-2xl shadow-md border border-slate-200 flex items-center justify-center"
            style={{ backgroundColor: bgColor }}
          >
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="Generated QR Code"
                className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-lg"
              />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center text-slate-300">
                <QrCode className="w-12 h-12 animate-pulse" />
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full max-w-xs">
            <button
              onClick={downloadQr}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download PNG ({size}px)</span>
            </button>
            <button
              onClick={copyToClipboard}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 py-3 px-3.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              title="Copy to Clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Direct static QR • Never expires</span>
          </div>
        </div>

      </div>

    </div>
  );
};
