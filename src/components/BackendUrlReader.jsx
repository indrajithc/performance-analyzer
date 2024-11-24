import React, { useState } from "react";
import { useForm } from 'react-hook-form';


const BackendUrl = ({ isOpen, onClose, onSubmit }) => {
  

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onBlur",
  });

  const onSubmitForm = (data) => {
    onSubmit(data.url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6 relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Enter URL</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div>
            <input
              type="text"
              placeholder="https://example.com"
              {...register('url', {
                required: "URL is required",
                pattern: {
                  value: /^(ftp|http|https):\/\/[^ "]+$/,
                  message: "Invalid URL format",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.url && <p className="text-red-500 text-sm">{errors.url.message}</p>}
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end mt-6 space-x-3">
             
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const BackendUrlReader = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleSubmit = (url) => {
    console.log("Submitted URL:", url);
    setIsModalOpen(false);
  };

  return (
    <>
    <BackendUrl
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleSubmit}
      />
      </>
  );
};
export default BackendUrlReader;
