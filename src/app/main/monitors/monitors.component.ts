import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HttpService } from 'src/app/demo/service/http.service';
import { GlobalService } from 'src/app/global.service';
import * as lodash from 'lodash';

@Component({
  selector: 'app-monitors',
  templateUrl: './monitors.component.html',
  styleUrls: ['./monitors.component.scss']
})
export class MonitorsComponent implements OnInit {
  loader : boolean = false
  activeIndex: number = 0;
  isActionClicked: boolean = false
  isImage: boolean = false;
  // display: boolean = false;
  // displayAddImageModal: boolean = false;
  itemsCount: any[] = [];
  selectedCount: number = 1;
  items: MenuItem[] = [];
  // isFullInput:boolean = false;
  allRecords: any = []
  userValue: any
  isFullInput: boolean = false;
  dtSelectedRows: any[];
  noRecord: boolean = false;
  backupMonitorList: any[] = [];
  actionButton: boolean = true;

  constructor(
    public global: GlobalService,
    private http: HttpService,
  ) {

    this.itemsCount = [
      { count: 10 },
      { count: 25 },
      { count: 50 },
      { count: 100 },
      { count: 'All' }
    ]
  }


  ngOnInit(): void {
    this.userValue = JSON.parse(localStorage.getItem('user_Auth'));
    this.getPlayers()
  }
  // checkVal(event) {
  //   console.log("eVENT: ", event)
  // }


  toggleInput(value) {
    this.isFullInput = value;
  }

  checkVal() {
    this.dtSelectedRows.length > 0
      ? (this.actionButton = false)
      : (this.actionButton = true);
  }

  search(event) {
    this.noRecord = false;
    this.allRecords = this.backupMonitorList.filter((monitor) => {
      return (
        monitor.cpuSerialNumber
          .toLowerCase()
          .indexOf(event.target.value.toLowerCase()) > -1
      );
    });
    if (this.allRecords.length == 0) {
      this.noRecord = true;
    }
    if (event == '') {
      this.allRecords = this.backupMonitorList;
    }
  }
  getPlayers() {
    this.loader = true
    this.http.get("players/").then(response => {
      this.allRecords = response['objects']
      this.backupMonitorList = lodash.cloneDeep(this.allRecords);
      this.loader = false
    }).catch(reason => {
      this.loader = false
      this.global.alertBox(JSON.stringify(reason.error.message), 'Error')
    })
  }

  Delete(record) {
    // this.loader = true
    this.global.confirm("Delete this record", "Alert").then((selection) => {
      this.http.delete("players/", record._id).then(response => {
        this.global.showToast("warn", "Deleted", "Record deleted Successfully")
        this.getPlayers()
      }).catch(reason => {
        // this.loader = false
        this.global.alertBox(JSON.stringify(reason.error.message), 'Error')
      })
    })
  }
  edit(record) {
    this.global.goToPage('main/monitor-detail', { moniter: record._id })
  }

}
