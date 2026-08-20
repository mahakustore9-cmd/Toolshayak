import React, { useState } from "react";
import { 
  Calendar, 
  RotateCcw, 
  Gift, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  Sun,
  Flame,
  Star
} from "lucide-react";

export const AgeCalculatorTool: React.FC = () => {
  const todayStr = new Date().toISOString().split("T")[0];
  const [dob, setDob] = useState<string>("1998-05-15");
  const [targetDate, setTargetDate] = useState<string>(todayStr);
  const [result, setResult] = useState<any | null>(null);

  const getZodiacSign = (day: number, month: number) => {
    // month is 1-12
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { sign: "Aries (मेष)", element: "Fire" };
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { sign: "Taurus (वृषभ)", element: "Earth" };
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { sign: "Gemini (मिथुन)", element: "Air" };
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { sign: "Cancer (कर्क)", element: "Water" };
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { sign: "Leo (सिंह)", element: "Fire" };
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { sign: "Virgo (कन्या)", element: "Earth" };
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { sign: "Libra (तुला)", element: "Air" };
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { sign: "Scorpio (वृश्चिक)", element: "Water" };
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { sign: "Sagittarius (धनु)", element: "Fire" };
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { sign: "Capricorn (मकर)", element: "Earth" };
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { sign: "Aquarius (कुंभ)", element: "Air" };
    return { sign: "Pisces (मीन)", element: "Water" };
  };

  const calculateAge = () => {
    if (!dob || !targetDate) return;

    const birth = new Date(dob);
    const target = new Date(targetDate);

    if (birth > target) {
      alert("Birth date cannot be after the target date.");
      return;
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Total counts
    const diffTime = target.getTime() - birth.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    // Next Birthday
    let nextBday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < target) {
      nextBday = new Date(target.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysToNextBday = Math.ceil((nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));
    const nextBdayDayName = nextBday.toLocaleDateString("en-US", { weekday: "long" });

    // Day born
    const birthDayName = birth.toLocaleDateString("en-US", { weekday: "long" });
    const zodiac = getZodiacSign(birth.getDate(), birth.getMonth() + 1);

    setResult({
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      totalMinutes,
      daysToNextBday,
      nextBdayDayName,
      birthDayName,
      zodiac,
    });
  };

  const handleReset = () => {
    setDob("");
    setTargetDate(todayStr);
    setResult(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Input Pickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Date of Birth (DOB) *
          </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500 focus:bg-white"
          />
          <p className="text-[11px] text-slate-500 mt-1">Select your actual date of birth.</p>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Age At Date Of (For Govt / Exam Eligibility)
          </label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500 focus:bg-white"
          />
          <p className="text-[11px] text-slate-500 mt-1">Defaults to today, or set to exam cut-off date.</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={calculateAge}
          disabled={!dob || !targetDate}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-500/20 transition-all disabled:opacity-50 cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span>Calculate Exact Age</span>
        </button>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Calculated Result Breakdown */}
      {result && (
        <div className="space-y-6 pt-4 border-t border-slate-200 animate-in fade-in duration-200">
          
          {/* Main Big Age Banner */}
          <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Your Exact Age As of Selected Date
            </span>
            <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap pt-2">
              <div className="bg-white px-4 py-2.5 rounded-xl border border-emerald-200 shadow-2xs">
                <span className="text-3xl font-extrabold text-slate-900">{result.years}</span>
                <span className="block text-xs font-bold text-slate-500 uppercase">Years</span>
              </div>
              <div className="bg-white px-4 py-2.5 rounded-xl border border-emerald-200 shadow-2xs">
                <span className="text-3xl font-extrabold text-slate-900">{result.months}</span>
                <span className="block text-xs font-bold text-slate-500 uppercase">Months</span>
              </div>
              <div className="bg-white px-4 py-2.5 rounded-xl border border-emerald-200 shadow-2xs">
                <span className="text-3xl font-extrabold text-slate-900">{result.days}</span>
                <span className="block text-xs font-bold text-slate-500 uppercase">Days</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 font-medium pt-2">
              You were born on a <strong className="text-slate-900">{result.birthDayName}</strong>
            </p>
          </div>

          {/* Next Birthday & Zodiac Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl flex items-start gap-3">
              <div className="p-2.5 bg-amber-500 text-white rounded-xl">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-amber-900">Next Birthday Countdown</p>
                <p className="text-lg font-extrabold text-slate-900 mt-0.5">
                  {result.daysToNextBday === 0 ? "🎉 Today is your Birthday!" : `${result.daysToNextBday} Days Left`}
                </p>
                <p className="text-xs text-slate-500">
                  Falling on a {result.nextBdayDayName}
                </p>
              </div>
            </div>

            <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-xl flex items-start gap-3">
              <div className="p-2.5 bg-purple-600 text-white rounded-xl">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-purple-900">Astrology Zodiac Sign</p>
                <p className="text-lg font-extrabold text-slate-900 mt-0.5">
                  {result.zodiac.sign}
                </p>
                <p className="text-xs text-slate-500">
                  Element: {result.zodiac.element}
                </p>
              </div>
            </div>

          </div>

          {/* Lifetime Units Statistics Table */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Total Lifetime Summary in Other Units
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-center">
              
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-[11px] text-slate-500 font-medium">Total Months</p>
                <p className="text-base font-extrabold text-slate-800 mt-1">{result.totalMonths.toLocaleString()}</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-[11px] text-slate-500 font-medium">Total Weeks</p>
                <p className="text-base font-extrabold text-slate-800 mt-1">{result.totalWeeks.toLocaleString()}</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-[11px] text-slate-500 font-medium">Total Days</p>
                <p className="text-base font-extrabold text-slate-800 mt-1">{result.totalDays.toLocaleString()}</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-[11px] text-slate-500 font-medium">Total Hours</p>
                <p className="text-base font-extrabold text-slate-800 mt-1">{result.totalHours.toLocaleString()}</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl col-span-2 sm:col-span-1">
                <p className="text-[11px] text-slate-500 font-medium">Total Minutes</p>
                <p className="text-base font-extrabold text-slate-800 mt-1">{result.totalMinutes.toLocaleString()}</p>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
};
