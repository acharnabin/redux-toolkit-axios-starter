import { Route, Routes } from "react-router";
import React, { Suspense, lazy } from "react";
import "./App.css";
import Header from "./components/Header";
import LoginPageWithHookFrom from "./pages/LoginPageWithHookform";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import SignupWithZod from "./pages/SignupWithZod";
import BusinessSetUp from "./pages/BusinessSetUp";
import HomeWithUseQuery from "./pages/Home-with-usequery";

// Lazy loading components
const About = lazy(() => import("./pages/About"));
// const Login = lazy(() => import("./pages/Login"));
const HomeLayout = lazy(() => import("./layout/HomeLayout"));
const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route index element={<Home />} />

          <Route path="home2" element={<HomeWithUseQuery/>}/>

          <Route
            path="cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route path="/business-setup" element={<BusinessSetUp />} />
          <Route path="/about/:xyz" element={<About />} />

          <Route path="auth">
            {/* <Route path="sign-in" element={<Login />} /> */}
            <Route path="sign-in" element={<LoginPageWithHookFrom />} />
            <Route path="sign-up" element={<SignupWithZod/>} />
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
    </>
  );
}

export default App;
