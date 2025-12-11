import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  PlaylistData = new Subject<any>();

  constructor( private messageService: MessageService,private confirmationService: ConfirmationService,    private router: Router,) { }

  fontSize = [
    { name: '12px', code: 'font-size:12px;' },
    { name: '13px', code: 'font-size:13px;' },
    { name: '14px', code: 'font-size:14px;' },
    { name: '15px', code: 'font-size:15px;' },
    { name: '16px', code: 'font-size:16px;' },
    { name: '17px', code: 'font-size:17px;' },
    { name: '18px', code: 'font-size:18px;' },
    { name: '19px', code: 'font-size:19px;' },
    { name: '20px', code: 'font-size:20px;' },
    { name: '22px', code: 'font-size:22px;' },
    { name: '24px', code: 'font-size:24px;' },
    { name: '26px', code: 'font-size:26px;' },
    { name: '28px', code: 'font-size:28px;' },
    { name: '34px', code: 'font-size:36px;' },
    { name: '48px', code: 'font-size:48px;' },
    { name: '72px', code: 'font-size:72px;' },

  ]

  fonts = [
    { name: 'Arial, sans-serif', code: 'font-family:Arial,sans-serif;' },
    { name: 'Verdana, sans-serif', code: 'font-family:Verdana,sans-serif;' },
    { name: 'Tahoma, sans-serif', code: 'font-family:Tahoma,sans-serif;' },
    { name: 'Times New Roman, serif', code: 'font-family:Times New Roman,serif;' },
    { name: 'Georgia, serif', code: 'font-family:Georgia,sans-serif;' },
    { name: 'Garamond, sans-serif', code: 'font-family:Garamond,serif;' },
    { name: 'Courier New, monospace', code: 'font-family:Courier New,monospace;' },
    { name: 'Brush Script MT, cursive', code: 'font-family:Brush Script MT,cursive;' },



  ]

  headings = [
    { name: 'Add Heading', code: 'font-size:16px;' },
    { name: 'Add SubHeading', code: 'font-size:14px;' },
    { name: 'Add Paragraph', code: 'font-size:12px;' },

  ]

  items = [
    {
      label: '...',
      items: [
        { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
        { label: 'Delete', icon: 'pi pi-fw pi-trash' },
        { label: 'Duplicate', icon: 'pi pi-fw pi-copy' },
      ]
    }
  ];

  actionMenu = [
    {
       label: 'Actions',
        items: [
            {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
            {label: 'Delete', icon: 'pi pi-fw pi-trash'},
            {label: 'Duplicate', icon: 'pi pi-fw pi-copy'},
        ]
    }
];
showToast(severity, summary, detail) {
  this.messageService.add({
    severity: severity,
    summary: summary,
    detail: detail
  });
}

alertBox(message: string, header: string) {
  return new Promise((resolve, reject) => {
    this.confirmationService.confirm({
      message: message,
      header: header,
      icon: 'pi pi-info-circle',
      // rejectLabel: "Cancel",
      acceptLabel: "Ok",
      //rejectButtonStyleClass: "btn btn-secondary",
      acceptButtonStyleClass: "btn btn-primary",
      rejectVisible: false,
      accept: () => {
        resolve(true)
      },
      // reject: () => {
      //   reject(false)
      // }
    });
  })
}

confirm(message: string, header: string) {
  return new Promise((resolve, reject) => {
    this.confirmationService.confirm({
      message: message,
      header: header,
      icon: 'pi pi-info-circle',
      rejectLabel: "Cancel",
      acceptLabel: "Confirm",
      rejectButtonStyleClass: "btn btn-secondary",
      acceptButtonStyleClass: "btn btn-primary",
      accept: () => {
        resolve(true)
      },
      reject: () => {
        reject(false)
      }
    });
  })
}

goToPage(page, arg = {}) {
  this.router.navigate([page, arg])
}

setObservable(variable, value) {
  this[variable].next(value);
}

getObservable(variable): Subject<any> {
  return this[variable];
}
time_convert(e) {
  if(!e){
      return '00' + ':' + '00' + ':' + '00';
  }
  const h = Math.floor(e / 3600).toString().padStart(2, '0'),
      m = Math.floor(e % 3600 / 60).toString().padStart(2, '0'),
      s = Math.floor(e % 60).toString().padStart(2, '0');

  return h + ':' + m + ':' + s;
}

}
