import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  userNameAtPisigange: string
  sshPassword: string
  duration: string
  isLogEnabled: boolean
  reportingInetrval: boolean
  username: string
  password: string
  selectedRules:any[]=[]
  allRecords: any;
  enableYoutubeDl: boolean=false;
  forceTvOn: boolean=false;
  disableCECPowerCheck: boolean=false;
  systemMessagesHide: boolean=false;
  hideWelcomeNotice: boolean=false;
  userType = ''
  rules: any[] 
  loader : boolean = false

  constructor(public global: GlobalService, private http: HttpService) { }

  ngOnInit(): void {
    this.userType = JSON.parse(localStorage.getItem('user_Auth')).admin;
    this.getSettings()

  }

  getSettings() {
    this.loader = true
    this.http.get("settings/").then((response: any) => {
      this.allRecords = response
      this.userNameAtPisigange = response.installation
      this.duration = response.defaultDuration
      this.sshPassword = response.sshPassword
      this.reportingInetrval=response.reportIntervalMinutes
      this.username=response.authCredentials.user
      this.password=response.authCredentials.password
      this.isLogEnabled=response.enableLog
      this.enableYoutubeDl=response.enableYoutubeDl
      this.forceTvOn=response.forceTvOn
      this.disableCECPowerCheck=response.disableCECPowerCheck
      this.systemMessagesHide=response.systemMessagesHide
      this.hideWelcomeNotice=response.hideWelcomeNotice
    this.setRules()
    this.loader = false
    }).catch(reason => {
      this.loader = false
      this.global.alertBox(JSON.stringify(reason.error.message), 'Error')
    })
  }
  selectRules(value,data){
    this.allRecords[data]=value.checked

  }
  changeLog() {
    this.isLogEnabled = !this.isLogEnabled
  }
  setRules(){
    this.rules=[
      {label:"use YouTube-dl for livestreaming instead of live streamer",value:this.enableYoutubeDl},
      {label:"Keep TV on by the sending CEC tv-on/off messages even 3 minutes",value:this.forceTvOn},
      {label:"Disble CEC power check of TV every 3 minutes",value:this.disableCECPowerCheck},
      {label:"Hide system messages on TV Screen(e.g. Download in Progress)",value:this.systemMessagesHide},
      {label:"Do not show startup welcome screen & skip network diagnostics",value:this.hideWelcomeNotice}
  
    ]
  }
}
