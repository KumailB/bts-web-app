let btc_price_cache: number = 56031.40;

export const getBtcRate = async (): Promise<number> => {
  const rate = fetch('https://api.coindesk.com/v1/bpi/currentprice.json').
  then(data => data.json()).then(data => data['bpi']['USD']['rate'])
      .then(data => Number(data.replace(/[^0-9.-]+/g,"")))
      .then(data => {btc_price_cache = data as number;  return data as number});
  return btc_price_cache;
}