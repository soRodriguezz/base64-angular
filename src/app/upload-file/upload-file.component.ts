import { Component, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styles: [
  ]
})
export class UploadFileComponent implements OnInit {

  base64Output!: any;

  textoAdjunto:string = 'Seleccionar adjunto';

  sizeFile: number = 3145728; // 3MB

  arrTipos = [  // tipos de archivos permitidos
    'image/png',  // png
    'image/jpeg', //jpeg
    'image/jpg',  // jpg
    'application/pdf',  // pdf
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',  // xlsx
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/msword', // doc
    'application/vnd.ms-excel'  // xls
  ];

  constructor() { }

  ngOnInit(): void {}

  limpiarDatos() {
    this.base64Output = '';
    this.textoAdjunto = 'Seleccionar adjunto';
  }

  onFileSelected( event: any ) {
    const file = event.target.files[0]; // 1 archivo
    
    if(event.target.files.length !== 0) {
      this.textoAdjunto = file.name;
    }

    this.getBase64( file ).then( data => {
      if (this.arrTipos.indexOf(file.type) === -1) {
        console.log('tipo de archivo no permitido');
        this.limpiarDatos();
      } else if (file.size > this.sizeFile) { // 3MB
        console.log('tamaño de archivo no permitido');
        this.limpiarDatos();
      } else{
        console.log('todo bien');
        this.base64Output = data;
      }
    });
  }

  guardar(  ) {
    if ( this.base64Output.length !== 0 ) {
      console.log(this.base64Output);
    } else {
      console.log('NO subido');
    }
  }

  getBase64(file: any) {
    if ( file !== undefined) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    } else {
      return new Promise(a => {});
    }
  }
}
