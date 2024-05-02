import React, { useState } from 'react';

function App() {
  const [siteUrl, setSiteUrl] = useState('');
  const [successUrl, setSuccessUrl] = useState('');
  const [rejectUrl, setRejectUrl] = useState('');
  const [appName, setAppName] = useState('');
  const [errors, setErrors] = useState({});

  const isValidUrl = (url) => {
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    return urlRegex.test(url);
  };

  const validate = () => {
    let tempErrors = {};
    if (!siteUrl) {
      tempErrors.siteUrl = 'Site URL is required';
    } else if (!isValidUrl(siteUrl)) {
      tempErrors.siteUrl = 'Enter a valid URL';
    }
    if (!successUrl) {
      tempErrors.successUrl = 'Success URL is required';
    } else if (!isValidUrl(successUrl)) {
      tempErrors.successUrl = 'Enter a valid URL';
    }
    if (!rejectUrl) {
      tempErrors.rejectUrl = 'Reject URL is required';
    } else if (!isValidUrl(rejectUrl)) {
      tempErrors.rejectUrl = 'Enter a valid URL';
    }
    if (!appName) {
      tempErrors.appName = 'App Name is required';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const normalizedSiteUrl = siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`;
      const authUrl = `${normalizedSiteUrl}wp-admin/authorize-application.php?app_name=${encodeURIComponent(appName)}&success_url=${encodeURIComponent(successUrl)}&reject_url=${encodeURIComponent(rejectUrl)}`;
      window.open(authUrl, '_blank');
    }
  };

  return (
    <div className="App flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Authorize Application</h2>
        <div>
          <label htmlFor="siteUrl" className="block">Site URL:</label>
          <input type="text" id="siteUrl" value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} className={`border p-2 w-full ${errors.siteUrl ? 'border-red-500' : ''}`}/>
          {errors.siteUrl && <p className="text-red-500 text-xs mt-1">{errors.siteUrl}</p>}
        </div>
        <div>
          <label htmlFor="successUrl" className="block">Success URL:</label>
          <input type="text" id="successUrl" value={successUrl} onChange={(e) => setSuccessUrl(e.target.value)} className={`border p-2 w-full ${errors.successUrl ? 'border-red-500' : ''}`}/>
          {errors.successUrl && <p className="text-red-500 text-xs mt-1">{errors.successUrl}</p>}
        </div>
        <div>
          <label htmlFor="rejectUrl" className="block">Reject URL:</label>
          <input type="text" id="rejectUrl" value={rejectUrl} onChange={(e) => setRejectUrl(e.target.value)} className={`border p-2 w-full ${errors.rejectUrl ? 'border-red-500' : ''}`}/>
          {errors.rejectUrl && <p className="text-red-500 text-xs mt-1">{errors.rejectUrl}</p>}
        </div>
        <div>
          <label htmlFor="appName" className="block">App Name:</label>
          <input type="text" id="appName" value={appName} onChange={(e) => setAppName(e.target.value)} className={`border p-2 w-full ${errors.appName ? 'border-red-500' : ''}`}/>
          {errors.appName && <p className="text-red-500 text-xs mt-1">{errors.appName}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full mt-4">Authorize</button>
      </form>
    </div>
  );
}

export default App;
