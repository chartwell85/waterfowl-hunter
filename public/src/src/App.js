import React, { useState, useEffect } from 'react';

const WaterfowlApp = () => {
  const [activeTab, setActiveTab] = useState('migration');
  const [location, setLocation] = useState('Loading...');
  const [reports, setReports] = useState([
    { id: 1, user: 'Hunter_Mike', species: 'Mallards', count: '50+ birds', time: '2 hours ago' },
    { id: 2, user: 'DuckDog_Dan', species: 'Teal', count: '20+ birds', time: '4 hours ago' }
  ]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setLocation('Central Flyway - Nebraska'),
        () => setLocation('Central Flyway - Nebraska')
      );
    }
  }, []);

  const addReport = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newReport = {
      id: Date.now(),
      user: 'You',
      species: formData.get('species'),
      count: formData.get('count'),
      time: 'Just now'
    };
    setReports([newReport, ...reports]);
    setShowForm(false);
    alert('Report added successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-bold">🦆 Waterfowl Pro</h1>
        <p className="text-blue-100">📍 {location}</p>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b flex">
        {['migration', 'journal', 'utils'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'migration' && (
          <div>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Migration Status</h2>
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                <strong>Peak Migration Active!</strong> Large flights reported moving south.
              </div>
              
              <h3 className="font-bold mb-4">Recent Reports ({reports.length})</h3>
              <div className="space-y-3 mb-4">
                {reports.map(report => (
                  <div key={report.id} className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{report.species} - {report.count}</p>
                        <p className="text-sm text-gray-600">by {report.user}</p>
                      </div>
                      <span className="text-xs text-gray-500">{report.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => setShowForm(!showForm)}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700"
              >
                {showForm ? 'Cancel' : '➕ Submit Migration Report'}
              </button>

              {showForm && (
                <form onSubmit={addReport} className="mt-4 space-y-4 p-4 border rounded-lg bg-gray-50">
                  <div>
                    <label className="block text-sm font-medium mb-1">Species</label>
                    <select name="species" required className="w-full p-2 border rounded">
                      <option value="">Select species</option>
                      <option value="Mallards">Mallards</option>
                      <option value="Teal">Teal</option>
                      <option value="Pintails">Pintails</option>
                      <option value="Geese">Geese</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Count</label>
                    <select name="count" required className="w-full p-2 border rounded">
                      <option value="">Select count</option>
                      <option value="1-5 birds">1-5 birds</option>
                      <option value="10-20 birds">10-20 birds</option>
                      <option value="20+ birds">20+ birds</option>
                      <option value="50+ birds">50+ birds</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded font-medium">
                    Submit Report
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {activeTab === 'journal' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">📖 Hunt Journal</h2>
            <div className="text-center py-8 text-gray-500">
              <p>Hunt logging feature coming soon!</p>
              <p className="text-sm mt-2">Track your hunts, scores, and photos</p>
            </div>
          </div>
        )}

        {activeTab === 'utils' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">🔧 Hunting Utils</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🌡️</div>
                <div className="text-xl font-bold">42°F</div>
                <div className="text-sm text-gray-600">Temperature</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">💨</div>
                <div className="text-xl font-bold">15 mph NW</div>
                <div className="text-sm text-gray-600">Wind</div>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Hunt Quality Score</span>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full font-bold">9/10</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">Excellent conditions for waterfowl!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaterfowlApp;
