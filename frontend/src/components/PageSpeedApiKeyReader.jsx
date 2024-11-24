import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { setCookie } from "../utils/CookieUtil";
import { PAGE_SPEED_API_KEY } from "../utils/constants";
import { toast } from "react-toastify";

const PageSpeedApiKey = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
          <h2 className="text-xl font-semibold text-gray-800">Enter Api Key</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div>
            <input
              type="text"
              placeholder="Enter Page Speed API Key"
              {...register("url", {
                required: "Key is required",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.url && (
              <p className="text-red-500 text-sm">{errors.url.message}</p>
            )}
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

const PageSpeedApiKeyReader = ({ onSetPageSpeedApiKey }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleSubmit = (key) => {
    try {
      setCookie(PAGE_SPEED_API_KEY, key);
      setIsModalOpen(false);
      toast.success("Success! Api Key has been set");
      onSetPageSpeedApiKey(key);
    } catch (error) {
      console.error("Error setting URL:", error);
    }
  };

  return (
    <>
      <PageSpeedApiKey
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
};
export default PageSpeedApiKeyReader;
