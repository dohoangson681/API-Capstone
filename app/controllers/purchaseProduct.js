var arrTBModal = [
  "*Enter username" , 
  "*Enter your address" , 
  "*Enter your phone number" , 
  "*Enter your email" ,
  "*Choose pay method" 
]
var arrTBModalValid = [
  "*Username only contains characters from A-Za-z" , 
  "*Address only contains characters from A-Za-z and numbers" , 
  "*Phone number only contains 10 numbers" , 
  "*Invalid email"
]
var validationmodal = new ValidationFormModal() ; 

getELE("btnPurchse").onclick = function () {
    if(cartContent.length == 0){
      getELE("cartItems").innerHTML = `<h3>Giỏ hàng còn trống</h3>` ; 
      setTimeout(function(){
      getELE("cartItems").innerHTML = "" ; 
      },2000)
    }else{
      document.querySelector(".modal_purchase").style.transform = "scale(1)";
      document.querySelector(".modal_purchaseForm").style.transform =
      "translateY(0)";
    

      showListProductModal() ; 
      resetFormModal() ;
    }
     
    
  };
  getELE("btnClose_modal").onclick = function () {
    document.querySelector(".modal_purchase").style.transform = "scale(0)";
    document.querySelector(".modal_purchaseForm").style.transform =
      "translateY(-150%)";
  };
  getELE("btnPurchaseModal").onclick = function () {
    var isValid = true ; 
    var username = getELE("username").value ; 
    var address = getELE("address").value ;
    var phonenumber = getELE("phonenumber").value ;
    var email = getELE("userEmail").value ;
    

    isValid &= validationmodal.checkEmpty(username , "TBusername" ,arrTBModal[0] ) && validationmodal.checkUserName(username , "TBusername" ,arrTBModalValid[0]) ; 

    isValid &= validationmodal.checkEmpty(address , "TBaddress" ,arrTBModal[1] ) ; 

    isValid &= validationmodal.checkEmpty(phonenumber , "TBphonenumber" ,arrTBModal[2] ) &&  validationmodal.checkPhoneNumber(phonenumber , "TBphonenumber" ,arrTBModalValid[2] ) ;

   isValid &= validationmodal.checkEmpty(email , "TBuserEmail" ,arrTBModal[3] ) && validationmodal.checkUserEmail(email , "TBuserEmail" ,arrTBModalValid[3]) ; 

   isValid &= validationmodal.checkSelectPayMethod("selectPaymethod","spanTBMethod" , arrTBModal[4] ) ;
  var select = getELE("selectPaymethod").selectedIndex  ; 
  if(isValid){
      getELE("btnClose_modal").click() ; 
      document.querySelector(".modal_success").classList.add("show_modalSuccess");
      setTimeout(function () {
        document
          .querySelector(".modal_success")
          .classList.remove("show_modalSuccess");
      }, 1000);
      clearCart() ;
    }
     
  };
function showListProductModal() {
  var content = "" ; 
  cartContent.map(function(objectProduct){
    content += `
              <tr>
                  <p style="font-size: 25px;" class="nameModal text-primary font-weight-bold">${objectProduct.objectSP.name}<span class="ml-5 text-success">${objectProduct.objectSP.price}</span></p>
                  <p>Amount : x${objectProduct.amountSP}</p>
              </tr>
    `;
  })
  getELE("productList_modal").innerHTML = content ; 
  getELE("productPrice_modal").innerHTML = `${sumPrice()} $`  ; 
}
function resetFormModal() {
    var inputElesModal = document.querySelectorAll(".form-control input") ; 
    for (var i = 0; i  < inputElesModal.length; i++) {
      inputElesModal[i].value = "" ; 
    } 
}
