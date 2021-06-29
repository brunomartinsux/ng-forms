import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  reactiveForm: FormGroup;

  loading = false;
  success = false;

  contacts = []

  constructor( private fb: FormBuilder) { }

  ngOnInit() {

    this.reactiveForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      phone: ['', [Validators.required, Validators.minLength(11)]]
    })

    this.reactiveForm.valueChanges.subscribe(console.log)

  }

  get name() {
    return this.reactiveForm.get('name')
  }

  get email() {
    return this.reactiveForm.get('email')
  }

  get cpf() {
    return this.reactiveForm.get('cpf')
  }

  get phone() {
    return this.reactiveForm.get('phone')
  }


  onSubmit() {

    if(this.reactiveForm.valid){

      this.success = true;
      this.contacts[0].name.push(this.reactiveForm.value.name)
      console.log(this.reactiveForm.value)
      console.log(this.contacts)

    }
  }

}
