import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { MenuItem } from 'primeng/api';
import { HttpService } from 'src/app/demo/service/http.service';
import { GlobalService } from 'src/app/global.service';
import * as lodash from 'lodash';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  loader : boolean = false
  isOpenVideo:boolean = false;
  isVideo:boolean=false
  isYoutube:boolean=false
  display:boolean=false;
  displayAddImageModal:boolean=false;
  itemsCount: any[] = [];
  items: MenuItem[] = [];
  selectedCount: number = 1;
  activeIndex: number = 0;
  file: any = []
  allRecords: any = []
  viewVideo: any = [];
  userValue:any
  nodePort: any;
  isFullInput: boolean = false;
  createTag: string;
  allLabels: any = [];
  noRecord: boolean = false;
  backupVideoList: any[] = [];
  tagButton: boolean = true;
  actionButton: boolean = true;
  dtSelectedRows: any[];

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
    // this.getProducts();
    this.userValue =  JSON.parse(localStorage.getItem('user_Auth'));
     this.getLabels()
     this.getVideos()
  }

  search(event) {
    this.noRecord = false;
    this.allRecords = this.backupVideoList.filter((video) => {
        return (
            video.name
                .toLowerCase()
                .indexOf(event.target.value.toLowerCase()) > -1
        );
    });
    if (this.allRecords.length == 0) {
        this.noRecord = true;
    }
    if (event == '') {
        this.allRecords = this.backupVideoList;
    }
}
  chngeDisplay(){
    this.display=!this.display
  }
  tagList(value) {
    value.labels = [];
    value.labelsArray.forEach((tag) => {
        value.labels.push(tag.name);
    });

    let obj = {
        dbdata: value,
    };
    this.http
        .post('files/' + value.name, obj)
        .then((response) => {
            this.getVideos();
            this.global.showToast(
                'success',
                'Success',
                'Tag Assigned Successfully'
            );
        })
        .catch((reason) => {
            this.global.alertBox(
                JSON.stringify(reason.error.message),
                'Error'
            );
        });
}
checkVal() {
        this.dtSelectedRows.length > 0
            ? (this.actionButton = false)
            : (this.actionButton = true);
    }
  changeAddImageDisplay(){
    this.file=[]

    this.displayAddImageModal=!this.displayAddImageModal
  }

  addVideo(){
    this.isVideo=true
    this.isYoutube=false
  }
  async DeleteVideos() {
    const confirm = await this.global.confirm(
        'Delete selected records?',
        'Alert'
    );
    if (confirm) {
        this.dtSelectedRows.forEach(async (row) => {
            try {
                await this.http.delete('files/', row.name);
            } catch (error) {
                this.global.alertBox(
                    JSON.stringify(error.message),
                    'Error'
                );
            }
        });
        await this.getVideos();
        this.actionButton = true;
        this.global.showToast(
            'warn',
            'Deleted',
            'Record deleted Successfully'
        );
    }
}
  adddYoutube(){
    this.isVideo=false
    this.isYoutube=true
  }

  dropped(files: NgxFileDropEntry[]) {
    for (let droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.file.push(file);
          // this.uploadFile()
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }



  openFileSelector(){

  }

  createVideo() {
    let body: FormData = new FormData()
    for (let i = 0; i < this.file.length; i++) {
      body.append('assets', this.file[i])
    }
    this.http.post("files/", body).then(response => {
      this.file=[]
      this.changeAddImageDisplay()
      this.uploadPost(response)
       this.global.showToast("success", "Success", "Video Created Successfully")
    }).catch(reason => {
      // this.global.alertBox(JSON.stringify(reason.error.message), 'Error')
    })
  }

  getVideos() {
    this.loader = true
    this.http.get("files/"+this.userValue.user_id).then(response => {
      debugger
      this.nodePort=response['port']
      this.allRecords = response['dbdata'].filter(x => x.type == "video")
      this.allRecords.map((rec) => {
        rec.image =this.nodePort+"/media/" + rec.name
        rec.showThumbnail=this.nodePort+"/media/_thumbnails/" + rec.name
      })
      this.allRecords.map((rec) => {
        var labels = []
          rec.labels.forEach((li)=>{
            var label = this.allLabels.find(x=>x.name == li);
            labels.push(label);
          })
          rec['labelsArray'] = labels;
      });
      this.backupVideoList = lodash.cloneDeep(this.allRecords);
      this.backupVideoList.length > 0 ? this.noRecord = false : this.noRecord = true
      this.loader = false
    }).catch(reason => {
      this.global.alertBox(JSON.stringify(reason.error.message), 'Error')
      this.loader = false
    })
  }
  openVideo(imageInfo) {
    this.viewVideo =  {video:this.nodePort+"/media/" + imageInfo.name}
    this.isOpenVideo = true
  }

  tagCheck(event) {
    event.target.value.length > 2
        ? (this.tagButton = false)
        : (this.tagButton = true);
}

  uploadPost(data: any) {
    this.loader = true
    let uploadRecord = {
      files: data,
      user_id:this.userValue.user_id,
      categories: []
    }
    this.http.post("postupload", uploadRecord).then(response => {
    }).catch(reason => {
      setTimeout(() => {
        this.getVideos()
      }, 1000);

      // this.global.alertBox(JSON.stringify(reason.body.stat_message), 'Error')
    })
  }


  Actions(type, recordId) {
    if (type == 'delete') {
      this.global.confirm("Delete this record", "Alert").then((selection) => {
      this.http.delete("files/", recordId).then(response => {
       this.global.showToast("warn", "Deleted", "Record deleted Successfully")

        this.getVideos()
      }).catch(reason => {
        this.global.alertBox(JSON.stringify(reason.error.message), 'Error')
      })
    })

    }

  }
  createNewTag() {
    if(this.createTag=='' || !this.createTag){
      return
    }
    let obj = {
      name: this.createTag.toString(),
      user_id:this.userValue.user_id
    }
    this.http.post("labels/", obj).then(response => {
      this.display=!this.display
      this.createTag=''
      this.global.showToast("success", "Success", "Tag Created Successfully")
    }).catch(reason => {
      this.global.alertBox(JSON.stringify(reason.error.message), 'Error')
    })
  }

  toggleInput(value){
    this.isFullInput = value;
  }
  AssignLabel(event, value) {
    if (value.labels.includes(event.value.name)) {
      this.global.alertBox("Tag Already Assigned", 'Error')
      return
    }
    value.labels.push(event.value.name)
    let obj = {
      dbdata: value
    }
    this.http.post("files/" + value.name, obj).then(response => {
      this.getVideos()
      this.global.showToast("success", "Success", "Tag Assigned Successfully")
    }).catch(reason => {
      this.global.alertBox(JSON.stringify(reason.error.message), 'Error')
    })
  }

  getLabels() {
    this.http.get("labels/" + this.userValue.user_id).then(response => {
      this.allLabels = response
    }).catch(reason => {
      this.global.alertBox(JSON.stringify(reason.error.message), 'Error')
    })
  }

}
