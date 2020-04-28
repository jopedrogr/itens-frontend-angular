import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  @Input() itemName='';

  constructor(private httpClient: HttpClient) {}

  retriviedItens: Object[] = [];

  getItens() {
    this.clear();

    this.httpClient.get<Object[]>('http://localhost:8080/item/list/')
    .subscribe(item => {
      /*
      Object.keys(item).forEach(function(i){
        item[i].image = 'data:image/jpeg;base64,' + item[i].image;
      })
      */
      this.retriviedItens = item;
      

    });
  }      

  retriviedItem: Object = [];

  getItem() {
    this.clear();

    this.httpClient.get<Object>('http://localhost:8080/item/list/' + this.itemName)
    .subscribe(item => {
    
      //item['image'] = 'data:image/jpeg;base64,' + item['image'];
      this.retriviedItem = item;
      this.show = true;

     });
  }

  deleteItem() {
    this.clear();

    this.httpClient.get('http://localhost:8080/item/list/delete/' + this.itemName)
    .subscribe(item => {
    
      new alert("Item deletado do banco de dados!");

     });
  }

  selectedFile: File;
  imageConvert: String;
  message: String;

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (event) => {
      this.imageConvert = reader.result.toString();
    };
  }

  onUpload() {   
    this.clear();

    var body = JSON.stringify({name: this.itemName, description: 'teste', image: this.imageConvert});  

    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    let options = { headers: headers };

    return this.httpClient.post('http://localhost:8080/item/upload', body, options)
          .subscribe((response) => {
            err => {
              new alert("A imagem não foi salva!");
            }
              new alert("Imagem salva com sucesso!");
          });
  }

  show = true;

  clear(){
    this.retriviedItens = [];
    this.retriviedItem = [];
  }

}
