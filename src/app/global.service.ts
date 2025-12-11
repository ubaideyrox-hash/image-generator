import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private messageService: MessageService,private confirmationService: ConfirmationService,) { }

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
  classesPics = [
    { label: 'PEB A', src: '/assets/images/peb_a.png' },
    { label: 'PEB A+', src: '/assets/images/peb_aplus.png' },
    { label: 'PEB A++', src: '/assets/images/peb_aplusplus.png' },
    { label: 'PEB B', src: '/assets/images/peb_b.png' },
    { label: 'PEB C', src: '/assets/images/peb_c.png' },
    { label: 'PEB D', src: '/assets/images/peb_d.png' },
    { label: 'PEB E', src: '/assets/images/peb_e.png' },
    { label: 'PEB F', src: '/assets/images/peb_f.png' },
    { label: 'PEB G', src: '/assets/images/peb_g.png' },

  ]

  option = [
    { label: 'Option', src: '/assets/images/option.png' },
    { label: 'Vendu', src: '/assets/images/vendu.png' },
    { label: 'Vendu 1ère Visite', src: '/assets/images/vendu1visite.png' },


  ]

  showToast(severity:any, summary:any, detail:any) {
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
        rejectLabel: "Annuler",
        acceptLabel: "Oui",
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

}

