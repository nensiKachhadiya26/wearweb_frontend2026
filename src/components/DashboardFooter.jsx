import React from 'react';

const DashboardFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        
        {/* ડાબી બાજુ - Copyright */}
        <div>
          <span>© {new Date().getFullYear()} </span>
          <span className="font-semibold text-pink-600">Wear Web</span>. All rights reserved.
        </div>

        {/* જમણી બાજુ - Support/Info */}
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-pink-600 transition">Help Center</a>
          <a href="#" className="hover:text-pink-600 transition">Terms</a>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
            System Online
          </span>
        </div>

      </div>
    </footer>
  );
};

export default DashboardFooter;