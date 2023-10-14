import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewPaints from "./ViewPaints";
import GiveAwayPaint from "./GiveAwayPaint";
import Home from "./Home";
import ThankYou from "./ThankYou";
import Layout from "./Layout";
import ActivePaints from "./admin/ActivePaints";
import Login from "./admin/Login";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/give-away"
          element={
            <Layout>
              <GiveAwayPaint />
            </Layout>
          }
        />
        <Route
          path="/view-paints"
          element={
            <Layout>
              <ViewPaints />
            </Layout>
          }
        />
        <Route
          path="/thank-you"
          element={
            <Layout>
              <ThankYou />
            </Layout>
          }
        />

        <Route
          path="/admin"
          element={
            <Layout>
              <ActivePaints />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
      </Routes>
      <div id="modal-root"></div>
    </BrowserRouter>
  );
}

export default App;
