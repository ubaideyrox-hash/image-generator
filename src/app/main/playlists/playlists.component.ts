import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HttpService } from 'src/app/demo/service/http.service';
import * as lodash from 'lodash';
import { GlobalService } from 'src/app/global.service';

@Component({
    selector: 'app-playlists',
    templateUrl: './playlists.component.html',
    styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
    itemsCount: any[] = [];
    actionMenu: MenuItem[] = [];
    selectedCount: number = 1;
    items: MenuItem[] = [];
    allRecords: any = [];
    userValue: any;
    noRecord: boolean = false;
    backupPlayList: any[] = [];
    dtSelectedRows: any[];
    actionButton: boolean = true;
    loader : boolean = false
    constructor(

        public global: GlobalService, private http: HttpService
    ) {
        this.itemsCount = [
            { count: 10 },
            { count: 25 },
            { count: 50 },
            { count: 100 },
            { count: 'All' },
        ]
    }

    ngOnInit(): void {
        this.userValue = JSON.parse(localStorage.getItem('user_Auth'));
        this.getPlaylists()
    }

    search(event) {
        this.noRecord = false;
        this.allRecords = this.backupPlayList.filter((playlist) => {
            return (
                playlist.name
                    .toLowerCase()
                    .indexOf(event.target.value.toLowerCase()) > -1
            );
        });
        if (this.allRecords.length == 0) {
            this.noRecord = true;
        }
        if (event == '') {
            this.allRecords = this.backupPlayList;
        }
    }

    getPlaylists() {
        this.loader = true
        this.http.get("playlisting/"+ this.userValue.user_id).then(response => {
            this.loader = false
            this.allRecords = response
            this.backupPlayList = lodash.cloneDeep(this.allRecords);
        }).catch(reason => {
            this.loader = false
            this.global.alertBox(JSON.stringify(reason.error.message), 'Error')
        })
    }

    checkVal() {
        this.dtSelectedRows.length > 0
            ? (this.actionButton = false)
            : (this.actionButton = true);
    }


  

    async DeletePlaylists() {
        const confirm = await this.global.confirm(
            'Delete selected records?',
            'Alert'
        );
        if (confirm) {
            this.dtSelectedRows.forEach(async (row) => {
                try {
                    let playlistname = '__' + row.recordId + '.json'
                    await this.http.delete('files/', playlistname);
                } catch (error) {
                    this.global.alertBox(
                        JSON.stringify(error.message),
                        'Error'
                    );
                }
            });
            await this.getPlaylists();
            this.actionButton = true;
            this.global.showToast(
                'warn',
                'Deleted',
                'Record deleted Successfully'
            );
        }
    }

    Delete(recordId) {
            let playlistname = '__' + recordId + '.json'
            this.global.confirm("Delete this record", "Alert").then((selection) => {
                this.http.delete("files/", playlistname).then(response => {
                    this.global.showToast("warn", "Deleted", "Record deleted Successfully")
                    this.getPlaylists()
                }).catch(reason => {
                    this.global.alertBox(JSON.stringify(reason.error.message), 'Error')
                })
            })
    }
    edit(record) {
        this.global.goToPage('main/playlist-details',{playList:record.name})
  }
}
    

    
