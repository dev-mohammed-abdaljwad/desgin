import { Link } from 'react-router';
import { Lock } from 'lucide-react';
import { useState } from 'react';

export function AdminAccessButton() {
  const [show, setShow] = useState(false);

  // Show button on triple click anywhere
  const handleTripleClick = () => {
    setShow(true);
    setTimeout(() => setShow(false), 5000);
  };

  return (
    <>
      <div onClick={handleTripleClick} className="fixed inset-0 pointer-events-none z-0" />
      
      {show && (
        <Link
          to="/admin"
          className="fixed bottom-24 right-6 z-50 group px-4 py-3 bg-gradient-to-r from-gold to-secondary text-white rounded-xl font-semibold shadow-2xl hover:shadow-gold/50 transition-all transform hover:scale-105 flex items-center gap-2"
        >
          <Lock className="w-5 h-5" />
          <span className="hidden sm:inline">Admin Access</span>
        </Link>
      )}
    </>
  );
}
