let article_list;
function search(){
let URL = 'https://newsapi.org/v2/top-headlines?'+
            'apiKey=150ce9c6b84c49629e2ed81cc2da2e43'+
            '&country='+document.getElementById("country").value+
            '&category='+document.getElementById("category").value+
            '&q='+document.getElementById("keyword").value+
            '&page=1&pageSize=50'
const news = document.querySelector('.news') 
fetch(URL)
   .then(data => data.json())
   .then(response => {
       //handle response here ...
       console.log(response)
       const articles = response.articles
       article_list = articles
       let newsItem=''
       let newscount=0     
       articles.forEach(article => {
            
          
          if(localStorage.getItem("Bookmark_list")!==null){ 
          let list = JSON.parse(localStorage.getItem("Bookmark_list"));
          var str =  'style="background: rgb(106, 106, 245); border: white solid;"'
          for(var i=0;i<list.length;i++){
            if(list[i].url===article.url){
                 str= 'style="border: rgb(106, 106, 245) solid; background: white;"'          
               }
            }
          }
    
                      
           newsItem+=`
        <div class="news-item">
           <div class="image">         
               <div class="bookmark" id="${newscount}"  title="${article.url}" onclick="book_mark(this.id,this.title);">
                    <div class="mark" id="${article.url}" ${str}></div>
               </div>  
               <img src="${article.urlToImage}" alt="No Image Available">                   
           </div>
           <div class="description">
               <h2> ${article.title} </h2>
               <div class="publish">
                 <h4>${article.source.name}</h4>
                 <h5>Published: ${(article.publishedAt).substr(0,10)}</h5>
               </div>
               <p> ${article.description} </p>
           </div>
           <div class="linkpage">
               <a class="linkbutton" href="${article.url}">Go to page</a>
           </div>
       </div>
           `
        newscount++;
       });
       if(newscount>0){
       news.innerHTML = newsItem
       console.log(URL)
       document.getElementById("result-count").innerHTML = "You have "+newscount+" results"
       }
       if(newscount==0){
        news.innerHTML=`<div>No Result Found</div>`
       }
   })
   .catch(error => {
       // handle failed requests here ...
       news.innerHTML=`<div>No Result Found</div>`
   })
}

