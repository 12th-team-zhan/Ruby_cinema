
import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "benefits", "terms", "register","termsConfirmed"]

  connect() {
    this.termsConfirmedTarget.classList.toggle("disabled")
    
    if (document.querySelector(".field_with_errors")){
      this.benefitsTarget.classList.toggle("d-none")
      this.termsTarget.classList.toggle("d-none")
      this.registerTarget.classList.toggle("d-block")
    }else{
      this.benefitsTarget.classList.toggle("d-block")
      this.termsTarget.classList.toggle("d-none")
      this.registerTarget.classList.toggle("d-none")  
    }
      
  }

  confirm(){
    if(document.getElementById("TermsCheckbox").checked){
      this.termsConfirmedTarget.classList.add("disabled")
      this.termsConfirmedTarget.classList.replace("disabled","action")
    }else{
      this.termsConfirmedTarget.classList.add("action")
      this.termsConfirmedTarget.classList.replace("action","disabled")
    }
  }

  benefitsNext(){
    this.benefitsTarget.classList.replace("d-block","d-none")
    this.termsTarget.classList.replace("d-none","d-block")
  }

  termsBack(){
    this.termsTarget.classList.replace("d-block","d-none")
    this.benefitsTarget.classList.replace("d-none","d-block")
  }

  termsNext(){
    this.termsTarget.classList.replace("d-block","d-none")
    this.registerTarget.classList.replace("d-none","d-block")
  }

  registerBack(){
    this.registerTarget.classList.replace("d-block","d-none")
    this.termsTarget.classList.replace("d-none","d-block")
  }
}
