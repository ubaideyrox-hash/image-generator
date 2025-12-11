import domtoimage from 'dom-to-image';
import * as htmlToImage from 'html-to-image';

import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

import { GlobalService } from '../global.service';
import { HttpService } from '../http.service';
import { Templates } from './templates';

@Component({
  selector: 'app-template-design',
  templateUrl: './template-design.component.html',
  styleUrls: ['./template-design.component.scss'],
  providers: [{ provide: Window, useValue: window }],
})
export class TemplateDesignComponent implements OnInit {
  @ViewChild('container') container: any;
  scale = 3;
  id: any;
  isBusy = false;
  bgcolor = 'lightblue';
  heigthOfRow = '250px';
  pictures: any[] = [];
  droped: any = [];
  allRecords: any = [];
  activeSection: String = 'Templates';
  spaces = '5px';
  defaultColor: string = '#1976D2';
  openEditor: boolean = false;
  openSave: boolean = false;
  EditorData: string = '';
  filename: string = '';
  dataURL: any = null;
  showSpaces: number = 0;
  dragedPic: any;
  columns: any;
  endIndex: any;
  spaceValue: string = '';
  inputIndex: any;
  imageIndex: any;
  SecondimageIndex: any;
  canvasBackGroundColor: string = 'background-color:#fff;';
  gridCol: string = '3';
  layoutHeightWidht: String = ' width:800px;height:500px;';
  layoutType: string = 'landscape';
  classesPics: any;
  backupRecordList: any[] = [];
  noRecord: boolean = false;
  ThirdimageIndex: any;
  constructor(
    public global: GlobalService,
    private cdf: ChangeDetectorRef,
    private window: Window,
    private http: HttpService
  ) {}

  inIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }
  @HostListener('document:keyup', ['$event'])
  handleDeleteKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Delete' && this.openEditor == false) {
      if (this.inputIndex != null) {
        if (this.droped[this.inputIndex].type == 'both') {
          if (this.droped[this.inputIndex].text != '') {
            this.droped[this.inputIndex].text = '';
          } else {
            this.droped[this.inputIndex].data = '';
          }
        } else {
          this.droped[this.inputIndex].data = '';
          this.droped[this.inputIndex].type = 'text';
        }
      } else if (this.imageIndex != null) {
        this.droped[this.imageIndex].type = 'text';
        this.droped[this.imageIndex].data =
          'Click To Edit Text or drag a picture';
      } else if (this.SecondimageIndex != null) {
        this.droped[this.SecondimageIndex].classImage = '';
        this.imageIndex = this.SecondimageIndex;
        this.SecondimageIndex = null;
      }else if (this.ThirdimageIndex != null) {
        this.droped[this.ThirdimageIndex].optionImage= '';
        this.imageIndex = this.ThirdimageIndex;
        this.ThirdimageIndex = null;
      }
    }
  }

  ngOnInit(): void {
    this.seletedTemplate(1);
    this.getTemplates();
  }

  imagePicker(event: any) {
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.pictures.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  addClassPic(ev: any) {
    this.droped[this.imageIndex].classImage = ev.value.src;
    this.droped[this.imageIndex].type = 'both';
  }
  addOption(ev: any) {
    this.droped[this.imageIndex].optionImage = ev.value.src;
    this.droped[this.imageIndex].type = 'both';
  }

  dragStart(e: any, c: any, i: any, type: any) {
    this.dragedPic = c;
    this.dragedPic = c;
  }

  drop(e: any, index?: any) {
    if (
      this.dragedPic.includes('data:image') ||
      this.dragedPic.includes('assets/images')
    ) {
      if (this.droped[index].type == 'both') {
        this.droped[index].data = this.dragedPic;
      } else {
        this.droped[index].data = this.dragedPic;
        this.droped[index].type = 'image';
      }
    }
  }

  seletedTemplate(value: any) {
    this.id = null;
    this.filename = '';
    if (value == 1) {
      this.layoutHeightWidht = 'width:800px;height:450px;';
      this.droped = Templates.TemplateOne;
      this.canvasBackGroundColor = 'background-color:#ffffff;';
      this.defaultColor = '#ffffff';
      this.gridCol = '6';
      this.spaces = '1px';
      this.heigthOfRow = '75px';
      this.showSpaces = 1;
      this.layoutType = 'landscape';
    } else if (value == 2) {
      this.layoutHeightWidht = 'width:800px;height:450px;';
      this.droped = Templates.TemplateTwo;
      this.canvasBackGroundColor = 'background-color:#FFFFFF;';
      this.defaultColor = '#FFFFFF';
      this.gridCol = '2';
      this.spaces = '1px';
      this.heigthOfRow = '225px';
      this.showSpaces = 1;
      this.layoutType = 'landscape';
    } else if (value == 3) {
      this.layoutHeightWidht = 'width:800px;height:450px;';
      this.droped = Templates.TemplateThree;
      this.canvasBackGroundColor = 'background-color:#FFFFFF;';
      this.defaultColor = '#FFFFFF';
      this.gridCol = '3';
      this.spaces = '1px';
      this.heigthOfRow = '150px';
      this.showSpaces = 1;
      this.layoutType = 'landscape';
    } else if (value == 4) {
      this.layoutHeightWidht = 'width:800px;height:450px;';
      this.droped = Templates.TemplateFour;
      this.canvasBackGroundColor = 'background-color:#ffffff;';
      this.defaultColor = '#ffffff';
      this.gridCol = '4';
      this.spaces = '1px';
      this.heigthOfRow = '112.5px';
      this.showSpaces = 1;
      this.layoutType = 'landscape';
    } else if (value == 5) {
      this.layoutHeightWidht = 'width:800px;height:450px;';
      this.droped = Templates.TemplateFive;
      this.canvasBackGroundColor = 'background-color:#ffffff;';
      this.defaultColor = '#ffffff';
      this.gridCol = '6';
      this.spaces = '1px';
      this.heigthOfRow = '75px';
      this.showSpaces = 1;
      this.layoutType = 'landscape';
    } else if (value == 6) {
      this.layoutHeightWidht = 'width:800px;height:450px;';
      this.droped = Templates.TemplateSix;
      this.canvasBackGroundColor = 'background-color:#FFFFFF;';
      this.defaultColor = '#FFFFFF';
      this.gridCol = '2';
      this.spaces = '1px';
      this.heigthOfRow = '225px';
      this.showSpaces = 1;
      this.layoutType = 'landscape';
    } else if (value == 7) {
      this.layoutHeightWidht = 'width:800px;height:450px;';
      this.droped = Templates.TemplateSeven;
      this.canvasBackGroundColor = 'background-color:#FFFFFF;';
      this.defaultColor = '#FFFFFF';
      this.gridCol = '3';
      this.spaces = '1px';
      this.heigthOfRow = '150px';
      this.showSpaces = 1;
      this.layoutType = 'landscape';
    } else if (value == 8) {
      this.layoutHeightWidht = 'width:800px;height:450px;';
      this.droped = Templates.TemplateEight;
      this.canvasBackGroundColor = 'background-color:#ffffff;';
      this.defaultColor = '#ffffff';
      this.gridCol = '4';
      this.spaces = '1px';
      this.heigthOfRow = '112.5px';
      this.showSpaces = 1;
      this.layoutType = 'landscape';
    }
  }

  adjustSpace(val: any) {
    if (val == '+') {
      if (this.showSpaces == 15) {
        return;
      }
      this.showSpaces++;
      this.spaces = this.showSpaces + 'px';
    } else {
      if (this.showSpaces == 0) {
        return;
      }
      this.showSpaces--;
      this.spaces = this.showSpaces + 'px';
    }
  }

  setColor(arg: any) {
    let color = 'background-color:' + arg + ';';
    this.canvasBackGroundColor = color;
  }

  addText() {
    if (
      this.inputIndex != null &&
      this.droped[this.inputIndex].type == 'text' &&
      this.droped[this.inputIndex].data == ''
    ) {
      this.droped[this.inputIndex].data = 'Add Your Text Here';
    } else if (this.imageIndex != null) {
      this.droped[this.imageIndex].type = 'both';
      this.droped[this.imageIndex].text = 'Add Your Text Here';
    }
  }

  selectIndex(type: any, typeoftype?: any, index?: any, content?: any) {
    if (type == 'text') {
      this.inputIndex = index;
      this.imageIndex = null;
      this.EditorData = content;
      this.openEditor = true;
    } else if (type == 'both') {
      if (typeoftype == 'bgimage') {
        this.imageIndex = index;
        this.inputIndex = null;
        this.SecondimageIndex = index = null;
        this.ThirdimageIndex=null
      } else if (typeoftype == 'text') {
        this.inputIndex = index;
        this.imageIndex = null;
        this.EditorData = content;
        this.openEditor = true;
        this.SecondimageIndex = index = null;
      } else if (typeoftype == 'classimage') {
        this.inputIndex = null;
        this.imageIndex = null;
        this.SecondimageIndex = index;
        this.ThirdimageIndex=null
      }else if (typeoftype == 'optionImage') {
        this.inputIndex = null;
        this.imageIndex = null;
        this.SecondimageIndex = null;
        this.ThirdimageIndex=index
      }
    } else if (type == 'image') {
      this.inputIndex = null;
      this.imageIndex = index;
      this.SecondimageIndex = null;
    } else {
      this.inputIndex = null;
      this.imageIndex = null;
      this.SecondimageIndex = null;
      this.ThirdimageIndex=null
    }
  }

  editorText(event: any) {
    if (
      this.inputIndex != null &&
      this.droped[this.inputIndex].type == 'both'
    ) {
      this.droped[this.inputIndex].text = event.htmlValue;
    } else {
      this.droped[this.inputIndex].data = event.htmlValue;
    }

    // console.log(event.htmlValue);
  }

  getTemplates() {
    this.http
      .get('templates')
      .then((response) => {
        if (response) {
          this.allRecords = response;
          this.backupRecordList = JSON.parse(JSON.stringify(this.allRecords));
          this.backupRecordList.length > 0
            ? (this.noRecord = false)
            : (this.noRecord = true);
        }
      })
      .catch((reason) => {
        this.global.alertBox(JSON.stringify(reason.error.message), 'Error');
      });
  }

  deleteTemplate(recordId: any) {
    this.global.confirm('Êtes-vous sur de vouloir supprimer ce bien?', 'Confirmation').then((selection) => {
      this.http
        .delete('template/', recordId)
        .then((response) => {
          this.global.showToast(
            'warn',
            'Supprimé',
            'Bien supprimé avec succès'
          );
          this.id = null;
          this.filename = '';
          this.droped = [];
          this.getTemplates();
        })
        .catch((reason) => {
          this.global.alertBox(JSON.stringify(reason.error.message), 'Error');
        });
    });
  }

  getTemplatebyId(id: any) {
    this.http
      .get('template/' + id)
      .then((response: any) => {
        this.id = id;
        this.droped = response.data;
        this.filename = response.filename;
        (this.gridCol = response.gridCol),
          (this.layoutHeightWidht = response.layoutHeightWidht),
          (this.canvasBackGroundColor = response.canvasBackGroundColor),
          (this.defaultColor = response.defaultColor),
          (this.spaces = response.spaces),
          (this.heigthOfRow = response.heigthOfRow),
          (this.showSpaces = response.showSpaces),
          (this.layoutType = response.layoutType)
          // this.global.showToast(
          //   'success',
          //   'Success',
          //   'Template Selected Successfully'
          // );
      })
      .catch((reason: any) => {
        this.global.alertBox(JSON.stringify(reason.error.message), 'Error');
      });
  }

  search(event: any) {
    this.noRecord = false;
    this.allRecords = this.backupRecordList.filter((list, index) => {
      return (
        list.filename.toLowerCase().indexOf(event.target.value.toLowerCase()) >
        -1
      );
    });
    if (this.allRecords.length == 0) {
      this.noRecord = true;
    }
    if (event == '') {
      this.allRecords = this.backupRecordList;
    }
  }

  saveFileandTemplate(id?: any) {
    this.openSave = false;
    let obj = {
      data: this.droped,
      filename: this.filename,
      gridCol: this.gridCol,
      layoutHeightWidht: this.layoutHeightWidht,
      canvasBackGroundColor: this.canvasBackGroundColor,
      defaultColor: this.defaultColor,
      spaces: this.spaces,
      heigthOfRow: this.heigthOfRow,
      showSpaces: this.showSpaces,
      layoutType: this.layoutType,
    };
   
    let findName = this.backupRecordList.find(
      (x) => x.filename == this.filename
    );
    if (findName && !this.id) {
      this.global
        .confirm(
          'Un bien existe déjà sous ce nom, voulez-vous l\'écraser ?',
          'Attention'
        )
        .then((selection) => {
          console.log('selection', selection);
          this.id = findName._id;
          this.updateTemplate(obj);
          this.getTemplates();
          this.saveFile();
        })
        .catch((reason) => {
          this.global.alertBox('Modèle non sauvegardé', 'Erreur');
          // this.global.showToast("warn", "Alert" ,"Template was not saved")
        });
    } else {
      if (this.id) {
        this.updateTemplate(obj);
      } else {
        this.createTemplate(obj);
      }
      this.getTemplates();
      this.saveFile();
    }
  }

  createTemplate(obj: any) {
    this.http
      .post('template', obj)
      .then((response: any) => {
        // this.global.showToast("success", "Success", this.filename + "Template Created Successfully")
      })
      .catch((reason: any) => {
        this.global.alertBox(JSON.stringify(reason.error.message), 'Error');
      });
  }

  updateTemplate(obj: any) {
    this.http
      .post('template/' + this.id, obj)
      .then((response: any) => {
        // this.global.showToast("success", "Success", "Template Updated Successfully")
      })
      .catch((reason: any) => {
        this.global.alertBox(JSON.stringify(reason.error.message), 'Error');
      });
  }

  download(arg?: any) {
    this.isBusy = true;
    this.inputIndex = null;
    this.imageIndex = null;
    this.SecondimageIndex = null;
    this.ThirdimageIndex=null
 
    setTimeout(() => {
      const node = this.container.nativeElement;
      const style = {
        transform: 'scale(' + this.scale + ')',
        transformOrigin: 'top left',
        width: node.offsetWidth + 'px',
        height: node.offsetHeight + 'px',
      };

      const param = {
        height: node.offsetHeight * this.scale,
        width: node.offsetWidth * this.scale,
        quality: 1,
        style: style,
        tmplComp: this,
      };
      domtoimage
        .toJpeg(node, param)
        .then((dataUrl:string) => {
          const img = new Image();
          img.crossOrigin = 'Anonymous';
          img.id = 'getshot';
          img.src = dataUrl;
          document.body.appendChild(img);
        //  const getshot: any = document.querySelector('#getshot');
          if (this.layoutType == 'landscape') {
            this.compressImage(img.src, 1920, 1080);
          } else if (this.layoutType == 'potrait') {
            this.compressImage(img.src, 1080, 1920);
          }
        })
        .catch(function (error: any) {
          console.error('oops, something went wrong!', error);
        })
        .finally(() => {
          this.isBusy = false;
        });
    }, 1000);
  }

  // generateImage() {
  //   this.isBusy = true;
  //   this.inputIndex = null;
  //   this.imageIndex = null;
  //   setTimeout(() => {
  //     var node: any = document.getElementById('image-section');
  //     htmlToImage
  //       .toPng(node)
  //       .then((dataUrl) => {
  //         var img = new Image();
  //         img.src = dataUrl;
  //         document.body.appendChild(img);
  //         if (this.layoutType == 'landscape') {
  //           this.compressImage(img.src, 1920, 1080);
  //         } else if (this.layoutType == 'potrait') {
  //           this.compressImage(img.src, 1080, 1920);
  //         }
  //       })
  //       .catch(function (error) {
  //         console.error('oops, something went wrong!', error);
  //       })
  //       .finally(() => {
  //         this.isBusy = false;
  //       });
  //   }, 1000);
  // }

  compressImage(src: any, newX: any, newY: any) {
    return new Promise((res, rej) => {
      var img = new Image();
      img.src = src;
      img.onload = () => {
        const elem = document.createElement('canvas');
        elem.width = newX;
        elem.height = newY;
        const ctx: any = elem.getContext('2d');
        ctx.drawImage(img, 0, 0, newX, newY);
        let data = ctx.canvas.toDataURL();

        if (this.inIframe()) {
          this.openSave = true;
          this.dataURL = data;
          if (this.id && this.filename) {
            this.saveFileandTemplate();
          }
        } else {
          const downloadLink = document.createElement('a');
          const fileName = 'DesignedTemplate.png';
          downloadLink.href = data;
          downloadLink.download = fileName;
          downloadLink.click();
          document.body.removeChild(img);
        }
      };
      img.onerror = (error) => rej(error);
    });
  }
  saveFile() {
    this.openSave = false;
    if (this.window && this.window.top) {
      // window.top refers to parent window
      this.window.top.postMessage(
        this.dataURLtoFile(this.dataURL, this.filename + '.png'),
        '*'
      );
      this.dataURL = null;
      this.filename = '';
      this.id = null;
      this.global.showToast('success', '', 'Modifications enregistrées avec succès');
    }
  }

  dataURLtoFile(dataurl: any, filename: any) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
}
