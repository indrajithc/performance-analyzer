import { useMemo, useState } from "react";
import { getCookie } from "../utils/CookieUtil";
import { PAGE_SPEED_API_KEY } from "../utils/constants";
import PageSpeedApiKeyReader from "./PageSpeedApiKeyReader";
import { useForm } from "react-hook-form";

const PageSpeedAnalyzer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const analyzeUrl = async (data) => {
    const { url } = data;
    setIsLoading(true);
    setResult(null);

    try {
      // PageSpeed Insights API call
      const response = await fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
          url
        )}`
      );

      if (!response.ok) throw new Error("Failed to fetch PageSpeed Insights");

      const result = await response.json();
      setResult(result);
    } catch (error) {
      console.error("Error analyzing URL:", error);
      alert("Failed to analyze the URL. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        PageSpeed Insights Analyzer
      </h1>
      <form
        onSubmit={handleSubmit(analyzeUrl)}
        className="w-full max-w-4xl flex flex-col items-center space-y-4"
      >
        {/* Input Field and Button */}
        <div className="w-full flex items-center">
          <input
            type="url"
            placeholder="Enter a valid URL (e.g., https://example.com)"
            {...register("url", {
              required: "URL is required",
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                message: "Enter a valid URL",
              },
            })}
            disabled={isLoading}
            className={`flex-grow px-4 py-3 border ${
              errors.url ? "border-red-500" : "border-gray-300"
            } rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-3 bg-blue-500 text-white font-semibold rounded-r-lg hover:bg-blue-600 focus:outline-none ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <span>Analyzing...</span>
                <div className="border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin"></div>
              </div>
            ) : (
              "Analyze"
            )}
          </button>
        </div>
        {errors.url && (
          <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>
        )}
      </form>

      {/* Results Section */}
      {result && (
        <div className="mt-6 w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Analysis Results
          </h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

const LighthouseAnalyzer = ({ serverApi }) => {
  const defaultPageSpeedApiKey = useMemo(
    () => getCookie(PAGE_SPEED_API_KEY) || null,
    []
  );

  const [pageSpeedApiKey, setPageSpeedApiKey] = useState(
    defaultPageSpeedApiKey
  );

  return (
    <div>
      {pageSpeedApiKey ? (
        <PageSpeedAnalyzer
          pageSpeedApiKey={pageSpeedApiKey}
          serverApi={serverApi}
        />
      ) : (
        <PageSpeedApiKeyReader onSetPageSpeedApiKey={setPageSpeedApiKey} />
      )}
    </div>
  );
};

export default LighthouseAnalyzer;
