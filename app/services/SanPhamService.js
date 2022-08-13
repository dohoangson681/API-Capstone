function SanPhamService() {
    this.getAPI = function(){
        return axios({
            method: 'get',
            url: 'https://62e789430e5d74566af67388.mockapi.io/phoneProduct',
            
          }) ; 
            
      }
}

