import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  help = false;
  success = false;

  constructor( ) { }

  ngOnInit() {}


  onSubmit(form) {

    if(form.valid){

      this.success = true;
      console.log(form)

    } else {
      window.alert("Preencher formulário corretamente!")
    }
  }

}
