export default function Hobbies({ hobbies }) {
  if (!hobbies?.length) return null;

  return (
    <div className="p-6 rounded-xl bg-white/5 backdrop-blur-md shadow-lg border border-white/10">
      <h2 className="text-xl text-white font-medium mb-4">Hobbies</h2>

      <div className="flex flex-wrap gap-3">
        {hobbies.map((h, i) => (
          <span key={i} className="px-4 py-2 bg-white/10 text-white rounded-lg">
            {h}
          </span>
        ))}
      </div>
    </div>
  );
}