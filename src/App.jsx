import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Loader from "./components/loader/Loader";
const Navigation = lazy(() => import("./routes/navigation/Navigation"));
const Home = lazy(() => import("./routes/home/Home"));
const Calculator = lazy(() => import("./routes/calculator/Calculator"));
const Info = lazy(() => import("./routes/info/Info"));
const Error = lazy(() => import("./routes/error/Error"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="info" element={<Info />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
