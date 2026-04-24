import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, Baby, Activity, RotateCcw, Syringe } from 'lucide-react';

const VACCINE_SCHEDULE = [
  { id: '1m', label: 'גיל חודש', type: 'months', value: 1 },
  { id: '6w', label: '6 שבועות', type: 'weeks', value: 6 },
  { id: '4m', label: '4 חודשים', type: 'months', value: 4 },
  { id: '6m', label: '6 חודשים', type: 'months', value: 6 },
  { id: '9m', label: '9 חודשים', type: 'months', value: 9 },
  { id: '12m', label: '12 חודשים', type: 'months', value: 12 },
];

// Add months without skipping short months (Jan 31 + 1 month → Feb 28/29)
function addMonths(date, m) {
  const d = new Date(date);
  const expectedMonth = d.getMonth() + m;
  d.setMonth(expectedMonth);
  if (d.getMonth() !== ((expectedMonth % 12) + 12) % 12) {
    d.setDate(0);
  }
  return d;
}

function formatHeDate(d) {
  return d.toLocaleDateString('he-IL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function calculateAge(bDateStr, tDateStr) {
  const birth = new Date(bDateStr);
  const target = new Date(tDateStr);
  birth.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  if (target < birth) {
    return { error: 'תאריך הבדיקה לא יכול להיות לפני תאריך הלידה' };
  }

  const diffInMs = target - birth;
  const totalDaysDiff = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDaysDiff / 7);
  const remainingDaysForTotalWeeks = totalDaysDiff % 7;

  const birthYear = birth.getFullYear();
  const birthMonth = birth.getMonth();
  const birthDay = birth.getDate();
  const targetYear = target.getFullYear();
  const targetMonth = target.getMonth();
  const targetDay = target.getDate();

  let months = (targetYear - birthYear) * 12 + (targetMonth - birthMonth);
  if (targetDay < birthDay) months--;

  const baseDate = addMonths(birth, months);
  const remainingDaysTotal = Math.floor((target - baseDate) / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(remainingDaysTotal / 7);
  const days = remainingDaysTotal % 7;

  return {
    months,
    weeks,
    days,
    totalWeeks,
    totalDaysRemaining: remainingDaysForTotalWeeks,
    totalDays: totalDaysDiff,
    error: null,
  };
}

export default function App() {
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const [birthDate, setBirthDate] = useState('');
  const [targetDate, setTargetDate] = useState(todayStr);
  const [vaccineResult, setVaccineResult] = useState(null);

  const ageData = useMemo(() => {
    if (!birthDate || !targetDate) return null;
    return calculateAge(birthDate, targetDate);
  }, [birthDate, targetDate]);

  // Clear vaccine result whenever birth date changes
  useEffect(() => {
    setVaccineResult(null);
  }, [birthDate]);

  const handleVaccineClick = (vaccine) => {
    if (!birthDate) return;
    const birth = new Date(birthDate);
    let targetD;
    if (vaccine.type === 'months') {
      targetD = addMonths(birth, vaccine.value);
    } else {
      targetD = new Date(birth);
      targetD.setDate(targetD.getDate() + vaccine.value * 7);
    }
    setVaccineResult({
      label: vaccine.label,
      id: vaccine.id,
      dateStr: formatHeDate(targetD),
    });
  };

  const handleReset = () => {
    setBirthDate('');
    setTargetDate(todayStr);
    setVaccineResult(null);
  };

  return (
    <div dir="rtl" className="min-h-full bg-gradient-to-b from-slate-100 to-slate-50 flex items-center justify-center p-4 text-slate-800">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-xl overflow-hidden border border-slate-200">

        {/* Header */}
        <div className="bg-gradient-to-br from-teal-600 to-teal-700 p-6 text-white text-center">
          <Baby className="w-12 h-12 mx-auto mb-2 opacity-95" strokeWidth={1.8} />
          <h1 className="text-2xl font-bold tracking-tight">מחשבון גיל - טיפת חלב</h1>
          <p className="text-teal-50/90 text-sm mt-1">חישוב מדויק בחודשים, שבועות וימים</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">תאריך לידה</label>
              <div className="relative">
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  max={todayStr}
                  className="w-full p-3 ps-10 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-lg bg-white"
                />
                <Calendar className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">תאריך בדיקה (ברירת מחדל: היום)</label>
              <div className="relative">
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full p-3 ps-10 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-lg bg-white"
                />
                <Activity className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Empty state hint */}
          {!birthDate && (
            <div className="text-center text-slate-500 text-sm py-6 border-2 border-dashed border-slate-200 rounded-2xl">
              ← הזיני תאריך לידה כדי להתחיל
            </div>
          )}

          {/* Results */}
          {ageData && !ageData.error && (
            <div className="space-y-4 fade-up">
              {/* Primary age card */}
              <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 shadow-sm">
                <h3 className="text-teal-800 font-bold text-sm mb-3">גיל מדויק</h3>
                <div className="grid grid-cols-3 text-center divide-x divide-x-reverse divide-teal-200">
                  <div className="px-2">
                    <span className="block text-3xl font-extrabold text-teal-600 tabular-nums">{ageData.months}</span>
                    <span className="text-teal-800 text-sm font-medium">חודשים</span>
                  </div>
                  <div className="px-2">
                    <span className="block text-3xl font-extrabold text-teal-600 tabular-nums">{ageData.weeks}</span>
                    <span className="text-teal-800 text-sm font-medium">שבועות</span>
                  </div>
                  <div className="px-2">
                    <span className="block text-3xl font-extrabold text-teal-600 tabular-nums">{ageData.days}</span>
                    <span className="text-teal-800 text-sm font-medium">ימים</span>
                  </div>
                </div>
              </div>

              {/* Total weeks card */}
              <div className="bg-slate-100 border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-slate-700 font-bold text-sm">גיל לחיסונים (בשבועות)</h3>
                  <p className="text-slate-500 text-xs mt-0.5">סה"כ שבועות וימים מהלידה</p>
                </div>
                <div className="text-end whitespace-nowrap">
                  <span className="text-2xl font-black text-slate-800 tabular-nums">{ageData.totalWeeks}</span>
                  <span className="text-slate-600 text-sm font-medium mx-1">שבועות</span>
                  {ageData.totalDaysRemaining > 0 && (
                    <>
                      <span className="text-slate-400 font-bold mx-1">+</span>
                      <span className="text-xl font-bold text-slate-700 tabular-nums">{ageData.totalDaysRemaining}</span>
                      <span className="text-slate-600 text-sm font-medium mx-1">ימים</span>
                    </>
                  )}
                </div>
              </div>

              {/* Vaccine calculator */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <Syringe className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-slate-700 font-bold text-sm">מועדי חיסונים משוערים</h3>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {VACCINE_SCHEDULE.map((vac) => (
                    <button
                      key={vac.id}
                      onClick={() => handleVaccineClick(vac)}
                      className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
                        vaccineResult?.id === vac.id
                          ? 'bg-indigo-600 text-white shadow-md scale-105'
                          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 active:scale-95'
                      }`}
                    >
                      {vac.label}
                    </button>
                  ))}
                </div>

                {vaccineResult && (
                  <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center pop-in">
                    <p className="text-indigo-800 text-sm font-medium mb-1">
                      התאריך לחיסון {vaccineResult.label}:
                    </p>
                    <p className="text-3xl font-black text-indigo-600 tracking-wide tabular-nums">
                      {vaccineResult.dateStr}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Error */}
          {ageData && ageData.error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 text-center text-sm font-medium fade-up">
              {ageData.error}
            </div>
          )}

          {/* Reset */}
          {(birthDate || vaccineResult) && (
            <button
              onClick={handleReset}
              className="w-full mt-2 flex items-center justify-center gap-2 py-3 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              נקה נתונים
            </button>
          )}
        </div>

        <footer className="px-6 pb-5 pt-1 text-center text-[11px] text-slate-400">
          חישוב לעזרה בלבד — אינו מחליף ייעוץ רפואי
        </footer>
      </div>
    </div>
  );
}
