# Crypto Price Tracker

A **real-time cryptocurrency price tracker** built with **Next.js**, featuring live updates for the latest prices of five major cryptocurrencies, **dynamic search and filtering**, and **market insights** like **24-hour price changes** and **daily trading volume**.

## Features:
- **Live Price Updates**: Displays the latest prices for five major cryptocurrencies.
- **Dynamic Search & Filtering**: Quickly find and filter cryptocurrencies by name or symbol.
- **Market Insights**: View helpful details such as **24-hour price change** and **daily trading volume**.
- **Live Refreshing**: The data updates automatically at regular intervals.
-  **CoinGecko API Integration**: Fetches real-time data from the [CoinGecko API](https://www.coingecko.com/en/api).

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/dabrownies/crypto-price-tracker.git
cd crypto-price-tracker
```
### 2. Clone the Repository
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. No API Key required
- CoinGecko's free API allows for simple data fetching without the use of API keys

### 4. Run Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
- Open http://localhost:3000 in your browser.


### Project Structure
crypto-price-tracker/
├── .next/                  # Next.js build directory
├── app/                    # Application source
│   └── dashboard/          # Dashboard pages
│       ├── page.js         # Dashboard main page
│       ├── favicon.ico     # Browser tab icon
│       ├── globals.css     # Global styles
│       ├── layout.js       # Layout component
│       └── page.js         # Page component
├── components/             # Reusable components
│   └── ui/                 # UI component library
│       ├── TextAnimations/ # Text animation components
│       ├── button.jsx      # Button component
│       ├── card.jsx        # Card component
│       ├── input.jsx       # Input component
│       └── skeleton.jsx    # Skeleton loading component
├── docs-site/              # Documentation website
├── lib/                    # Utility libraries
│   ├── fetchCryptoPrices.js # API service for crypto prices
│   └── utils.js            # General utility functions


### Example Usage








