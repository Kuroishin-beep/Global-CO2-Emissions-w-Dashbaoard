import React, { useState } from 'react';

function ExpandableSection({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        className="text-sm text-blue-400 hover:underline focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        {open ? "🔽 Hide" : "▶️ Learn more"} – {title}
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

export default ExpandableSection;
