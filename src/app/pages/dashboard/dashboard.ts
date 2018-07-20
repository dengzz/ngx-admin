export class StatusData {
    blockCount: string;
    transactionCount: string;
    accountCount: string;
    currencyStats: any;
    producers: any;
}

export class CurrencyStatsData {
    supply: number;
    maxSupply: number;
    percent: number;
    issuer: string;
}