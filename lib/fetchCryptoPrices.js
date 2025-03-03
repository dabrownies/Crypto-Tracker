import axios from 'axios';

const fetchCryptoPrices = async () => {
    try {
        const response = await axios.get(
            'https://api.coingecko.com/api/v3/coins/markets',
            {
                params: {
                    vs_currency: 'usd',
                    ids: 'bitcoin,ethereum,cardano,solana,dogecoin',
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching crypto prices: ', error);
        return [];
    }
};

export default fetchCryptoPrices;