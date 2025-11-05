import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; pass?: string; confirm?: string }>({});
  const [banner, setBanner] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    const emailOk = /\S+@\S+\.\S+/.test(email);
    if (!name.trim()) e.name = "الرجاء إدخال الاسم.";
    if (!email.trim()) e.email = "الرجاء إدخال البريد الإلكتروني.";
    else if (!emailOk) e.email = "صيغة البريد الإلكتروني غير صحيحة.";
    if (!pass.trim()) e.pass = "الرجاء إدخال كلمة المرور.";
    else if (pass.length < 6) e.pass = "كلمة المرور يجب أن تكون 6 أحرف على الأقل.";
    if (!confirm.trim()) e.confirm = "الرجاء تأكيد كلمة المرور.";
    else if (confirm !== pass) e.confirm = "كلمتا المرور غير متطابقتين.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBanner(null);
    if (!validate()) {
      setBanner("تحقّق من الحقول المطلوبة.");
      return;
    }
    try {
      setSubmitting(true);
     
      login(email.trim());
      nav("/dashboard", { replace: true });
    } catch {
      setBanner("فشل إنشاء الحساب. حاول لاحقًا.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white px-4 flex items-start justify-center py-10">
      <div className="bg-gray-900/80 backdrop-blur-xl shadow-2xl rounded-2xl w-full max-w-md p-8 border border-pink-600/20">
        {banner && (
          <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 text-red-300 px-4 py-3 text-sm">
            {banner}
          </div>
        )}

        <h2 className="text-2xl font-bold text-center text-pink-400 mb-8">إنشاء حساب</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="الاسم الكامل"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg bg-gray-800 text-white border outline-none transition
                ${errors.name ? "border-red-500 focus:ring-2 focus:ring-red-600" : "border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-600"}`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg bg-gray-800 text-white border outline-none transition
                ${errors.email ? "border-red-500 focus:ring-2 focus:ring-red-600" : "border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-600"}`}
            />
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="كلمة المرور"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg bg-gray-800 text-white border outline-none transition
                ${errors.pass ? "border-red-500 focus:ring-2 focus:ring-red-600" : "border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-600"}`}
            />
            {errors.pass && <p className="mt-1 text-xs text-red-400">{errors.pass}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="تأكيد كلمة المرور"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg bg-gray-800 text-white border outline-none transition
                ${errors.confirm ? "border-red-500 focus:ring-2 focus:ring-red-600" : "border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-600"}`}
            />
            {errors.confirm && <p className="mt-1 text-xs text-red-400">{errors.confirm}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-pink-600 hover:bg-pink-700 disabled:opacity-60 text-white font-semibold rounded-lg transition"
          >
            {submitting ? "جاري الإنشاء..." : "إنشاء حساب"}
          </button>
        </form>
      </div>
    </div>
  );
}
