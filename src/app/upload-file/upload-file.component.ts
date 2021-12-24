import { Component, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styles: [
  ]
})
export class UploadFileComponent implements OnInit {

  base64Output!: string;

  sizeFile: number = 3000000;

  constructor() { }

  ngOnInit(): void {}

  onFileSelected( event: any ) {
    const file = event.target.files[0]; // 1 archivo

    const arrTipos = [  // tipos de archivos permitidos
      'image/png',  // png
      'image/jpeg', //jpeg
      'image/jpg',  // jpg
      'application/pdf',  // pdf
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',  // xlsx
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
      'application/msword', // doc
      'application/vnd.ms-excel'  // xls
    ];

    this.getBase64(event.target.files[0]).then( data => {
      console.log(data);
      if (arrTipos.indexOf(file.type) === -1) {
        console.log('tipo de archivo no permitido');
      } else if (file.size > 3145728) { // 3MB
        console.log('tamaño de archivo no permitido');
      }
    });

    this.base64Output = event.target.files;

    // if ( event.target.files.length !== 0 || event.target.files[0] !== null ) {
    //   if ( file.size < this.sizeFile ) { // tamaño superior a 3MB
    //     this.convertFile( event.target.files[0] ).subscribe( ( base64: any ) => {
    //       this.base64Output = base64; // base64
    //       console.log('se subio bien');
    //     });
    //   } else {
    //     console.log('Tamaño superior a 3MB');
    //   }
    // } else {
    //   console.log('no se eligio archivo');
    // }
  }

  guardar(  ) {
    if ( this.base64Output ) {
      // if ( event.target.files.length == 0 || event.target.files[0] == null ) {
      console.log('archivo subido');
    } else {
      console.log('NO subido');
    }
    // 3MB -> 3000000 Bytes 

    // if (event.target.files.length != 0 || event.target.files[0] != null ) {
     
    // }else {
    //    // cuando este vacío 
    // }
    // console.log(this.base64Output);
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();

    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target!.result!.toString()));

    return result;
  }

  getBase64(file: any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
  }
}
