import { useMemo, useState } from "react";
import { getCookie } from "../utils/CookieUtil";
import { SERVER_URL } from "../utils/constants";
import BackendUrlReader from "../components/BackendUrlReader";
import LighthouseAnalyzer from "../components/LighthouseAnalyzer";

const HomePage = () => {
  const defaultServerApi = useMemo(() => getCookie(SERVER_URL) || null, []);

  const [serverApi, setServerApi] = useState(defaultServerApi);

  return (
    <div>
      {serverApi ? (
        <LighthouseAnalyzer serverApi={serverApi} />
      ) : (
        <>
          <BackendUrlReader onSetServerApi={setServerApi} />
        </>
      )}
    </div>
  );
};

export default HomePage;
