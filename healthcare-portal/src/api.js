const request = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`API request failed: ${error.message}`);
  }
};

const get = async (url) => {
  return request(url, { method: 'GET' });
};

const post = async (url, data) => {
  return request(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

const put = async (url, data) => {
  return request(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

const deleteRequest = async (url) => {
  return request(url, { method: 'DELETE' });
};

const ApiService = {
  get,
  post,
  put,
  delete: deleteRequest,
};

export default ApiService;