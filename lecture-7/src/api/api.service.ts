import { ApiServiceConfig } from './types';

class ApiService {
  private baseUrl: string;

  constructor({ baseUrl }: ApiServiceConfig) {
    this.baseUrl = baseUrl;
  }

  makeGetRequest = async <T>(path: string): Promise<T> => {
    const response = await fetch(`${this.baseUrl}${path}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  };
}

export default ApiService;
