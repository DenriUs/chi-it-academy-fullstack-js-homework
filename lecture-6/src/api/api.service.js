class ApiService {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  makeGetRequest = async (path) => {
    const response = await fetch(`${this.baseUrl}${path}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  };
}

export default ApiService;
