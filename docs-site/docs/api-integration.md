
#### **api-integration.md**
```md
---
id: api-integration
title: API Integration Details
---

## Fetching Data

I used the CoinGecko API to retrieve crypto data:

### How Data is Fetched:

# This function, fetchCryptoPrices, fetches cryptocurrency market data from the CoinGecko API using Axios. It first generates a timestamp to prevent caching issues. 
# The function introduces a 3-second artificial delay using setTimeout wrapped inside a Promise, ensuring the request is delayed before execution (mainly for showcasing loading animation as fetching is extremely fast). 
# Inside the timeout, it makes a GET request to the CoinGecko API, retrieving price data for Bitcoin, Ethereum, Cardano, Solana, and Ripple, with the prices in USD. 
# If the request is successful, the response data is resolved and returned. If an error occurs, it is logged to the console, and an empty array is returned to prevent crashes due to missing data. 

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

## How Data is Fetched for Frontend Display:
# This calls the fetchCryptoPrices function and stores the result in cryptoAssets. 
# The isLoading variable tracks whether the request is still in progress, while error captures any errors. 
# The refetch function allows manually re-fetching the data, and isFetching indicates if a new request is in progress, even when cached data is available. 
# The queryKey is set to "cryptoPrices" to uniquely identify this query. 
# The staleTime is set to 0, meaning data is always considered stale and refetched on re-render. 
# The cacheTime is 600000 milliseconds (10 minutes), meaning the data remains in memory for that duration before being removed.
# The refetchOnWindowFocus option is set to false, preventing automatic refetching when the user switches back to the browser window.

```javascript
  // Fetch data via React Query
  const { data: cryptoAssets, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["cryptoPrices"],
    queryFn: fetchCryptoPrices,
    staleTime: 0,
    cacheTime: 600000,
    refetchOnWindowFocus: false,
  });
  ```

### How Data is Updated:

# First, it checks if isLoading is true, meaning the API request is still in progress. If so, it returns a full-screen overlay with a Lottie animation (newLoading), centered on the page, using Tailwind classes for styling.
# If an error occurs (error is truthy), it displays a simple error message in white text.
# Next, a filtering function processes cryptoAssets to dynamically update the displayed results based on the user’s search input (searchQuery). This ensures that as the user types, the list of cryptocurrencies updates in real time. The .filter() method creates a new array containing only the cryptocurrencies whose names or symbols match the search input, ignoring case differences.
# The handleRefresh function manually triggers a data refresh when called. It first sets setIsRefreshing(true) to indicate the refresh is in progress, then uses await refetch() to request fresh data from the API. After the request completes, setIsRefreshing(false) resets the refresh state.

```javascript
if (isLoading)
    return (
      <div className="fixed inset-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
        <Lottie animationData={newLoading} loop={true} style={{ width: "200px", height: "200px" }} />
      </div>
    );

  if (error) return <p className="text-white">Error fetching data</p>;

  /** Filtering function:
   *  Dynamically updates our map to display live results from searching
   *  Stores the STATE of the current text the user inputs (updates with every new keystroke)
   *  .filter() creates a new array containing only the matched elements from the user input
   * 
   *  @improvement : Could cache frequently searched cryptocurrencies for faster lookup
   *  However, in this case five elements is minisucle
   */
  const filteredAssets = cryptoAssets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };
```


