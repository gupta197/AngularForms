import { Component } from '@angular/core';
import { Users } from './users';

@Component({
  selector: 'app-tdf',
  templateUrl: './tdf.component.html',
  styleUrls: ['./tdf.component.css']
})
export class TDFComponent {

  title = 'angularTDF';
  topicHasError = true
  topics = ['Node', 'Angular', 'Vue', 'React']
  userModel = new Users('','abc@bcd.com','','Morning','Node',true)
  validateTopic(value){
    console.log(value)
    if(value == 'default'){
      this.topicHasError= true
    }else{
      this.topicHasError= false
    }
  }
  onSubmit(userForms){
    console.log(userForms)
  }

}
