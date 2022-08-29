function ProductService() {
    this.getAPI = function(){
        var promise = axios({
          method: 'get',
          url: 'https://62e789430e5d74566af67388.mockapi.io/phoneProduct'
        })
        return promise ; 
    }
    this.addAPI = function(phoneObject){
        var promise = axios({
            method: 'post',
            url: 'https://62e789430e5d74566af67388.mockapi.io/phoneProduct',
            data: phoneObject
          });
          return promise ; 
    }
    this.deleteAPI = function(name){
        var promise = axios({
            method: 'delete',
            url: `https://62e789430e5d74566af67388.mockapi.io/phoneProduct/${name}`
          });
          return promise ; 
    }
    this.getProduct = function(id){
        var promise = axios({
            method: 'get',
            url: `https://62e789430e5d74566af67388.mockapi.io/phoneProduct/${id}`
          })
          return promise ; 
    }
    this.updateProduct = function(id , phoneObject){
        var promise = axios({
            method: 'put',
            url: `https://62e789430e5d74566af67388.mockapi.io/phoneProduct/${id}` , 
            data : phoneObject  
          })
          return promise ;
    }
}