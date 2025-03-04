
#### **api-integration.md**
```md
---
id: api-integration
title: API Integration Details
---

## Fetching Data

I used the CoinGecko API to retrieve crypto data:

```javascript
const fetchPrices = async () => {
  const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
  return response.json();
};
```
