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
        <div class="col-3 mt-5">
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
   
    arr.map(function(objectProduct , idx){
        var url = objectProduct.img ; 
        overlayEle[idx].style.background = "url(' "  + url + " ') " ; 
        overlayEle[idx].style.backgroundSize = "120%" ; 
        overlayEle[idx].style.backgroundRepeat = "no-repeat" ; 
        overlayEle[idx].style.backgroundPosition = "center" ; 
    })
}
// search by select
function phoneCategory() {
    // dùng get method để lấy tất cả dữ liệu ra và gán vào 1 mảng
    spService.getAPI().then(function(success){
        // console.log(success) ; 
        var productArr = success.data ;
        // console.log(productArr); 
        // sau khi lay dc mang gia tri  , tao mot mang moi rong de chua cac object can search va show len UI
        var seachArray = [] ; 
        // dung map de duyet mang , neu phan tu nao cua mang thoa man thi push object do vao trong mang
        var seachKey = getELE("selectProduct").value ; 
        // console.log(seachKey) ; 
        if(seachKey === "0"){
            // nếu user muốn xem tất cả sản phẩm thì showUI mảng lấy đc từ API
            showUI(productArr) ; 
            overlayCard(productArr) ;
        }else if(seachKey === "1"){
            // nếu người dùng muốn xem các sản phẩm của Samsung 
            productArr.map(function(objectProduct){
                if(objectProduct.type.toLowerCase() ==="samsung") seachArray.push(objectProduct) ; 

            })
            showUI(seachArray) ;
            overlayCard(seachArray) ;  
        }else {
            productArr.map(function(objectProduct){
                if(objectProduct.type.toLowerCase() ==="iphone") seachArray.push(objectProduct) ; 

            }) 
            showUI(seachArray) ;
            overlayCard(seachArray) ; 
        }
        // console.log("seachArray" , seachArray) ; 
        
    }).catch(function(error){
        console.log(error) ; 
    })
    

}
