const { VITE_REACT_APP_BACKEND_HOST } = import.meta.env;

class FetchData {
  static instance;
  static _url;
  static _token;

  constructor() {
    if (!FetchData.instance) {
      FetchData._url = VITE_REACT_APP_BACKEND_HOST || "http://localhost:8000/";
      FetchData._token = localStorage.getItem("token");
      FetchData.instance = this;
    }
    return FetchData.instance;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new FetchData();
    }
    return this.instance;
  }

  setToken(token) {
    FetchData._token = token;
    localStorage.setItem("token", token);
  }

  async _fetch(url, method, body = null, useToken = true) {
    const headers = {
      "Content-Type": "application/json",
    };

    if (useToken && FetchData._token) {
      headers["Authorization"] = `Bearer ${FetchData._token}`;
    }

    const options = {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    };

    try {
      const response = await fetch(FetchData._url + url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Fetch error: ${error}`);
      throw error;
    }
  }

  fetchWithToken(url, method, body = null) {
    return this._fetch(url, method, body, true);
  }

  fetchWithoutToken(url, method, body = null) {
    return this._fetch(url, method, body, false);
  }

  fetchWithoutTokenAndBody(url, method) {
    return this._fetch(url, method, null, false);
  }

  async get(url) {
    return await this._fetch(url, 'GET', null, true);
  }

  async post(url, body) {
    return this._fetch(url, 'POST', body, true);
  }

  async put(url, body) {
    return this._fetch(url, 'PUT', body, true);
  }

  async delete(url) {
    return this._fetch(url, 'DELETE', null, true);
  }
}

const instance = FetchData.getInstance();
Object.freeze(instance);

export default instance;
