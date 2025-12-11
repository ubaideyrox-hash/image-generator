import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HttpService } from 'src/app/demo/service/http.service';
import { GlobalService } from 'src/app/global.service';
import * as lodash from 'lodash';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
    loader : boolean = false
    activeIndex: number = 0;
    isActionClicked: boolean = false;
    ShowImage: boolean = false;
    isImage: boolean = false;
    displayAddImageModal: boolean = false;
    itemsCount: any[] = [];
    selectedCount: number = 1;
    items: MenuItem[] = [];
    // isFullInput:boolean = false;
    file: any = [];
    allRecords: any = [];
    actionMenu: MenuItem[] = [];
    userValue: any;
    viewImage: any = [];
    nodePort: string;
    isFullInput: boolean = false;
    userName: string;
    email: string;
    password: string;
    showPassword: boolean;
    showConfirmPassword: boolean;

    confirm_password: string;
    isadmin: boolean = false;
    userId: any;
    actionButton: boolean = true;
    dtSelectedRows: any[];
    noRecord: boolean = false;
    backupUsersList: any[] = [];
    is_Confirm: boolean;
    button = 'Add User';
    constructor(public global: GlobalService, private http: HttpService) {
        this.itemsCount = [
            { count: 10 },
            { count: 25 },
            { count: 50 },
            { count: 100 },
            { count: 'All' },
        ];
    }

    // constructor() { }

    ngOnInit(): void {
        this.userValue = JSON.parse(localStorage.getItem('user_Auth'));
        this.getUsers();
    }
    // checkVal(event) {
    //   console.log("eVENT: ", event)
    // }

    checkVal() {
        this.dtSelectedRows.length > 0
            ? (this.actionButton = false)
            : (this.actionButton = true);
    }

    async DeleteUsers() {
        const confirm = await this.global.confirm(
            'Delete selected records?',
            'Alert'
        );
        if (confirm) {
            this.dtSelectedRows.forEach(async (row) => {
                try {
                    await this.http.delete('users/', row._id);
                } catch (error) {
                    this.global.alertBox(
                        JSON.stringify(error.message),
                        'Error'
                    );
                }
            });
            await this.getUsers();
            this.actionButton = true;
            this.global.showToast(
                'warn',
                'Deleted',
                'Record deleted Successfully'
            );
        }
    }
    toggleInput(value) {
        this.isFullInput = value;
    }

    changeAddImageDisplay() {
        this.reset();
        this.displayAddImageModal = !this.displayAddImageModal;
    }

    search(event) {
        this.noRecord = false;
        this.allRecords = this.backupUsersList.filter((image) => {
            return (
                image.username
                    .toLowerCase()
                    .indexOf(event.target.value.toLowerCase()) > -1
            );
        });
        if (this.allRecords.length == 0) {
            this.noRecord = true;
        }
        if (event == '') {
            this.allRecords = this.backupUsersList;
        }
    }

    showMenu() {
        this.isActionClicked = !this.isActionClicked;
    }
    Validation() {
        if (this.password !== this.confirm_password) {
            this.is_Confirm = true;
        }
        if (
            this.confirm_password === '' ||
            this.password === this.confirm_password
        ) {
            this.is_Confirm = false;
        }
    }
    getUsers() {
        this.loader = true
        this.http
            .get('users')
            .then((response) => {
                this.allRecords = response;
                this.backupUsersList = lodash.cloneDeep(this.allRecords);
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

    createUser() {
        this.loader = true
        if (this.is_Confirm) {
            return;
        }
        let data = {
            name: this.userName,
            email: this.email,
            password: this.password,
            admin: this.isadmin,
        };
        if (!this.userId) {
            if (
                !this.userName ||
                !this.email ||
                !this.password ||
                !this.confirm_password
            ) {
                this.global.alertBox('Please Complete The Form', 'Alert');
                return;
            }
            this.http
                .post('signup', data)
                .then((response) => {
                    debugger
                    this.reset();
                    this.changeAddImageDisplay();
                    this.getUsers();
                    this.global.showToast(
                        'success',
                        'Success',
                        'User Created Successfully'
                    );
                })
                .catch((reason) => {
                    this.loader = false
                    this.global.alertBox(
                        JSON.stringify(reason.error.message),
                        'Error'
                    );
                });
        } else {
            if (!this.userName && !this.email) {
                this.global.alertBox('Please Complete The Form', 'Alert');
                return;
            }
            this.http
                .post('users/' + this.userId, data)
                .then((response) => {
                    this.reset();
                    this.changeAddImageDisplay();
                    this.global.showToast(
                        'success',
                        'Success',
                        'User Updated Successfully'
                    );
                })
                .catch((reason) => {
                    this.global.alertBox(
                        JSON.stringify(reason.error.message),
                        'Error'
                    );
                });
        }
        this.getUsers();
    }

    deleteUser(recordId) {
        this.global
            .confirm('Delete this record user?', 'Alert')
            .then((selection) => {
                console.log(selection);
                this.http
                    .delete('users/', recordId)
                    .then((response) => {
                        this.getUsers();
                        this.global.showToast(
                            'warn',
                            'Deleted',
                            'User deleted Successfully'
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

    editUser(user) {
        this.button = 'Update User';
        this.userName = user.username;
        this.email = user.email;
        this.isadmin = user.admin;
        this.userId = user._id;
        this.displayAddImageModal = !this.displayAddImageModal;
    }
    reset() {
        this.userName = '';
        this.email = '';
        this.password = '';
        this.confirm_password = '';
        this.isadmin = false;
        this.button = 'Add User';
    }
}
