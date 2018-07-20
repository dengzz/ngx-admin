export class Producer {
    owner: string;
    total_votes: string;
    producer_key: string;
    url: string;
    unpaid_blocks: number;
    unpaid_txfee_blocks: number;
    last_claim_time: number;
    location: number;
    is_active: number;
    total_votes_percent: number
}

export class ProducerList {
    list: Array<any>;
    more: string;
}
