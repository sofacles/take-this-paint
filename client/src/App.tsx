import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewPaints from "./view-paint/ViewPaints";
import GiveAwayPaint from "./give-away-paint/GiveAwayPaint";
import Home from "./Home";
import ThankYou from "./ThankYou";
import DeletePaint from "./DeletePaint";
import SendMessage from "./SendMessage";
import ConfirmEmail from "./ConfirmEmail";
import ConfirmDonorEmail from "./ConfirmDonorEmail";
import Layout from "./Layout";
import { ThirdColorProvider } from "./give-away-paint/third-color/ThirdColorContext";
import ActivePaints from "./admin/ActivePaints";
import AdminMessages from "./admin/Messages";
import PersonsWithEmails from "./admin/PersonsWithEmails";
import Login from "./admin/Login";
import { AuthContextProvider } from "./useAuthContext";

import "./App.css";

function App() {
  return (
    <AuthContextProvider>
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
                <ThirdColorProvider>
                  <GiveAwayPaint />
                </ThirdColorProvider>
              </Layout>
            }
          />
          <Route
            path="/confirm-email"
            element={
              <Layout>
                <ConfirmEmail />
              </Layout>
            }
          />
          <Route
            path="/delete-paint"
            element={
              <Layout>
                <DeletePaint />
              </Layout>
            }
          />
          <Route
            path="/confirm-donor-email"
            element={
              <Layout>
                <ConfirmDonorEmail />
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
            path="/send-message"
            element={
              <Layout>
                <SendMessage />
              </Layout>
            }
          />

          <Route path="/admin">
            <Route index element={<ActivePaints />} />
            <Route
              path="paints"
              element={
                <Layout>
                  <ActivePaints />
                </Layout>
              }
            />
            <Route
              path="messages"
              element={
                <Layout>
                  <AdminMessages />
                </Layout>
              }
            />
            <Route
              path="persons-with-emails"
              element={
                <Layout>
                  <PersonsWithEmails />
                </Layout>
              }
            />
          </Route>

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
    </AuthContextProvider>
  );
}

export default App;
