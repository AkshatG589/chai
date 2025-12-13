export default function Education({ education }) {
  if (!education) return null;

  const { school10, school12, colleges } = education;

  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
      <h2 className="text-xl text-white font-semibold mb-6">Education</h2>

      {/* ----------- Schools (10th + 12th) ----------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* 10th */}
        {school10 && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-white font-semibold mb-1">10th Standard</h3>
            <p className="text-gray-300 font-medium">{school10.name}</p>
            <p className="text-gray-400 text-sm">
              {school10.city}, {school10.state}
            </p>
            <p className="text-gray-300 mt-2">
              <span className="text-white">Marks:</span> {school10.marks}%
            </p>
          </div>
        )}

        {/* 12th */}
        {school12 && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-white font-semibold mb-1">12th Standard</h3>
            <p className="text-gray-300 font-medium">{school12.name}</p>
            <p className="text-gray-400 text-sm">
              {school12.city}, {school12.state}
            </p>
            <p className="text-gray-300 mt-2">
              <span className="text-white">Marks:</span> {school12.marks}% •{" "}
              <span className="text-white">Stream:</span> {school12.stream}
            </p>
          </div>
        )}
      </div>

      {/* ----------- Colleges ----------- */}
      {colleges?.length > 0 && (
        <>
          <h3 className="text-lg text-white font-semibold mb-4">Higher Education</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((c, index) => (
              <div
                key={c._id || index}
                className="p-4 rounded-xl bg-neutral-900/60 border border-white/10 hover:border-white/20 transition"
              >
                <h4 className="text-white font-semibold text-lg mb-1">
                  {c.degree}
                </h4>

                <p className="text-gray-300 text-sm mb-1">
                  {c.branch}
                </p>

                <p className="text-gray-400 text-sm">
                  {c.name}
                </p>

                <p className="text-gray-500 text-sm">
                  {c.city}, {c.state}
                </p>

                <div className="mt-3 text-gray-300">
                  <span className="text-white">CGPA:</span> {c.cgpa}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}