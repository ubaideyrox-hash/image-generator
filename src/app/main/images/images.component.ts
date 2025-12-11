import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/demo/components/auth/services/auth.service';
import { HttpService } from 'src/app/demo/service/http.service';
import { GlobalService } from 'src/app/global.service';
import * as lodash from 'lodash';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
    loader : boolean = false
    activeIndex: number = 0;
    isActionClicked: boolean = false;
    ShowImage: boolean = false;
    isImage: boolean = false;
    display: boolean = false;
    displayAddImageModal: boolean = false;
    itemsCount: any[] = [];
    selectedCount: number = 1;
    items: MenuItem[] = [];
    // isFullInput:boolean = false;
    tagButton: boolean = true;
    actionButton: boolean = true;
    file: any = [];
    allRecords: any = [];
    selectedTags: any = [];
    actionMenu: MenuItem[] = [];
    userValue: any;
    viewImage: any = [];
    isFullInput: boolean = false;
    createTag: string;
    allLabels: any = [];
    ValueOfHeaderCheckBox: boolean = false;
    isValidityDialogue: boolean;
    startDateValue: string = '';
    endDateValue: string = '';
    dtSelectedRows: any[];
    noRecord: boolean = false;
    backupImageList: any[] = [];
    constructor(
        public global: GlobalService,
        private http: HttpService,
        private sanitizer: DomSanitizer
    ) {
        this.itemsCount = [
            { count: 10 },
            { count: 25 },
            { count: 50 },
            { count: 100 },
            { count: 'All' },
        ];
    }

    ngOnInit(): void {
        this.userValue = JSON.parse(localStorage.getItem('user_Auth'));
        this.getLabels();
        this.getImages();
    }

    checkVal() {
        this.dtSelectedRows.length > 0
            ? (this.actionButton = false)
            : (this.actionButton = true);
    }

    async DeleteImages() {
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
            await this.getImages();
            this.actionButton = true;
            this.global.showToast(
                'warn',
                'Deleted',
                'Record deleted Successfully'
            );
        }
    }

    search(event) {
        this.noRecord = false;
        this.allRecords = this.backupImageList.filter((image) => {
            console.log(image.name);
            return (
                image.name
                    .toLowerCase()
                    .indexOf(event.target.value.toLowerCase()) > -1
            );
        });
        if (this.allRecords.length == 0) {
            this.noRecord = true;
        }
        if (event == '') {
            this.allRecords = this.backupImageList;
        }
    }

    chngeDisplay() {
        this.display = !this.display;
        this.tagButton = true;
    }

    toggleInput(value) {
        this.isFullInput = value;
    }
    tagCheck(event) {
        event.target.value.length > 2
            ? (this.tagButton = false)
            : (this.tagButton = true);
    }
    changeAddImageDisplay() {
        this.file = [];
        this.displayAddImageModal = !this.displayAddImageModal;
    }
    onValidityClick() {
        this.isValidityDialogue = true;
    }
    addImage() {
        this.isImage = !this.isImage;
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
                this.getImages();
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
    showMenu() {
        this.isActionClicked = !this.isActionClicked;
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
                const fileEntry =
                    droppedFile.fileEntry as FileSystemDirectoryEntry;
            }
        }
    }
    openFileSelector(event) {
        this.file = event.target.files;
        // let files = event.target.files;
        // if (files) {
        //   for (let file of files) {
        //     let reader = new FileReader();
        //     reader.onload = (e: any) => {
        //       // this.urls.push(e.target.result);
        //       // this.cdRef.detectChanges()
        //     }
        //     reader.readAsDataURL(file);
        //   }
        // }
    }
    createImages() {
        this.loader = true
        let body: FormData = new FormData();
        for (let i = 0; i < this.file.length; i++) {
            body.append('assets', this.file[i]);
        }
        this.http
            .post('files/', body)
            .then((response) => {
                this.file = [];
                this.changeAddImageDisplay();
                this.uploadPost(response);
                this.global.showToast(
                    'success',
                    'Success',
                    'Images Created Successfully'
                );
                this.loader = false
            })
            .catch((reason) => {
                this.loader = false
                // this.global.alertBox(JSON.stringify(reason.error.message), 'Error')
            });
    }

    getImages() {
        this.loader = true
        this.http
            .get('files/' + this.userValue.user_id)
            .then((response) => {
                debugger
                this.allRecords = response['dbdata'].filter(
                    (x) => x.type == 'image'
                );
                this.allRecords.map((rec) => {
                    rec.image =  this.sanitizer.bypassSecurityTrustUrl(
                        environment.resourcePath + rec.name
                    );
                    rec.check = false;
                });

                this.allRecords.map((rec) => {
                    var labels = []
                    rec.labels.forEach((li) => {
                        var label = this.allLabels.find(x => x.name == li);
                        labels.push(label);
                    })
                    rec['labelsArray'] = labels;
                });
                this.backupImageList = lodash.cloneDeep(this.allRecords);
                this.loader = false
            })
            .catch((reason) => {
                this.loader = false
                this.global.alertBox(
                    JSON.stringify(reason.error.message),
                    'Error'
                );
            });
    }
    showImage(imageInfo) {
        this.viewImage = { image: environment.resourcePath + '/media/' + imageInfo.name };
        this.ShowImage = true;
    }

    selectAllRecords() {
        if (this.ValueOfHeaderCheckBox == false) {
            this.ValueOfHeaderCheckBox = true;
        } else {
            this.ValueOfHeaderCheckBox = false;
        }
        this.allRecords.forEach((element) => {
            if (this.ValueOfHeaderCheckBox == false) {
                element.check = false;
            } else {
                element.check = true;
            }
        });
    }

    uploadPost(data: any) {
        let uploadRecord = {
            files: data,
            user_id: this.userValue.user_id,
            categories: [],
        };
        this.http
            .post('postupload', uploadRecord)
            .then((response) => { })
            .catch((reason) => {
                setTimeout(() => {
                    this.getImages();
                }, 1000);
            });
    }
    Actions(type, recordId) {
        debugger;
        if (type == 'delete') {
            this.global
                .confirm('Delete this record', 'Alert')
                .then((selection) => {
                    console.log(selection);
                    this.http
                        .delete('files/', recordId)
                        .then((response) => {
                            this.getImages();
                            this.global.showToast(
                                'warn',
                                'Deleted',
                                'Record deleted Successfully'
                            );
                        })
                        .catch((reason) => {
                            this.global.alertBox(
                                JSON.stringify(reason.error.message),
                                'Error'
                            );
                        });
                });
        }
    }

    createNewTag() {
        if (this.createTag == '' || !this.createTag) {
            return;
        }
        let obj = {
            name: this.createTag.toString(),
            user_id: this.userValue.user_id,
        };
        this.http
            .post('labels/', obj)
            .then((response) => {
                this.display = !this.display;
                this.createTag = '';
                this.global.showToast(
                    'success',
                    'Success',
                    'Tag Created Successfully'
                );
                this.getLabels();
            })
            .catch((reason) => {
                this.global.alertBox(
                    JSON.stringify(reason.error.message),
                    'Error'
                );
            });
    }

    getLabels() {
        this.http
            .get('labels/' + this.userValue.user_id)
            .then((response) => {
                this.allLabels = response;
            })
            .catch((reason) => {
                this.global.alertBox(
                    JSON.stringify(reason.error.message),
                    'Error'
                );
            });
    }

    AssignLabel(event, value) {
        debugger;
        if (value.labels.includes(event.value.name)) {
            this.global.alertBox('Tag Already Assigned', 'Error');
            return;
        }
        value.labels.push(event.value.name);
        let obj = {
            dbdata: value,
        };
        this.http
            .post('files/' + value.name, obj)
            .then((response) => {
                this.getImages();
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
    fetchWithAuthentication(url) {
        const headers = new Headers();
        headers.set('Authorization', `Basic YWRtaW46QWRtMW4=`);
        return fetch(url, { headers });
    }
}
