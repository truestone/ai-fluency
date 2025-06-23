// This file is kept for compatibility but no longer used for API calls
// All data is now stored in localStorage

// Mock implementation for any code that might still reference this
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  console.warn('API calls are disabled in static mode');
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

// Empty query client for compatibility
export const queryClient = {
  invalidateQueries: () => Promise.resolve(),
  setQueryData: () => {},
  getQueryData: () => null,
};
