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