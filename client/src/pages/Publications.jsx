import React from 'react';

export default function Publications() {
  return (
    <section className="container mx-auto py-6 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-800 mb-8">Publications</h1>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8 mb-10">
        <div className="flex items-center mb-6">
          <img src="https://cdn-icons-png.flaticon.com/512/3039/3039386.png" alt="Publication Icon" className="w-12 h-12 mr-4" />
          <h2 className="text-2xl font-semibold text-indigo-700">Selected Publications</h2>
        </div>
        
        <p className="text-lg text-gray-700 mb-4">
          Selected papers will be considered for publication in reputed journals and indexed conference proceedings, subject to review.
        </p>
        
        <div className="flex flex-col md:flex-row gap-8 mt-10">
          <div className="bg-white rounded-lg shadow-md p-6 flex-1">
            <div className="flex items-center mb-4">
              <img src="https://cdn-icons-png.flaticon.com/512/5833/5833289.png" alt="Conference Icon" className="w-8 h-8 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">Conference Proceedings</h3>
            </div>
            <p className="text-gray-600">
              ICAEBMS-2026 Proceedings will be submitted to the Web of Science Book Citation Index (BkCI) for evaluation and indexing purposes.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 flex-1">
            <div className="flex items-center mb-4">
              <img src="https://cdn-icons-png.flaticon.com/512/2541/2541988.png" alt="Journal Icon" className="w-8 h-8 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">Journal Publication</h3>
            </div>
            <p className="text-gray-600">
              Outstanding papers may be selected for publication in Scopus-indexed journals following an additional review process.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-900 text-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-center gap-4 mb-4">
          <img src="https://cdn-icons-png.flaticon.com/512/5968/5968770.png" alt="Scopus" className="h-10" />
          <img src="https://cdn-icons-png.flaticon.com/512/2560/2560393.png" alt="Web of Science" className="h-10" />
        </div>
        <p className="text-center text-blue-100 italic">
          <span className="font-semibold">Note:</span> ICAEBMS-2026 Proceedings will be submitted to the Web of Science Book Citation Index (BkCI) and Scopus for evaluation and indexing purposes (T&C apply).
        </p>
      </div>
    </section>
  );
}
