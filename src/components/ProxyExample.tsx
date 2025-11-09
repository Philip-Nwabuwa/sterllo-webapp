import { useState, useEffect } from 'react';

/**
 * Example component demonstrating how to use Vite proxy
 * to make API calls without CORS issues
 */
export default function ProxyExample() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  // Fetch users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      // Using /api prefix - Vite proxy will forward to external API
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError('Failed to load users. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    setLoading(true);
    setError(null);
    try {
      // Using /api prefix - Vite proxy will forward to external API
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john.doe@example.com',
          username: 'johndoe',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newUser = await response.json();
      console.log('User created:', newUser);
      alert('User created successfully! Check console for details.');
    } catch (err) {
      setError('Failed to create user. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewUser = async (userId: number) => {
    setLoading(true);
    setError(null);
    try {
      // Using /api prefix - Vite proxy will forward to external API
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const user = await response.json();
      setSelectedUser(user);
    } catch (err) {
      setError('Failed to load user details. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Vite Proxy Example - No CORS!
          </h1>
          <p className="text-gray-600">
            This page demonstrates how to use Vite's proxy feature to make API calls
            without CORS errors. All API requests go through the Vite dev server.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mb-8 flex gap-4">
          <button
            onClick={loadUsers}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Loading...' : 'Refresh Users'}
          </button>
          <button
            onClick={handleCreateUser}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Creating...' : 'Create Test User'}
          </button>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading && users.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading users...</p>
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {user.name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-medium">Username:</span> {user.username}
                </p>
                <button
                  onClick={() => handleViewUser(user.id)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Details →
                </button>
              </div>
            ))
          )}
        </div>

        {/* Selected User Details */}
        {selectedUser && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                User Details
              </h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <span className="font-semibold text-gray-700">Name:</span>{' '}
                <span className="text-gray-900">{selectedUser.name}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Email:</span>{' '}
                <span className="text-gray-900">{selectedUser.email}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Username:</span>{' '}
                <span className="text-gray-900">{selectedUser.username}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Phone:</span>{' '}
                <span className="text-gray-900">{selectedUser.phone}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Website:</span>{' '}
                <a
                  href={`https://${selectedUser.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {selectedUser.website}
                </a>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Company:</span>{' '}
                <span className="text-gray-900">
                  {selectedUser.company?.name}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            How This Works (Vite Proxy)
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 mb-4">
            <li>
              ✓ Requests to <code className="bg-blue-100 px-1 rounded">/api/*</code> are proxied by Vite dev server
            </li>
            <li>
              ✓ No CORS issues (requests come from server, not browser)
            </li>
            <li>
              ✓ Works in development immediately
            </li>
            <li>
              ✓ For production, use serverless functions or a backend
            </li>
          </ul>
          <div className="text-sm text-blue-700 bg-blue-100 p-3 rounded">
            <p className="font-semibold mb-1">Example Code:</p>
            <code className="block">
              {`// Instead of: fetch('https://external-api.com/users')`}<br />
              {`// Use: fetch('/api/users')`}
            </code>
          </div>
          <p className="mt-4 text-sm text-blue-700">
            Configure the proxy target in{' '}
            <code className="bg-blue-100 px-2 py-1 rounded">
              vite.config.ts
            </code>
          </p>
        </div>
      </div>
    </div>
  );
}
