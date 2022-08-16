function SanPhamService() {
    // get data from API
    this.getAPI = function(){
        return axios({
            method: 'get',
            url: 'https://62e789430e5d74566af67388.mockapi.io/phoneProduct',
            
          }) ; 
            
      }
    // get object using id
    this.getProduct = function(id){
        return axios({
            method: 'get',
            url: `https://62e789430e5d74566af67388.mockapi.io/phoneProduct/${id}`,
            
          }) ;
    }
    
}

