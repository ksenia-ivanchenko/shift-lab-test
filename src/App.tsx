import { Route, Routes } from 'react-router-dom';
import { AuthOtpPage, AuthPhonePage, MainPage } from './pages';
// import { useEffect } from 'react';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth/phone" element={<AuthPhonePage />} />
        <Route path="/auth/otp" element={<AuthOtpPage />} />
      </Routes>
    </>
  );
}

export default App;
