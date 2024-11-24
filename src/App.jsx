import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import ReportPage from "./pages/ReportPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/report" element={<ReportPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
