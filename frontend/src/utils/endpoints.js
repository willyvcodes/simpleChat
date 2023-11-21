const server = import.meta.env.VITE_REACT_APP_SERVER_URL;

const headers = { "Content-Type": "application/json" };

const sendRequest = async (endpoint, payload) => {
  const api_url = `${server}/chat${endpoint}`;
  return await fetch(api_url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload),
  });
};

export const loginUser = async (user) => {
  return sendRequest("/login", user);
};

export const signupUser = async (new_user) => {
  return sendRequest("/signup", new_user);
};
