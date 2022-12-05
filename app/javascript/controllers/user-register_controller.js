
import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "benefits","terms","register","input" ]

  connect() {
     console.log(this.inputTarget)
     console.log(this.inputTarget.children)
    //  console.log(this.inputTarget.children === field_with_errors)
      
      if (this.inputTarget){
        console.log("132")
      }else{
        this.benefitsTarget.classList.add("d-block")
        this.termsTarget.classList.add("d-none")
        this.registerTarget.classList.add("d-none")  
      }
      
  }

  benefitsNext(){
    this.benefitsTarget.classList.replace("d-block","d-none")
    this.termsTarget.classList.replace("d-none","d-block")
  }

  termsBack(){
    console.log("上");

    this.termsTarget.classList.replace("d-block","d-none")
    this.benefitsTarget.classList.replace("d-none","d-block")
  }

  termsNext(){
    this.termsTarget.classList.replace("d-block","d-none")
    this.registerTarget.classList.replace("d-none","d-block")
  }

  registerBack(){
    console.log("上");
    this.registerTarget.classList.replace("d-block","d-none")
    this.termsTarget.classList.replace("d-none","d-block")
  }
}
