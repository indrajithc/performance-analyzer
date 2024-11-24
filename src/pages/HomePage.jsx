import { useMemo, useState } from "react";
import { getCookie } from "../utils/CookieUtil";
import { SERVER_URL } from "../utils/constants";
import BackendUrlReader from "../components/BackendUrlReader";

const HomePage = () => {
  const defaultServerApi = useMemo(() => getCookie(SERVER_URL) || null, []);

  const [serverApi, setServerApi] = useState(defaultServerApi);

  return (
    <div>
      {serverApi ? (
        <h1>Server URL: {serverApi}</h1>
      ) : (
        <>
          <BackendUrlReader onSetServerApi={setServerApi} />
        </>
      )}
    </div>
  );
};

export default HomePage;
