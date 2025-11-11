import { useContext } from 'react';
import { AuthContext, type AuthContextValue } from '../contexts/AuthContext';

/**
 * Custom hook to access authentication context
 *
 * Provides access to authentication state and methods for managing API credentials.
 *
 * @throws {Error} If used outside of AuthProvider
 *
 * @returns {AuthContextValue} Authentication context value containing:
 * - `credentials`: The current authentication credentials (userKey, accountKey, sessionId) or null if not authenticated
 * - `isAuthenticated`: Boolean indicating whether the user is currently authenticated
 * - `login`: Function to authenticate by setting credentials
 * - `logout`: Function to clear credentials and log out
 * - `setCredentials`: Function to update credentials (alias for login)
 *
 * @example
 * ```tsx
 * import { useAuth } from './hooks/useAuth';
 *
 * function LoginComponent() {
 *   const { login, isAuthenticated, credentials } = useAuth();
 *
 *   const handleLogin = () => {
 *     login('user-key-123', 'account-key-456', 'session-id-789');
 *   };
 *
 *   if (isAuthenticated) {
 *     return <div>Logged in as {credentials?.userKey}</div>;
 *   }
 *
 *   return <button onClick={handleLogin}>Login</button>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * function LogoutComponent() {
 *   const { logout, isAuthenticated } = useAuth();
 *
 *   if (!isAuthenticated) {
 *     return null;
 *   }
 *
 *   return <button onClick={logout}>Logout</button>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * function UpdateCredentialsComponent() {
 *   const { setCredentials, credentials } = useAuth();
 *
 *   const handleUpdate = (newSessionId: string) => {
 *     if (credentials) {
 *       setCredentials(
 *         credentials.userKey,
 *         credentials.accountKey,
 *         newSessionId
 *       );
 *     }
 *   };
 *
 *   return <button onClick={() => handleUpdate('new-session-id')}>
 *     Update Session
 *   </button>;
 * }
 * ```
 */
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      'useAuth must be used within an AuthProvider. ' +
      'Make sure to wrap your component tree with <AuthProvider>.'
    );
  }

  return context;
};
