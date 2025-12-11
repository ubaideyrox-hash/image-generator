import * as htmlToImage from "html-to-image";
import domtoimage from 'dom-to-image';
import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { GlobalService } from "src/app/global.service";
import { Templates } from "./templates";

@Component({
  selector: 'app-template-design',
  templateUrl: './template-design.component.html',
  styleUrls: ['./template-design.component.scss'],
  providers: [{ provide: Window, useValue: window }],
})
export class TemplateDesignComponent implements OnInit {
  @ViewChild('container') container: any;
  loader : boolean = false
  scale = 3;
  isBusy = false;
  bgcolor = 'lightblue';
  heigthOfRow = '250px';
  pictures: any[] = [];
  droped: any = [];
  activeSection: String = 'Templates';
  spaces = '5px';
  defaultColor: string = '#1976D2';
  openEditor: boolean = false;
  openSave: boolean = false;
  EditorData: string = '';
  filename: string = '';
  dataURL: any = null;
  showSpaces: number = 0;
  dragedPic: string = '';
  columns: any;
  endIndex: any;
  spaceValue: string = '';
  inputIndex: any;
  imageIndex: any;
  showbar : boolean = false;
  canvasBackGroundColor: string = 'background-color:#fff;';
  gridCol: string = '3';
  layoutHeightWidht: String = ' width:800px;height:500px;';
  layoutType: string = 'landscape';
  constructor(
    public global: GlobalService,
    private cdf: ChangeDetectorRef,
    private window: Window
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
    if (event.key === 'Delete' && this.openEditor == false)  {
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
      }
    }
  }

  ngOnInit(): void {
    this.seletedTemplate(1);
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

  dragStart(e: any, c: any, i: any, type: any) {
    this.dragedPic = c;
  }

  drop(e: any, index?: any) {
    debugger;
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

  toggleSidebar() {
    this.showbar = !this.showbar;
  }

  seletedTemplate(value: any) {
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
    debugger;
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

  selectIndex(type: any, index?: any, content?: any) {
    debugger;
    if (type == 'text') {
      this.inputIndex = index;
      this.imageIndex = null;
      this.EditorData = content;
      this.openEditor = true;
    } else if (type == 'both') {
      if (content.includes('data:image') || content.includes('assets/images')) {
        this.imageIndex = index;
        this.inputIndex = null;
      } else {
        this.inputIndex = index;
        this.imageIndex = null;
      }

      this.EditorData = content;
      this.openEditor = true;
    } else if (type == 'image') {
      this.inputIndex = null;
      this.imageIndex = index;
    } else {
      this.inputIndex = null;
      this.imageIndex = null;
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

    console.log(event.htmlValue);
  }
  // download() {
  //   const node = this.container.nativeElement;

  //   const style = {
  //     transform: 'scale(' + this.scale + ')',
  //     transformOrigin: 'top left',
  //     width: node.offsetWidth + 'px',
  //     height: node.offsetHeight + 'px'
  //   };

  //   const param = {
  //     height: node.offsetHeight * this.scale,
  //     width: node.offsetWidth * this.scale,
  //     quality: 1,
  //     style: style
  //   };

  //   domtoimage
  //     .toJpeg(node, param)
  //     .then(function(dataUrl) {
  //       var img = new Image();
  //       img.crossOrigin = 'Anonymous';
  //       img.id = 'getshot';
  //       img.src = dataUrl;
  //       document.body.appendChild(img);
  //       const getshot: any = document.querySelector('#getshot');

  //       var a = document.createElement('a');
  //       a.href = getshot.src;
  //       a.download = 'DesignedTemplate.png';
  //       a.click();
  //       document.body.removeChild(img);
  //     })
  //     .catch(function(error: any) {
  //       console.error('oops, something went wrong!', error);
  //     });
  // }
  download() {
    this.loader = true
    const node = this.container.nativeElement;
    const originalWidth = node.offsetWidth;
    const originalHeight = node.offsetHeight;
    const aspectRatio = originalWidth / originalHeight;
  
    const newWidth = 1920;
    const newHeight = Math.round(newWidth / aspectRatio);
    const scale = newWidth / originalWidth;
  
    const style = {
      transform: 'scale(' + scale + ')',
      transformOrigin: 'top left',
      width: newWidth + 'px',
      height: newHeight + 'px'
    };
  
    const param = {
      height: newHeight,
      width: newWidth,
      quality: 0.9,
      style: style
    };
  
    setTimeout(() => {
      domtoimage
        .toJpeg(node, param)
        .then(function(dataUrl) {
          var img = new Image();
          img.crossOrigin = 'Anonymous';
          img.id = 'getshot';
          img.src = dataUrl;
          document.body.appendChild(img);
          const getshot: any = document.querySelector('#getshot');
  
          var a = document.createElement('a');
          a.href = getshot.src;
          a.download = 'DesignedTemplate.jpg';
          a.click();
          document.body.removeChild(img);
        })
        .catch(function(error: any) {
          this.loader = false
          console.error('oops, something went wrong!', error);
        });
    this.loader = false

    }, 500);
  }

  imageClick(){
    debugger
    this.showbar = false
  }
  
  // generateImage() {
  //   this.isBusy = true;
  //   this.inputIndex = null;
  //   this.imageIndex = null;
  //   setTimeout(() => {
  //     var node: any = document.getElementById('image-section');
      
  //     node.style.width = "800px";
  //     node.style.height = "455px";
  //     node.style.objectFit = "contain";
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

  // compressImage(src: any, newX: any, newY: any) {
  //   return new Promise((res, rej) => {
  //     const img = new Image();
  //     img.src = src;
  //     img.onload = () => {
  //       const elem = document.createElement('canvas');
  //       elem.width = newX;
  //       elem.height = newY;
  //       const ctx: any = elem.getContext('2d');
  //       ctx.drawImage(img, 0, 0, newX, newY);
  //       let data = ctx.canvas.toDataURL('image/png', 0.9);

  //       if (this.inIframe()) {
  //         this.openSave = true;
  //         this.dataURL = data;
  //       } else {
  //         const downloadLink = document.createElement('a');
  //         const fileName = 'DesignedTemplate.png';
  //         downloadLink.href = data;
  //         downloadLink.download = fileName;
  //         downloadLink.click();
  //       }
  //     };
  //     img.onerror = (error) => rej(error);
  //   });
  // }
  saveFile() {
    debugger;
    this.openSave = false;
    if (this.window && this.window.top) {
      // window.top refers to parent window
      this.window.top.postMessage(
        this.dataURLtoFile(this.dataURL, this.filename + '.png'),
        '*'
      );
      this.dataURL = null;
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
