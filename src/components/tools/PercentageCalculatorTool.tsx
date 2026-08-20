import React, { useState } from "react";
import { 
  Percent, 
  Copy, 
  Check, 
  RotateCcw, 
  HelpCircle, 
  ArrowRight, 
  Sparkles,
  DollarSign,
  TrendingUp,
  Tag
} from "lucide-react";

type CalcMode = "x-percent-of-y" | "x-is-what-percent-of-y" | "percent-change" | "discount" | "profit-loss";

export const PercentageCalculatorTool: React.FC = () => {
  const [activeMode, setActiveMode] = useState<CalcMode>("x-percent-of-y");

  // Mode A: What is X% of Y?
  const [aX, setAX] = useState<string>("18");
  const [aY, setAY] = useState<string>("5000");

  // Mode B: X is what % of Y?
  const [bX, setBX] = useState<string>("450");
  const [bY, setBY] = useState<string>("600");

  // Mode C: % Change from X to Y
  const [cX, setCX] = useState<string>("80");
  const [cY, setCY] = useState<string>("100");

  // Mode D: Discount Calculator
  const [dPrice, setDPrice] = useState<string>("1999");
  const [dDiscount, setDDiscount] = useState<string>("30");

  // Mode E: Profit / Loss
  const [eCost, setECost] = useState<string>("800");
  const [eSell, setESell] = useState<string>("1200");

  const [copied, setCopied] = useState(false);

  const copyResult = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculations
  const renderCalculationA = () => {
    const x = parseFloat(aX);
    const y = parseFloat(aY);
    const isValid = !isNaN(x) && !isNaN(y);
    const ans = isValid ? (x * y) / 100 : 0;
    const formulaStr = `Formula: (X × Y) ÷ 100 = (${x} × ${y}) ÷ 100 = ${ans.toFixed(2)}`;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Percentage (X %)</label>
            <input
              type="number"
              value={aX}
              onChange={(e) => setAX(e.target.value)}
              placeholder="e.g. 18"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-base font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Of Number (Y)</label>
            <input
              type="number"
              value={aY}
              onChange={(e) => setAY(e.target.value)}
              placeholder="e.g. 5000"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-base font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {isValid && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Answer</span>
              <button
                onClick={() => copyResult(`${ans}`)}
                className="text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <p className="text-2xl font-extrabold text-emerald-900">
              {x}% of {y} = <span className="text-emerald-600">{Number(ans.toFixed(4))}</span>
            </p>
            <p className="text-xs font-mono text-slate-600 bg-white/70 p-2 rounded-lg border border-emerald-100">
              {formulaStr}
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderCalculationB = () => {
    const x = parseFloat(bX);
    const y = parseFloat(bY);
    const isValid = !isNaN(x) && !isNaN(y) && y !== 0;
    const ans = isValid ? (x / y) * 100 : 0;
    const formulaStr = `Formula: (X ÷ Y) × 100 = (${x} ÷ ${y}) × 100 = ${ans.toFixed(2)}%`;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Number (X - e.g. Marks Obtained)</label>
            <input
              type="number"
              value={bX}
              onChange={(e) => setBX(e.target.value)}
              placeholder="e.g. 450"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-base font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Total Base (Y - e.g. Maximum Marks)</label>
            <input
              type="number"
              value={bY}
              onChange={(e) => setBY(e.target.value)}
              placeholder="e.g. 600"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-base font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {isValid && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Result</span>
              <button
                onClick={() => copyResult(`${ans.toFixed(2)}%`)}
                className="text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <p className="text-2xl font-extrabold text-emerald-900">
              {x} is <span className="text-emerald-600">{ans.toFixed(2)}%</span> of {y}
            </p>
            <p className="text-xs font-mono text-slate-600 bg-white/70 p-2 rounded-lg border border-emerald-100">
              {formulaStr}
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderCalculationC = () => {
    const x = parseFloat(cX);
    const y = parseFloat(cY);
    const isValid = !isNaN(x) && !isNaN(y) && x !== 0;
    const diff = y - x;
    const percentChange = isValid ? (diff / Math.abs(x)) * 100 : 0;
    const isIncrease = diff >= 0;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Initial Value (X)</label>
            <input
              type="number"
              value={cX}
              onChange={(e) => setCX(e.target.value)}
              placeholder="e.g. 80"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-base font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">New Value (Y)</label>
            <input
              type="number"
              value={cY}
              onChange={(e) => setCY(e.target.value)}
              placeholder="e.g. 100"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-base font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {isValid && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Percentage Change</span>
            <p className="text-2xl font-extrabold text-emerald-900">
              {isIncrease ? "📈 Increase of" : "📉 Decrease of"} <span className={isIncrease ? "text-emerald-600" : "text-rose-600"}>{Math.abs(percentChange).toFixed(2)}%</span>
            </p>
            <p className="text-xs font-mono text-slate-600 bg-white/70 p-2 rounded-lg border border-emerald-100">
              Formula: [({y} - {x}) ÷ {x}] × 100 = {diff > 0 ? `+${diff}` : diff} ÷ {x} × 100 = {percentChange.toFixed(2)}%
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderCalculationD = () => {
    const price = parseFloat(dPrice);
    const disc = parseFloat(dDiscount);
    const isValid = !isNaN(price) && !isNaN(disc);
    const savedAmount = isValid ? (price * disc) / 100 : 0;
    const finalPrice = isValid ? price - savedAmount : 0;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Original Price (₹)</label>
            <input
              type="number"
              value={dPrice}
              onChange={(e) => setDPrice(e.target.value)}
              placeholder="e.g. 1999"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-base font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Discount (% Off)</label>
            <input
              type="number"
              value={dDiscount}
              onChange={(e) => setDDiscount(e.target.value)}
              placeholder="e.g. 30"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-base font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {isValid && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3 text-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Discount Summary</span>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-white rounded-xl border border-emerald-200">
                <p className="text-xs text-slate-500">You Save (Off)</p>
                <p className="text-xl font-extrabold text-emerald-600">₹{savedAmount.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-emerald-300">
                <p className="text-xs text-emerald-700 font-bold">Final Price You Pay</p>
                <p className="text-xl font-extrabold text-slate-900">₹{finalPrice.toFixed(2)}</p>
              </div>
            </div>
            <p className="text-xs font-mono text-slate-600 bg-white/70 p-2 rounded-lg border border-emerald-100">
              Formula: ₹{price} - (₹{price} × {disc}%) = ₹{finalPrice.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderCalculationE = () => {
    const cost = parseFloat(eCost);
    const sell = parseFloat(eSell);
    const isValid = !isNaN(cost) && !isNaN(sell) && cost !== 0;
    const diff = sell - cost;
    const isProfit = diff >= 0;
    const marginPercent = isValid ? (diff / cost) * 100 : 0;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Cost Price (CP in ₹)</label>
            <input
              type="number"
              value={eCost}
              onChange={(e) => setECost(e.target.value)}
              placeholder="e.g. 800"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-base font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Selling Price (SP in ₹)</label>
            <input
              type="number"
              value={eSell}
              onChange={(e) => setESell(e.target.value)}
              placeholder="e.g. 1200"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-base font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {isValid && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3 text-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Profit / Loss Result</span>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <p className="text-xs text-slate-500">{isProfit ? "Net Profit" : "Net Loss"}</p>
                <p className={`text-xl font-extrabold ${isProfit ? "text-emerald-600" : "text-rose-600"}`}>
                  ₹{Math.abs(diff).toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <p className="text-xs text-slate-500">Margin (%)</p>
                <p className={`text-xl font-extrabold ${isProfit ? "text-emerald-600" : "text-rose-600"}`}>
                  {marginPercent.toFixed(2)}%
                </p>
              </div>
            </div>
            <p className="text-xs font-mono text-slate-600 bg-white/70 p-2 rounded-lg border border-emerald-100">
              Formula: [({sell} - {cost}) ÷ {cost}] × 100 = {marginPercent.toFixed(2)}%
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* 5 Mode Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveMode("x-percent-of-y")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeMode === "x-percent-of-y"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          <span>What is X% of Y?</span>
        </button>

        <button
          onClick={() => setActiveMode("x-is-what-percent-of-y")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeMode === "x-is-what-percent-of-y"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          <span>X is what % of Y? (Marks)</span>
        </button>

        <button
          onClick={() => setActiveMode("percent-change")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeMode === "percent-change"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          <span>% Increase / Decrease</span>
        </button>

        <button
          onClick={() => setActiveMode("discount")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeMode === "discount"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          <Tag className="w-3.5 h-3.5" />
          <span>Discount & Final Price</span>
        </button>

        <button
          onClick={() => setActiveMode("profit-loss")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeMode === "profit-loss"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Profit / Loss %</span>
        </button>
      </div>

      {/* Render active calculation card */}
      <div className="pt-2">
        {activeMode === "x-percent-of-y" && renderCalculationA()}
        {activeMode === "x-is-what-percent-of-y" && renderCalculationB()}
        {activeMode === "percent-change" && renderCalculationC()}
        {activeMode === "discount" && renderCalculationD()}
        {activeMode === "profit-loss" && renderCalculationE()}
      </div>

    </div>
  );
};
