import { Routes, Route } from "react-router-dom";

import { useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import Loader from "./components/loader/Loader";
import Error from "./routes/error/Error";
import Home from "./routes/home/Home";
import Calculator from "./routes/calculator/Calculator";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="container-fluid g-0 p-0 m-0">
      {isLoading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
