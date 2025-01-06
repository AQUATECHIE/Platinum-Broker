const API_BASE_URL = "https://your-api-endpoint.com"; // Replace with your actual API endpoint

const api = {
  /**
   * Makes a Buy request to the server
   * @param {number} investment - The amount to invest
   * @param {string} expiration - The expiration time
   * @returns {Promise} - The server response
   */
  buy: (investment, expiration) => {
    return fetch(`${API_BASE_URL}/buy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ investment, expiration }),
    });
  },

  /**
   * Makes a Sell request to the server
   * @param {number} investment - The amount to invest
   * @param {string} expiration - The expiration time
   * @returns {Promise} - The server response
   */
  sell: (investment, expiration) => {
    return fetch(`${API_BASE_URL}/sell`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ investment, expiration }),
    });
  },
};

export default api;
