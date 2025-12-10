"use client";

export default function EditSettings({ form, setForm }) {
  const toggle = (key) => {
    setForm({
      ...form,
      settings: {
        ...form.settings,
        [key]: !form.settings[key],
      },
    });
  };

  const settings = form.settings;

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <h3 className="text-lg text-white font-semibold mb-3">Settings</h3>

      {[
        "showEmail",
        "showSocialLinks",
        "showSkills",
        "allowMessages",
      ].map((key) => (
        <div key={key} className="flex justify-between items-center mb-3">
          <span className="text-gray-300">{key}</span>

          <button
            onClick={() => toggle(key)}
            className={`w-12 h-6 rounded-full transition ${
              settings[key]
                ? "bg-green-500"
                : "bg-neutral-600"
            }`}
          >
            <div
              className={`h-5 w-5 bg-white rounded-full transition transform ${
                settings[key] ? "translate-x-6" : "translate-x-1"
              }`}
            ></div>
          </button>
        </div>
      ))}
    </div>
  );
}