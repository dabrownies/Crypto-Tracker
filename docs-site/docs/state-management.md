
#### **state-management.md**
```md
---
id: state-management
title: State Management
---

## Why I Chose React Query

I used **React Query** to handle API calls because:
- Automatic caching (and custom) for API requests for better performance
- Automatically refetches stale data.
- Simplifies fetching logic compared to manual `useState` + `useEffect`.

### Example Usage:
```javascript
import axios from 'axios';

const fetchCryptoPrices = async () => {
  try {
    const timestamp = new Date().getTime();
    
    return new Promise((resolve) => {
      setTimeout(async () => {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              ids: 'bitcoin,ethereum,cardano,solana,ripple',
              _t: timestamp
            },
          }
        );
        resolve(response.data);
      }, 3000);
    });
  } catch (error) {
    console.error('Error fetching crypto prices: ', error.message);
    // return empty array (zero crypto prices) if price fetching fails
    return [];
  }
};

export default fetchCryptoPrices;
```
