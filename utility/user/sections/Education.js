export default function Education({ education }) {
  if (!education) return null;

  const { school10, school12, colleges } = education;

  return (
    <div className="p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
      <h2 className="text-xl text-white font-medium mb-4">Education</h2>

      {/* 10th */}
      {school10 && (
        <div className="mb-4 text-gray-300">
          <h3 className="font-semibold text-white">10th Standard</h3>
          <p>{school10.name} • {school10.city}, {school10.state}</p>
          <p>Marks: {school10.marks}%</p>
        </div>
      )}

      {/* 12th */}
      {school12 && (
        <div className="mb-4 text-gray-300">
          <h3 className="font-semibold text-white">12th Standard</h3>
          <p>{school12.name} • {school12.city}, {school12.state}</p>
          <p>Marks: {school12.marks}% • Stream: {school12.stream}</p>
        </div>
      )}

      {/* Colleges */}
      {colleges?.map((c) => (
        <div key={c._id} className="border-t border-white/10 pt-3 mt-3 text-gray-300">
          <h3 className="font-semibold text-white">{c.degree} — {c.branch}</h3>
          <p>{c.name} • {c.city}, {c.state}</p>
          <p>CGPA: {c.cgpa}</p>
        </div>
      ))}
    </div>
  );
}