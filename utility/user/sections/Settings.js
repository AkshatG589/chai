export default function Settings({ settings }) {
  if (!settings) return null;

  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
      <h2 className="text-xl text-white font-medium mb-4">Profile Settings</h2>

      {Object.entries(settings).map(([key, value]) => (
        <p key={key} className="text-gray-300 mb-1">
          {key} : {value ? "Enabled" : "Disabled"}
        </p>
      ))}
    </div>
  );
}