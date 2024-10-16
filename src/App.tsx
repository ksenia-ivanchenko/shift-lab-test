import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthOtpPage, AuthPhonePage, HomePage } from './pages';
import { useDispatch } from './store';
import { useEffect } from 'react';
import { checkUserAuth } from './store/slices';
// import { ProtectedRoute } from './components';
// import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/phone" replace />} />
        <Route
          path="/home"
          element={
            // <ProtectedRoute type="auth">
            <HomePage />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/auth/phone"
          element={
            // <ProtectedRoute type="unauth">
            <AuthPhonePage />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/auth/otp"
          element={
            // <ProtectedRoute type="unauth">
            <AuthOtpPage />
            // </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
