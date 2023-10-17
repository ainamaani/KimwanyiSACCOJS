import React from 'react';
import { BrowserRouter,Routes,Route, Outlet } from 'react-router-dom';
import MemberApplicationPage from './pages/Application';
import MemberApplications from './pages/MemberApplications';
import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Loans from './pages/Loans';
import Transactions from './pages/Transactions';


function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path="/apply" element={<MemberApplicationPage />} />
          <Route
            element={
              <Layout>
                <Outlet /> {/* Use Outlet to render child routes */}
              </Layout>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/applications" element={<MemberApplications />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
