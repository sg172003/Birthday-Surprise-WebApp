import { Handler } from '@netlify/functions';

// Ping endpoint
const handlePing = () => {
  const ping = process.env.PING_MESSAGE ?? "ping";
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    },
    body: JSON.stringify({ message: ping }),
  };
};

// Demo endpoint
const handleDemo = () => {
  const response = {
    message: "Hello from Netlify Functions",
  };
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    },
    body: JSON.stringify(response),
  };
};

// Main handler function
export const handler: Handler = async (event, context) => {
  const { path, httpMethod } = event;

  // Handle CORS preflight requests
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      },
      body: '',
    };
  }

  // Route handling
  if (path === '/api/ping' && httpMethod === 'GET') {
    return handlePing();
  }
  
  if (path === '/api/demo' && httpMethod === 'GET') {
    return handleDemo();
  }

  // 404 for unmatched routes
  return {
    statusCode: 404,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ error: 'Not Found' }),
  };
};
