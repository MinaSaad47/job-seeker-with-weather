import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import RegisterPage from "./Pages/RegisterPage";
import WeatherPage from "./Pages/WeatherPage";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <RequireAuth status={false}>
            <LoginPage />
          </RequireAuth>
        }
      />
      <Route
        path="/register"
        element={
          <RequireAuth status={false}>
            <RegisterPage />
          </RequireAuth>
        }
      />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        }
      />

      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }>
        <Route index element={<WeatherPage />} />
      </Route>
    </Routes>
  );
}

export default App;
