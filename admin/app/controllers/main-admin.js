
var spService = new ProductService() ; 
function getELE(id){
    return document.getElementById(id) ; 
}
function getAPI() {
    spService.getAPI().then(function(success){
        showUI(success.data) ;
    }).catch(function(error){
        console.log(error) ; 
    })
}
getAPI() ;
function showUI(arr) {
    var content = "" ; 
    var stt = 0 ; 
    arr.map(function(phoneObject){
        content += `
            <tr>
                <td>${++stt}</td>
                <td>${phoneObject.name}</td>
                <td>${phoneObject.price}</td>
                <td>
                    <img style="width:15vw ;" class="img-fluid" src="${phoneObject.img}" alt="picture">
                </td>
                <td>
                    <p>Type : ${phoneObject.type}</p>
                    <p>Screen : ${phoneObject.screen}</p>
                    <p>BackCamera : ${phoneObject.backCamera}</p>
                    <p>frontCamera : ${phoneObject.frontCamera}</p>
                    <p>Description : ${phoneObject.desc}</p>
                </td>
                <td>
                    <button onclick = "productDetaisl('${phoneObject.id}')" data-toggle="modal" data-target="#myModal" class = "btn btn-primary w-100 mb-4">Details</button>
                    <button onclick = "deleteProduct('${phoneObject.id}')" class = "btn btn-success w-100 mb-4">Delete</button>
                </td>

            </tr>
        `;
    })
    getELE("tblDanhSachSP").innerHTML = content ; 
}

getELE("btnThemSP").addEventListener("click" , function(){
    resetModal() ; 
    getELE("btnAddNewProduct").style.display = "block" ; 
    document.querySelector(".modal-title").innerHTML = "New Products" ; 
    
}) ; 
// add new product
function addProduct() {
    var tenSP = getELE("TenSP").value ;
    var price = getELE("GiaSP").value ;
    var screen = getELE("screenSP").value ;
    var backCamera = getELE("backCam").value ;
    var frontCamera = getELE("frontCam").value ;
    var img = getELE("img").value ;
    var desc = getELE("description").value ;
    var type = getELE("productType").value;
    // validation
    var validation = new Validation() ; 
    var isValid = true;
    // check nameSP
    isValid &= validation.checkEmpty(tenSP , "TBTenSp" , arrTbEmpty[0] ) && validation.checkHopLe(tenSP , "TBTenSp" , arrTbValida[0]) ; 
    // check Price
    isValid &= validation.checkEmpty(price , "TBPrice" , arrTbEmpty[1] ) && validation.checkPrice(price , "TBPrice" , arrTbValida[1]);
    // check screen
    isValid &= validation.checkEmpty(screen , "TBScreen" , arrTbEmpty[2] ) && validation.checkHopLe(screen , "TBScreen" , arrTbValida[2]) ;
    // check back camera
    isValid &= validation.checkEmpty(backCamera , "TBBackCam" , arrTbEmpty[3] ) && validation.checkHopLe(backCamera , "TBBackCam" , arrTbValida[3]);
    // check front camera
    isValid &= validation.checkEmpty(frontCamera, "TBImg" , arrTbEmpty[4] ) && validation.checkHopLe(frontCamera, "TBImg" , arrTbValida[4]) ;
    // check img
    isValid &= validation.checkEmpty(img, "TBFrontCam" , arrTbEmpty[5] ) ;
    // check desc
    isValid &= validation.checkEmpty(desc, "TBDesc" , arrTbEmpty[6] ) ;
    // check type
    isValid &= validation.checkEmpty(type, "TBType" , arrTbEmpty[7] ) && validation.checkHopLe(type, "TBType" , arrTbValida[5]);
    
    if(isValid){
        
        getELE("btnAddNewProduct").dataset.dismiss = "modal" ; 
        var phoneObject = new PhoneProduct(tenSP , price , screen , backCamera , frontCamera , img , desc , type) ; 
        spService.addAPI(phoneObject).then(function(success){
        getAPI() ; 
        }).catch(function(error){
        console.log(error) ; 
        })
    }else {
        getELE("btnAddNewProduct").dataset.dismiss = "" ; 
    }
    
}
getELE("btnAddNewProduct").onclick = addProduct ; 
function deleteProduct(id) {
    spService.deleteAPI(id).then(function(success){
        getAPI() ; 
    }).catch(function(error){
        console.log(error) ;
    })
}
function productDetaisl(id) {
    spService.getProduct(id)
    .then(function(result){
        console.log(id) ; 
        var phoneObject = result.data ; 
        getELE("TenSP").value = phoneObject.name;
        getELE("GiaSP").value = phoneObject.price;
        getELE("screenSP").value = phoneObject.screen;
        getELE("backCam").value = phoneObject.backCamera;
        getELE("frontCam").value = phoneObject.frontCamera;
        getELE("img").value = phoneObject.img;
        getELE("description").value = phoneObject.desc;
        getELE("productType").value = phoneObject.type;
        // getELE("btnAddNewProduct").style.display = "none" ; 
        // getELE("btnUpdateProduct").style.display = "block" ;
        document.querySelector(".modal-title").innerHTML = "Product Details" ;
        document.querySelector(".modal-footer").innerHTML = `
        <button onclick = "updateAPI('${id}')" id="btnUpdateProduct" class="btn btn-success">Update</button>
        ` ; 
    })
    .catch(function(error){
        console.log(error) ; 
    })
}

function resetModal(){
    var modalEle = document.querySelectorAll(".form-control") ; 
    for(var i = 0 ; i < modalEle.length ; i++){
        modalEle[i].value = "" ; 
    }
    var spanTBEles = document.querySelectorAll(".spanTB") ; 
    for(var i = 0 ; i < spanTBEles.length ; i++){
        spanTBEles[i].style.display = "none" ; 
        spanTBEles[i].innerHTML = "" ;
    }
}
function updateAPI(id) {
    var tenSP = getELE("TenSP").value ;
    var price = getELE("GiaSP").value ;
    var screen = getELE("screenSP").value ;
    var backCamera = getELE("backCam").value ;
    var frontCamera = getELE("frontCam").value ;
    var img = getELE("img").value ;
    var desc = getELE("description").value ;
    var type = getELE("productType").value;


    // validation
    var validation = new Validation() ; 
    var isValid = true;
    // check nameSP
    isValid &= validation.checkEmpty(tenSP , "TBTenSp" , arrTbEmpty[0] ) && validation.checkHopLe(tenSP , "TBTenSp" , arrTbValida[0]) ; 
    // check Price
    isValid &= validation.checkEmpty(price , "TBPrice" , arrTbEmpty[1] ) && validation.checkPrice(price , "TBPrice" , arrTbValida[1]);
    // check screen
    isValid &= validation.checkEmpty(screen , "TBScreen" , arrTbEmpty[2] ) && validation.checkHopLe(screen , "TBScreen" , arrTbValida[2]) ;
    // check back camera
    isValid &= validation.checkEmpty(backCamera , "TBBackCam" , arrTbEmpty[3] ) && validation.checkHopLe(backCamera , "TBBackCam" , arrTbValida[3]);
    // check front camera
    isValid &= validation.checkEmpty(frontCamera, "TBImg" , arrTbEmpty[4] ) && validation.checkHopLe(frontCamera, "TBImg" , arrTbValida[4]) ;
    // check img
    isValid &= validation.checkEmpty(img, "TBFrontCam" , arrTbEmpty[5] ) ;
    // check desc
    isValid &= validation.checkEmpty(desc, "TBDesc" , arrTbEmpty[6] ) ;
    // check type
    isValid &= validation.checkEmpty(type, "TBType" , arrTbEmpty[7] ) && validation.checkHopLe(type, "TBType" , arrTbValida[5]);
    console.log(isValid) ; 
    if(isValid){
        document.querySelector(".close").click() ; 
        var phoneObject = new PhoneProduct(tenSP , price , screen , backCamera , frontCamera , img , desc , type) ; 
        spService.updateProduct(id , phoneObject)
        .then(function(success){
            getAPI() ; 
        })
        .catch(function(error){
        console.log(error) ; 
        }) ;
    }
     
}
// chuy????n ch???? in ti??ng vi????t co?? d????u tha??nh kh??ng d????u 
function toNonAccentVietnamese(str) {
    str = str.replace(/A|??|??|??|???|??|???|???|???|???|??|???|???|???|???/g, "A");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a");
    str = str.replace(/E|??|??|???|???|??|???|???|???|???/, "E");
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e");
    str = str.replace(/I|??|??|??|???/g, "I");
    str = str.replace(/??|??|???|???|??/g, "i");
    str = str.replace(/O|??|??|??|???|??|???|???|???|???|??|???|???|???|???/g, "O");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o");
    str = str.replace(/U|??|??|??|???|??|???|???|???|???/g, "U");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u");
    str = str.replace(/Y|??|???|???|???/g, "Y");
    str = str.replace(/???|??|???|???|???/g, "y");
    str = str.replace(/??/g, "D");
    str = str.replace(/??/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huy???n s???c h???i ng?? n???ng 
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ??, ??, ??, ??, ??
    return str;
}
