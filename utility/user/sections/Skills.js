export default function Skills({ skills }) {
  if (!skills?.length) return null;

  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
      <h2 className="text-xl text-white font-medium mb-4">Skills</h2>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill, i) => (
          <span key={i} className="px-4 py-2 bg-white/10 text-white rounded-full text-sm">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}