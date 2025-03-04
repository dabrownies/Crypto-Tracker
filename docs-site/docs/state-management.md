
#### **state-management.md**
```md
---
id: state-management
title: State Management
---

## Why I Chose React Query

For this project, I needed a reliable and efficient way to fetch, cache, and manage cryptocurrency price data from the CoinGecko API. Instead of using traditional state management with useState and useEffect, I opted for React Query due to its powerful features that simplify API handling. Below are the key reasons for this decision:

## Automatic Data Fetching & Caching
- React Query automatically fetches and caches API responses, reducing redundant network requests. This is crucial for a crypto tracker where real-time price updates are needed while avoiding unnecessary API calls.

## Background Refetching for Real-Time Updates
Crypto prices fluctuate constantly. React Query ensures the data remains fresh by refetching in the background when:
- The user revisits the page.
- A specified time interval (staleTime) is reached.
- The window regains focus.

## Built-in Loading & Error Handling
- Instead of manually tracking loading and error states, React Query provides built-in support.
