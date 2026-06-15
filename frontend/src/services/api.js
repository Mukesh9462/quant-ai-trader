import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// Attach JWT token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// =====================
// MARKET APIs
// =====================

export const getCurrentPrice = (symbol) =>
  API.get(`/market/current_price/${symbol}`);

export const getHistoricalData = (symbol) =>
  API.get(`/market/historical_data/${symbol}`);

export const getScore = (symbol) =>
  API.get(`/market/score/${symbol}`);

export const getHistory = (symbol) =>
  API.get(`/market/history/${symbol}`);

export const getStockSearch = (symbol) =>
  API.get(`/market/search/${symbol}`);

export const getRecommendation = (symbol) =>
  API.get(`/market/recommendation/${symbol}`);

export const getNews = (symbol) =>
  API.get(`/market/news/${symbol}`);

// =====================
// PORTFOLIO APIs
// =====================

export const getPortfolio = () =>
  API.get("/portfolio/");

export const getPortfolioPerformance = () =>
  API.get("/portfolio/performance");

export const getPortfolioSummary = () =>
  API.get("/portfolio/summary");

export const getPortfolioAllocation = () =>
  API.get("/portfolio/allocation");

export const addStock = (data) =>
  API.post("/portfolio/add", data);

export const deleteStock = (id) =>
  API.delete(`/portfolio/${id}`);

// =====================
// TRADE APIs
// =====================

export const getTrades = () =>
  API.get("/trade/");

export const buyStock = (data) =>
  API.post("/trade/buy", data);

export const sellStock = (data) =>
  API.post("/trade/sell", data);

// =====================
// WATCHLIST APIs
// =====================

export const getWatchlist = () =>
  API.get("/watchlist/");

export const addWatchlistStock = (data) =>
  API.post("/watchlist/add", data);

export const deleteWatchlistStock = (id) =>
  API.delete(`/watchlist/${id}`);

// =====================
// AUTH APIs
// =====================

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (formData) =>
  API.post(
    "/auth/login",
    formData,
    {
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
    }
  );

export const getProfile = () =>
  API.get("/auth/profile");

// =====================

export default API;