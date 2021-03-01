export let precios = axios
    .get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,EUR')
    .then((response) => {
        return response;
    });
