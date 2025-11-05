import { useEffect, useState } from "react";
import { getMeals, addMeal, deleteMeal } from "../lib/api";

type Meal = { id: number; name: string; calories: number };

export default function LogMeal() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState<string>("");

  const [loading, setLoading] = useState(true);         
  const [netErr, setNetErr] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);          
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getMeals();
        setMeals(data);
      } catch {
        setNetErr("تعذّر جلب الوجبات. حاول مجددًا.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mealName.trim() || !calories.trim() || Number(calories) <= 0) {
      setNetErr("الرجاء إدخال اسم الوجبة والسعرات بشكل صحيح.");
      return;
    }
    try {
      setSaving(true);
      const newMeal = await addMeal({ name: mealName.trim(), calories: Number(calories) });
      setMeals((prev) => [newMeal, ...prev]);
      setMealName("");
      setCalories("");
      setNetErr(null);
    } catch {
      setNetErr("فشل حفظ الوجبة.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id);
      await deleteMeal(id);
      setMeals((prev) => prev.filter((m) => m.id !== id));
    } catch {
      setNetErr("فشل حذف الوجبة.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white px-4 flex items-start justify-center py-10">
      <div className="bg-gray-900/70 backdrop-blur-xl shadow-2xl rounded-2xl w-full max-w-2xl p-8 border border-pink-600/20">
       
        {loading && <div className="mb-6 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 px-4 py-3 text-sm">جاري التحميل…</div>}
        {netErr && !loading && <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 text-red-300 px-4 py-3 text-sm">{netErr}</div>}

        <h2 className="text-2xl font-bold text-center text-pink-400 mb-8">🍽️ تسجيل وجبة جديدة</h2>

        <form onSubmit={handleAdd} className="space-y-4">
          <input
            type="text"
            placeholder="اسم الوجبة"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-600 outline-none"
          />
          <input
            type="number"
            placeholder="عدد السعرات الحرارية"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-600 outline-none"
          />
          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 bg-pink-600 hover:bg-pink-700 disabled:opacity-60 text-white font-semibold rounded-lg transition"
          >
            {saving ? "جاري الحفظ..." : "حفظ الوجبة"}
          </button>
        </form>

        <h3 className="text-lg font-semibold text-pink-400 mt-8 mb-4">🍱 الوجبات</h3>

        {!loading && meals.length === 0 ? (
          <p className="text-gray-400 text-center text-sm">لا توجد وجبات بعد.</p>
        ) : (
          <ul className="space-y-3">
            {meals.map((meal) => (
              <li key={meal.id} className="flex justify-between items-center bg-gray-800/70 p-3 rounded-lg border border-gray-700">
                <div>
                  <p className="font-semibold">{meal.name}</p>
                  <p className="text-xs text-gray-400">{meal.calories} سعرة حرارية</p>
                </div>
                <button
                  onClick={() => handleDelete(meal.id)}
                  disabled={deletingId === meal.id}
                  className="text-red-400 hover:text-red-600 disabled:opacity-60 transition"
                  aria-label="حذف"
                  title="حذف"
                >
                  {deletingId === meal.id ? "…حذف" : "❌"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
