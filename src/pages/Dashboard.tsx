import Header from "../components/Header";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Sun", calories: 220 },
  { day: "Mon", calories: 180 },
  { day: "Tue", calories: 300 },
  { day: "Wed", calories: 250 },
  { day: "Thu", calories: 200 },
  { day: "Fri", calories: 280 },
  { day: "Sat", calories: 320 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <main className="p-6">
        <h2 className="text-2xl font-bold mb-4">🏃 Weekly Progress</h2>
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="#ccc" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="calories" stroke="#ec4899" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}
