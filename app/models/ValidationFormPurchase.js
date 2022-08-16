function ValidationFormModal() {
    this.checkEmpty = function (inputValue , idSpanTB , message) {
        if(inputValue.trim() != ""){
            getELE(idSpanTB).style.display = "none" ; 
            getELE(idSpanTB).innerHTML = "" ;
            return true ;  
        }else {
            getELE(idSpanTB).style.display = "block" ; 
            getELE(idSpanTB).innerHTML = message ;
            return false ; 
        }
    }
    this.checkSelectPayMethod = function(idSelect  , idSpanTB , message){
        var select = getELE(idSelect) ; 
        // var select = getELE(idSelect).selectedIndex  ;
        console.log(select); 
        console.log(select.selectedIndex );
        if(select.selectedIndex != 0 ){
            getELE(idSpanTB).style.display = "none" ; 
            getELE(idSpanTB).innerHTML = "" ;
            return true ; 
            
            
        }else{
            getELE(idSpanTB).style.display = "block" ; 
            getELE(idSpanTB).innerHTML = message ;
            return false ;
        }
    }
    this.checkUserName = function(inputValue , idSpanTB , message){
        var patternUsername = /[A-Za-z\s]+$/;
        if(inputValue.match(patternUsername)){
            getELE(idSpanTB).style.display = "none" ; 
            getELE(idSpanTB).innerHTML = "" ;
            return true ;
        }else {
            getELE(idSpanTB).style.display = "block" ; 
            getELE(idSpanTB).innerHTML = message ;
            return false ;
        }
    }
    this.checkPhoneNumber = function(inputValue , idSpanTB , message){
        var patternPhoneNumber = /^[0-9]+$/ ; 
        if(inputValue.match(patternPhoneNumber) && inputValue.length == 10 ){
            getELE(idSpanTB).style.display = "none" ; 
            getELE(idSpanTB).innerHTML = "" ;
            return true ;  
        }else {
            getELE(idSpanTB).style.display = "block" ; 
            getELE(idSpanTB).innerHTML = message ;
            return false ; 
        }

    }
    this.checkUserEmail = function(inputValue , idSpanTB , message) {
        var patternUserEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ; 
        if(inputValue.match(patternUserEmail)){
            getELE(idSpanTB).style.display = "none" ; 
            getELE(idSpanTB).innerHTML = "" ;
            return true ;  
        }else {
            getELE(idSpanTB).style.display = "block" ; 
            getELE(idSpanTB).innerHTML = message ;
            return false ; 
        }
    }
    
}
