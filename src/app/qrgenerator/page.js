"use client";
import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';

export const HomePage = () => {
  const [inputData, setInputData] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const qrCodeRef = useRef(null);

  const generateQRCode = async () => {
    try {
      setLoading(true);
      setError(null);

      // Additional validation if needed
      if (!inputData.trim()) {
        throw new Error('Please enter valid text or a link.');
      }

      // Simulating an asynchronous operation (e.g., API call to generate QR code)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // If successful, scroll to the QR code section
      qrCodeRef.current.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      setError('An error occurred while generating the QR code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inputData);
      // Optionally, show a success message
    } catch (err) {
      // Handle clipboard write error
      console.error('Unable to copy to clipboard', err);
    }
  };

  const downloadQRCode = () => {
    const canvas = qrCodeRef.current.firstChild;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl mb-6">QR Code Generator</h1>
        <form onSubmit={(e) => { e.preventDefault(); generateQRCode(); }}>
          <label className="block mb-4">
            Enter text or link:
            <input
              type="text"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              className="block w-full mt-1 p-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </label>
        </form>
        {loading && <p className="text-gray-500 mt-2" aria-live="polite" aria-atomic="true">Generating QR code... </p>}
        {error && <p className="text-red-500 mt-2" aria-live="assertive" aria-atomic="true">{error}</p>}
        {inputData && !loading && !error && (
          <div className="mb-4" ref={qrCodeRef}>
            <QRCode value={inputData} size={200} />
          </div>
        )}
        {inputData && !loading && !error && (
          <>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded focus:outline-none mt-2 mr-2"
              onClick={copyToClipboard}
            >
              Copy to Clipboard
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none mt-2"
              onClick={downloadQRCode}
            >
              Download QR Code
            </button>
          </>
        )}
      </div>
    </div>
  );
};