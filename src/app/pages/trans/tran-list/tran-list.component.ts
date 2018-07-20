import { Component } from '@angular/core';

import { ServerDataSource } from '../../../../../ng2-smart-table/src/ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'ngx-smart-table',
    styleUrls: ['./tran-list.component.scss'],
    templateUrl: './tran-list.component.html',
})
export class TranListComponent {
    settings = {
        hideSubHeader: true,
        actions: {
            columnTitle: 'Actions',
            add: false,
            edit: false,
            delete: false,
            custom: [],
            position: 'left',
        },
        columns: {
            txId: {
                title: 'TxId',
                type: 'html',
                valuePrepareFunction: (value) => {
                    return `<a href="/#/trans/info/${value}">${(value.substr(0, 5) + '...' + value.substr(value.length - 5))}</a>`;
                },
            },
            blockNum: {
                title: 'Block',
                type: 'html',
                valuePrepareFunction: (value) => {
                    return `<a href="/#/blocks/info/${value}">${value}</a>`;
                },
            },
            createDate: {
                title: 'Timestamp',
                type: 'string',
                valuePrepareFunction: (date) => {
                    return new Date(date).toLocaleString();
                },
            },
            authorizers: {
                title: 'Account',
                type: 'html',
                valuePrepareFunction: (value) => {
                    return `<a href="/#/accounts/info/${value}">${value}</a>`;
                },
            },
            status: {
                title: 'Status',
                type: 'string',
            },
            cpuUsageUs: {
                title: 'Cpu Usage Us',
                type: 'number',
            },
            netUsageWords: {
                title: 'Net Usage Words',
                type: 'number',
            },
        },
        pager: {
            display: true,
            perPage: 25,
        },
    };
    queryParams: any = {};
    source: ServerDataSource;

    onSearch() {
        console.log(this.queryParams);
        this.router.navigate(['/trans/list'], { queryParams: this.queryParams });
    }

    constructor(http: HttpClient, private route: ActivatedRoute, private router: Router) {
        const blockNumber = this.route.snapshot.queryParamMap.get('blockNumber');
        const authorizer = this.route.snapshot.queryParamMap.get('authorizer');
        const status = this.route.snapshot.queryParamMap.get('status');
        this.queryParams = { blockNumber: blockNumber, authorizer: authorizer, status: status };
        const urlTree = this.router.createUrlTree(['/api/transactions'], { queryParams: this.queryParams });
        const url = this.router.serializeUrl(urlTree);
        this.source = new ServerDataSource(http, {
            endPoint: url, pagerPageKey: 'page', pagerLimitKey: 'limit', dataKey: 'list', totalKey: 'total',
        });
    }
}
