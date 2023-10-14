import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import MemberApplicationPage from './pages/Application';
import MemberApplications from './pages/MemberApplications';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path='/apply'
            element={
              <MemberApplicationPage />
            }
          />
          <Route path='/applications'
            element={
              <MemberApplications />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
