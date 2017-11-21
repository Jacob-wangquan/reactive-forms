/**
 * Created by Administrator on 2017/10/1.
 */
import {Component, Input, OnChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from "@angular/forms";

import {Address, Hero, states} from './data-model';

@Component({
  selector:'app-hero-detail',
  templateUrl:'./hero-detail.component.html'
})

export class HeroDetailComponent{
  @Input() hero: Hero;
  ngOnChanges(){
    this.heroForm.reset({
      name: this.hero.name,
      address:this.hero.addresses[0] || new Address()
    })
  }

  heroForm:FormGroup;
  states = states;
  constructor(private fb:FormBuilder){
    this.createForm();
    this.logNameChange();
  }
  createForm() {
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      secretLairs: this.fb.array([]),
      // address:this.fb.group(new Address()),
      power:'',
      sidekick:''
    });
  }

  nameChangeLog: string[] = [];
  logNameChange() {
    const nameControl = this.heroForm.get('name');
    nameControl.valueChanges.forEach(
      (value: string) => this.nameChangeLog.push(value)
    );
  }

  setAddresses(addresses: Address[]) {
    const addressFGs = addresses.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(addressFGs);
    this.heroForm.setControl('secretLairs', addressFormArray);
  }

  get secretLairs(): FormArray {
    return this.heroForm.get('secretLairs') as FormArray;
  };

  addLair() {
    this.secretLairs.push(this.fb.group(new Address()));
  }
}
