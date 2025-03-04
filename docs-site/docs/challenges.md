---
id: challenges
title: Challenges & Solutions
---

## Issues Faced

### 1. Handling API Rate Limits
- **Problem:** The API limits requests per second.  
- **Solution:** Used React Query’s caching mechanism to reduce unnecessary calls.

---

### 2. State Synchronization  
- **Problem:**  
  The main problem was that while the refresh button was successfully triggering new data fetches (evident from the rate limit warnings), the UI wasn't updating to reflect the new data.  

  **The issues were:**  
  - **UI Feedback:** The original implementation had no visual feedback during the refresh process, making it seem like clicking the button did nothing.  
  - **Component Re-rendering:** React's diffing algorithm was determining that the data object from the refresh was essentially the same (with perhaps minor value changes), so it wasn't triggering a full re-render of the table.  
  - **Loading State Handling:** The loading state was only shown on initial load, not during refreshes.  

- **Solution:**  
  Implemented proper loading state management by:  
  - Adding an `isRefreshing` state variable to track manual refresh operations.  
  - Leveraging React Query's built-in `isFetching` state to detect any ongoing fetch operations.  
  - Creating a transparent loading overlay that appears only during refreshes, without blocking the UI.  
  - Disabling the refresh button during fetching to prevent multiple rapid requests.  

  #### Properly Structured Async Refetch Handler  
  Created an async handler for the refresh operation that:  
  - Sets the refreshing state to `true` before fetching.  
  - Awaits the completion of the refetch operation.  
  - Sets the refreshing state back to `false` afterward.  

  #### Forced Component Re-rendering  
  The most crucial fix was forcing React to re-render the entire list by adding a random value to each item's key:

  ```javascript
  key={asset.id + Math.random()}
  ```
This is a strategic trick that tells React each component is completely new after a refresh, forcing it to rebuild the DOM elements with fresh data.

### Desired Improvements:

## Allow for real-time chart data (candlestick and line)

## Stats and About cards for users to explore other market data, information, and recent news regarding each coin.

## Manually cache frequently searched cryptocurrencies

