import { BrowserRouter, Route, Routes } from "react-router";
import React, { Suspense, lazy } from "react";
import "./App.css";
import Header from "./components/Header";

// Lazy loading components
const About = lazy(() => import("./pages/About"));
const Login = lazy(() => import("./pages/Login"));
const AuthLayout = lazy(() => import("./layout/AuthLayout"));
const HomeLayout = lazy(() => import("./layout/HomeLayout"));
const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
   
   
     <BrowserRouter>
     <Header/>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>


          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/about/:xyz" element={<About />} />

          <Route path="auth" element={<AuthLayout />}>
            <Route path="sign-in" element={<Login />} />
            <Route path="sign-up" element={<h1>Sign up</h1>} />
          </Route>

          <Route path="dashboard" element={<HomeLayout />}>
            <Route index element={<h1>Dashboard</h1>} />
            <Route
              path="setting"
              element={<h1>this is dashboard setting page</h1>}
            />

            <Route path="admin">
              <Route index element={<h1>Admin</h1>} />
              <Route
                path="setting"
                element={<h1>this is admin setting page</h1>}
              />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
   
   
  );
}

export default App;
