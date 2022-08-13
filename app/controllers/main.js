var spService = new SanPhamService() ; 
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
function getAPI() {
    spService.getAPI()
    .then(function(success){
        console.log(success) ;
        showUI(success.data) ;
        overlayCard(success.data) ; 
    })
    .catch(function(error){
        console.log(error) ; 
    }) ; 
} ; 
getAPI() ; 
function showUI(arr) {
    var content = "" ; 
    arr.map(function(objectProduct){
        content += `
        <div class="col-3">
            <div class="card cardStyle" >
              <div class="cardImage">
                <img src="${objectProduct.img}" class="card-img-top cardImage" alt="picture" />
              </div>
             
              <div class="card-body">
                <p class="product_Name">${objectProduct.name}</p>
                <p class="product_price">${objectProduct.price}</p>
              </div>
              <div class="btnCard">
                <button class="btn btn-success">Buy now</button>
                <button class="btn btn-success">Add to cart</button>
              </div>
              <div class="card_overlay">
                <p class="screenProduct">${objectProduct.screen}</p>
                <p class="backCam">Back Camera : ${objectProduct.backCamera}</p>
                <p class="frontCam">Front Camera : ${objectProduct.frontCamera}</p>
                <p class="descProduct">${objectProduct.desc}</p>
              </div>
            </div>
          </div>
        `;
        // var url = objectProduct.img ; 
        // console.log("url" , url) ; 
        // document.querySelector(".card_overlay").style.background =  "url('" + url + "')" ; 
        // console.log("url('" + url + "')") ; 
    })
    getELE("productItemsAll").innerHTML = content ; 
}
function overlayCard(arr){
    var overlayEle = document.querySelectorAll(".card_overlay") ; 
    console.log(overlayEle) ; 
    arr.map(function(objectProduct , idx){
        var url = objectProduct.img ; 
        overlayEle[idx].style.background = "url(' "  + url + " ') " ; 
        overlayEle[idx].style.backgroundSize = "120%" ; 
        overlayEle[idx].style.backgroundRepeat = "no-repeat" ; 
        overlayEle[idx].style.backgroundPosition = "center" ; 
    })
}
