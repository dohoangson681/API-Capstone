var arrTbEmpty = [
    "*Vui lòng điền tên sản phẩm" , 
    "*Nhập giá sản phẩm" ,
    "*Nhập loại màn hình" ,
    "*Nhập thông số camera sau" , 
    "*Nhập thông số camera trước" , 
    "*Điền link hình ảnh vào đây" , 
    "*Vui lòng thêm mô tả cho sản phẩm" , 
    "*Nhập loại sản phẩm" 

] ; 
var arrTbValida = [
    "*Tên sản phẩm không hợp lệ",
    "*Giá sản phẩm theo đơn vị dollar với định dạng $100.11 hoặc 100.11 với tối đa 2 số phần thập phân" , 
    "*Loại màn hình không hợp lệ" , 
    "*Thông số camera sau không hợp lệ" , 
    "*Thông số camera trước không hợp lệ" , 
    "*Loại sản phẩm không hợp lệ"
] ; 

function Validation() {
    this.checkEmpty = function(inputValue , idSpanTb , message){
        if(inputValue.trim() != "" ){
            getELE(idSpanTb).style.display = "none" ; 
            getELE(idSpanTb).innerHTML = "" ;  
            return true ; 
        }else{
            getELE(idSpanTb).style.display = "block" ; 
            getELE(idSpanTb).innerHTML = message ;  
            return false ; 
        }
    }
    this.checkHopLe = function(inputValue , idSpanTb , message){
        var regex = /[A-Za-z0-9\s]+$/ ; 
        if(inputValue.match(regex)){
            getELE(idSpanTb).style.display = "none" ; 
            getELE(idSpanTb).innerHTML = "" ;  
            return true ; 
        }else {
            getELE(idSpanTb).style.display = "block" ; 
            getELE(idSpanTb).innerHTML = message ;  
            return false ; 
        }
    }
    this.checkPrice = function(inputValue , idSpanTb , message){
        var regex = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/ ; 
        if(inputValue.match(regex)){
            getELE(idSpanTb).style.display = "none" ; 
            getELE(idSpanTb).innerHTML = "" ;  
            return true ; 
        }else {
            getELE(idSpanTb).style.display = "block" ; 
            getELE(idSpanTb).innerHTML = message ;  
            return false ; 
        }
    }
}