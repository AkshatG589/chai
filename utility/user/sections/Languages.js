export default function Languages({ languages }) {
  if (!languages?.length) return null;

  return (
    <div className="p-6 rounded-xl bg-white/5 backdrop-blur-md shadow-lg border border-white/10">
      <h2 className="text-xl text-white font-medium mb-4">Languages</h2>

      {languages.map((l) => (
        <div key={l._id} className="flex justify-between text-gray-300 mb-2">
          <span>{l.language}</span>
          <span className="text-gray-400">{l.proficiency}</span>
        </div>
      ))}
    </div>
  );
}