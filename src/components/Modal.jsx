// Modal.jsx

import React from 'react';

const Modal = ({ onClose, trailerKey }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-3xl mx-auto my-6">
        {/* Modal content */}
        <div className="border rounded-lg shadow-lg bg-black w-full p-8">
          <span
            className="absolute top-0 right-0 cursor-pointer text-3xl font-semibold leading-none outline-none focus:outline-none m-4"
            onClick={onClose}
          >
            &times;
          </span>
          {/* Embed YouTube video */}
          {trailerKey && (
            <iframe
              className="w-full h-64 md:h-96"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;




