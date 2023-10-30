import React from 'react';
import { BrowserRouter,Routes,Route, Outlet } from 'react-router-dom';
import MemberApplicationPage from './pages/Application';
import MemberApplications from './pages/MemberApplications';
import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Loans from './pages/Loans';
import Transactions from './pages/MakeTransaction';
import Members from './pages/Members';
import SetAccount from './pages/SetAccount';
import Login from './pages/Login';
import Home from './pages/Home';
import LoanRequest from './pages/LoanRequest';
import LoanApplications from './pages/LoanApplications';
import MakeTransaction from './pages/MakeTransaction';
import ViewTransactions from './pages/Transactions';
import MemberAccount from './pages/MemberAccount';


function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/apply" element={<MemberApplicationPage />} />
          <Route path="/setaccountdetails" element={<SetAccount/>} />
          <Route path="/login" element={<Login/>} />
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
            <Route path="/maketransaction" element={<MakeTransaction />} />
            <Route path="/transactions" element={ <ViewTransactions /> } />
            <Route path="/applications" element={<MemberApplications />} />
            <Route path="/members" element={<Members />}/>
            <Route path="/requestloan" element={<LoanRequest />} />
            <Route path="/loanrequests" element={<LoanApplications />} />
            <Route path="/memberaccount" element={<MemberAccount/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
