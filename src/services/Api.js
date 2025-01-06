export const api = {
    getChartData: async (symbol) => {
      // Use Deriv API to fetch data for the selected symbol
      const response = await fetch(`https://deriv-api-url.com/data?symbol=${symbol}`);
      return await response.json();
    },
  };
  