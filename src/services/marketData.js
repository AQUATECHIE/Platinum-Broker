import api from '../services/Api';

export const getTicks = async (symbol) => {
    const ticks = api.ticks(symbol);
    ticks.onUpdate().subscribe(console.log);
    return ticks.list;
};

export const getCandles = async (symbol) => {
    const candles = api.candles({ symbol, count: 10 });
    return candles.list;
};
