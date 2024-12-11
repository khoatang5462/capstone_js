export class Validation{
    
    required(value, messageError, errorId){
        const element = document.getElementById(errorId)
        if(value.trim() === ''){
           element.innerHTML = messageError
           element.style.display = 'block'
           return false
        }
    }

    resetValidation(){
        const errorElements = document.querySelectorAll('.sp-thongBao')
        errorElements.forEach(element =>{
            element.innerHTML = ''
            element.style.display = 'none'
        })
       }
}