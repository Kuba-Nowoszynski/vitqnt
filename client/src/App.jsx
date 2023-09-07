import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "animate.css";

import Error from "./routes/error/Error";
import Loader from "./components/loader/Loader";
const Navigation = lazy(() => import("./routes/navigation/Navigation"));
const Home = lazy(() => import("./routes/home/Home"));
const Calculator = lazy(() => import("./routes/calculator/Calculator"));
const Info = lazy(() => import("./routes/info/Info"));
const Deficit = lazy(() => import("./routes/deficit/Deficit"));
const SignUp = lazy(() => import("./routes/signUp/SignUp"));
const SignIn = lazy(() => import("./routes/signIn/SignIn"));
const EmailVerification = lazy(() =>
  import("./routes/emailVerification/EmailVerification")
);
const Profile = lazy(() => import("./routes/profile/Profile"));
const Contact = lazy(() => import("./routes/contact/Contact"));
const About = lazy(() => import("./routes/about/About"));
const PrivacyPolicy = lazy(() =>
  import("./routes/privacyPolicy/PrivacyPolicy")
);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="info" element={<Info />} />
          <Route path="deficit" element={<Deficit />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="verify-email" element={<EmailVerification />} />
          <Route path="profile" element={<Profile />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />{" "}
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
