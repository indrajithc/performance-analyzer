import { useMemo, useState } from "react";
import { getCookie } from "../utils/CookieUtil";
import { PAGE_SPEED_API_KEY } from "../utils/constants";
import PageSpeedApiKeyReader from "./PageSpeedApiKeyReader";


const LighthouseAnalyzer = () => {
  

  const defaultPageSpeedApiKey = useMemo(() => getCookie(PAGE_SPEED_API_KEY) || null, []);

  const [pageSpeedApiKey, setPageSpeedApiKey] = useState(defaultPageSpeedApiKey);


  return (
    <div>
      {pageSpeedApiKey ? (
        <div>
          <h1>Lighthouse Analyzer</h1>
          <p>Page Speed API Key: {pageSpeedApiKey}</p>
        </div>
      ) : (
      <PageSpeedApiKeyReader onSetPageSpeedApiKey={setPageSpeedApiKey} />
      )}
    </div>
  );
}

export default LighthouseAnalyzer;