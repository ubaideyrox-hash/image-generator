import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/demo/service/http.service';
import { GlobalService } from 'src/app/global.service';

interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-monitor-action',
  templateUrl: './monitor-action.component.html',
  styleUrls: ['./monitor-action.component.scss']
})

export class MonitorActionComponent implements OnInit {
  isShowInput: boolean = false;
  isShowDescription: boolean = false;
  checked: boolean = false;
  selectedLayout: any;
  layouts: any[];

  cities: City[];

  selectedCity: City;
  id: string;
  allRecords: any;
  name: string;
  userValue: any;
  allplaylists: any = [];
  selectedPlaylists: string = ''
  allGroups: any = [];
  selectedGroup: any
  display: boolean = false;
  tagButton: boolean = true;
  createGroup: String = ''
  DisablePlaylist: boolean = true
  selectGroup: any
  SelectedPlaylistInADropDown:any[]=[]

  constructor(private activeRoute: ActivatedRoute, private http: HttpService, public global: GlobalService) {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
    this.layouts = [
      { label: 'fa fa-user', name: 'Rotated Clock wise', code: 'cw' },
      { label: 'fa fa-user', name: 'Rotated counter clock wise', code: 'ccw' },
      { label: 'fa fa-user', name: 'Upside down', code: 'udw' },
    ];
  }

  ngOnInit(): void {
    this.userValue = JSON.parse(localStorage.getItem('user_Auth'));
    this.activeRoute.paramMap.subscribe((params) => {
      this.id = (params.get('moniter'))
      if (this.id) {
        this.getPlayersById()
      }else{
        this.getPlaylists()
        this.getGroups()
      }
    })
    
  }

  showInput(arg) {
    if (arg == 'input') {
      this.isShowInput = true;
    }
    else {
      this.isShowDescription = true;
    }
  }
  getPlayersById() {
    this.http.get("getplayers/" + this.id).then(response => {
      this.allRecords = response
      this.allRecords.name?this.name = this.allRecords.name:this.name = this.allRecords.cpuSerialNumber
      if(this.id){
        this.getPlaylists()
      }
      
      
    }).catch(reason => {
      this.global.alertBox(JSON.stringify(reason.error.message), 'Error')
    })
  }
  getPlaylists() {
    this.http.get("playlisting/" + this.userValue.user_id).then(response => {
      this.allplaylists = response
      if(this.id){
        this.getGroups()
      }
     

    }).catch(reason => {
      this.global.alertBox(JSON.stringify(reason.error.message), 'Error')
    })
  }
  SelectPlaylist(ev) {
    this.selectedGroup.assets = []
    this.selectedGroup.playlists = []
    this.SelectedPlaylistInADropDown=[]
    this.selectedPlaylists = '';
    let playlists=[]
    ev.value.forEach(element => {
      this.SelectedPlaylistInADropDown.push(element)
      playlists.push(this.allplaylists.find(x => x.name ==  element))
    });
    playlists.forEach(element => {
      this.selectedPlaylists += element.name + ','

      element.assets.forEach(element => {
        this.selectedGroup.assets.push(element.filename)
      });
      let obj = {
        name: element.name,
        plType: "regular",
        settings: element.settings,
        skipForSchedule: false
      }
      this.selectedGroup.playlists.push(obj)
    });


    this.AssignPlaylistsToGroup()

  }

  savePlaylist() {
    if (this.allRecords[0].group.name == 'default') {
      this.createNewGroup()
    }

  }

  createNewGroup() {
    if (!this.createGroup)
      this.global.alertBox('Group Name Required', 'Alert')
    let obj = {
      name: this.createGroup,
      user_id: this.userValue.user_id
    }
    this.http.post("groups/", obj).then(response => {
      this.getGroups()
      this.display = !this.display

      this.global.showToast("success", "Success", "Group Created Successfully")
    }).catch(reason => {
      this.global.alertBox(JSON.stringify(reason.error.message), 'Error')
    })
  }

  getGroups() {
    this.http.get("groups/" + this.userValue.user_id).then(response => {
      this.allGroups = response
      setTimeout(() => {
        this.getPlayListName()
      }, 1000);
    }).catch(reason => {
      this.global.alertBox(JSON.stringify(reason.error.message), 'Error')
    })
  }

  getPlayListName(){
    if(this.id && this.allRecords.group._id ){
      let data = this.allGroups.find(x => x._id ==  this.allRecords.group._id)
      this.selectGroup =data._id
      this.selectedGroup=data
      if(this.selectedGroup.playlists){
        this.DisablePlaylist=false
        this.SelectedPlaylistInADropDown=[]
        this.selectedGroup.playlists.forEach(element => {
          this.SelectedPlaylistInADropDown.push(element.name)
        });
      }
    }
  }

  tagCheck(event) {
    event.target.value.length > 2
      ? (this.tagButton = false)
      : (this.tagButton = true);
  }

  chngeDisplay() {
    this.display = !this.display
  }
  GroupSelection(ev) {
    this.selectedGroup = this.allGroups.find(x => x._id == ev.value)
    let obj = {
      group: this.selectedGroup,
    }
    this.http.post("players/" + this.id, obj).then((response:any)  => {
      debugger
      let data = this.allGroups.find(x => x._id ==  response.group._id)
        this.selectGroup =data._id
        this.selectedGroup=data
      if(this.selectedGroup.playlists){
        this.SelectedPlaylistInADropDown=[]
        this.selectedGroup.playlists.forEach(element => {
          this.SelectedPlaylistInADropDown.push(element.name)
        });
      }
      
      this.global.showToast("success", "Success", "Group Updated Successfully")
      this.DisablePlaylist = false
    }).catch(reason => {
      this.global.alertBox(JSON.stringify(reason.error.message), 'Error')
    })

  }
  AssignPlaylistsToGroup() {
    this.http.post("groups/" + this.selectedGroup._id, this.selectedGroup).then(response => {
      this.global.showToast("success", "Success", "Playlist Updated Successfully")
      this.DisablePlaylist = false
    }).catch(reason => {
      this.global.alertBox(JSON.stringify(reason.error.message), 'Error')
    })

  }

  PushToMonitor() {
    this.selectedGroup.deploy=true
    this.http.post("groups/" + this.selectedGroup._id, this.selectedGroup).then(response => {
      this.global.showToast("success", "Success", "Published successfully! A request has been sent to all players.  ")
      this.DisablePlaylist = false
    }).catch(reason => {
      this.global.alertBox(JSON.stringify(reason.error.message), 'Error')
    })


  }

}
