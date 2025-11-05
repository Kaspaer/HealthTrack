import { useEffect, useState } from "react";
import { getActivities, addActivity, deleteActivity } from "../lib/api";

type Activity = { id: number; name: string; duration: number; calories: number };

export default function LogActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activityName, setActivityName] = useState("");
  const [duration, setDuration] = useState<string>("");
  const [cal, setCal] = useState<string>("");

  const [loading, setLoading] = useState(true);
  const [netErr, setNetErr] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getActivities();
        setActivities(data);
      } catch {
        setNetErr("تعذّر جلب النشاطات. حاول مجددًا.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityName.trim() || !duration.trim() || !cal.trim() || Number(duration) <= 0 || Number(cal) <= 0) {
      setNetErr("أكمل الحقول بشكل صحيح (مدة وسعرات > 0).");
      return;
    }
    try {
      setSaving(true);
      const newAct = await addActivity({
        name: activityName.trim(),
        duration: Number(duration),
        calories: Number(cal),
      });
      setActivities((prev) => [newAct, ...prev]);
      setActivityName("");
      setDuration("");
      setCal("");
      setNetErr(null);
    } catch {
      setNetErr("فشل حفظ النشاط.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id);
      await deleteActivity(id);
      setActivities((prev) => prev.filter((a) => a.id !== id));
    } catch {
      setNetErr("فشل حذف النشاط.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white px-4 flex items-start justify-center py-10">
      <div className="bg-gray-900/70 backdrop-blur-xl shadow-2xl rounded-2xl w-full max-w-2xl p-8 border border-pink-600/20">
        {loading && <div className="mb-6 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 px-4 py-3 text-sm">جاري التحميل…</div>}
        {netErr && !loading && <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 text-red-300 px-4 py-3 text-sm">{netErr}</div>}

        <h2 className="text-2xl font-bold text-center text-pink-400 mb-8">🏃‍♀️ تسجيل نشاط جديد</h2>

        <form onSubmit={handleAdd} className="space-y-4">
          <input
            type="text"
            placeholder="نوع النشاط (جري، مشي، سباحة...)"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-600 outline-none"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="المدة (دقيقة)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-600 outline-none"
            />
            <input
              type="number"
              placeholder="السعرات المحروقة"
              value={cal}
              onChange={(e) => setCal(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-600 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 bg-pink-600 hover:bg-pink-700 disabled:opacity-60 text-white font-semibold rounded-lg transition"
          >
            {saving ? "جاري الحفظ..." : "حفظ النشاط"}
          </button>
        </form>

        <h3 className="text-lg font-semibold text-pink-400 mt-8 mb-4">🏅 النشاطات</h3>

        {!loading && activities.length === 0 ? (
          <p className="text-gray-400 text-center text-sm">لا يوجد نشاطات بعد.</p>
        ) : (
          <ul className="space-y-3">
            {activities.map((a) => (
              <li key={a.id} className="flex justify-between items-center bg-gray-800/70 p-3 rounded-lg border border-gray-700">
                <div>
                  <p className="font-semibold">{a.name}</p>
                  <p className="text-xs text-gray-400">
                    {a.duration} دقيقة • {a.calories} سعرة
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(a.id)}
                  disabled={deletingId === a.id}
                  className="text-red-400 hover:text-red-600 disabled:opacity-60 transition"
                  aria-label="حذف"
                  title="حذف"
                >
                  {deletingId === a.id ? "…حذف" : "❌"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
