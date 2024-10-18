import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthOtpPage, AuthPhonePage, HomePage } from './pages';
import { useDispatch } from './store';
import { useEffect } from 'react';
import { ProtectedRoute } from './components';
import { checkUserAuth } from './store/slices';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute type="auth">
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth"
          element={
            <ProtectedRoute type="unauth">
              <AuthPhonePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/otp"
          element={
            <ProtectedRoute type="unauth">
              <AuthOtpPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
