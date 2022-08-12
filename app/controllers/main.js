function getELE(id) {
    return document.getElementById(id) ; 
}
getELE("btnPurchse").onclick = function() {
    document.querySelector(".modal_purchase").style.transform = "scale(1)" ; 
    document.querySelector(".modal_purchaseForm").style.transform = "translateY(0)" ; 
    // console.log(document.querySelector(".modal_purchase")) ; 
}
getELE("btnClose_modal").onclick = function (){
    document.querySelector(".modal_purchase").style.transform = "scale(0)" ; 
    document.querySelector(".modal_purchaseForm").style.transform = "translateY(-150%)" ;
}
getELE("btnPurchaseModal").onclick = function(){
    document.querySelector(".modal_purchase").style.transform = "scale(0)" ; 
    document.querySelector(".modal_purchaseForm").style.transform = "translateY(-150%)" ;

    document.querySelector(".modal_success").classList.add("show_modalSuccess") ; 
    setTimeout(function(){
        document.querySelector(".modal_success").classList.remove("show_modalSuccess") ;
    },1000)
}