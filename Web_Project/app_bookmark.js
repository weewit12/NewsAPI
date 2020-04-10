function bookmark_list(){
 if(localStorage.getItem("Bookmark_list")!==null){   
 let articles = JSON.parse(localStorage.getItem("Bookmark_list"));
 console.log(articles);
 const news = document.querySelector('.news') 
 let newsItem=''
 let newscount=0;
for(var i=0;i<articles.length;i++){
    newsItem+=`
    <div class="news-item">
       <div class="image">         
           <div class="bookmark" id=${articles[i].url} onclick="unbook_mark(this.id);">
                <div class="mark" style="border: rgb(106, 106, 245) solid; background: white;"></div>
           </div>  
           <img src="${articles[i].urlToImage}" alt="No Image Available">               
       </div>
       <div class="description">
           <h2> ${articles[i].title} </h2>
           <div class="publish">
             <h4>${articles[i].name}</h4>
             <h5>Published: ${articles[i].publishedAt}</h5>
           </div>
           <p> ${articles[i].description} </p>
       </div>
       <div class="linkpage">
           <a class="linkbutton" href="${articles[i].url}">Go to page</a>
       </div>
   </div>
       `
       newscount++;
       
}
news.innerHTML=newsItem
document.getElementById("result-count").innerHTML = "You have "+newscount+" results"
console.log(newsItem);
 }
}

function unbook_mark(url){

 if(localStorage.getItem("Bookmark_list")!==null){ 
 let list = JSON.parse(localStorage.getItem("Bookmark_list"));
 for(var i=0;i<list.length;i++){
   if(list[i].url===url){
    document.getElementById(url).style.background = "rgb(106, 106, 245)";
    document.getElementById(url).style.border = "white solid";
      for(var j=i;j<list.length;j++){
        list[j]=list[j+1];
      }
      list.pop();
      let bookmark_serialized = JSON.stringify(list);
      localStorage.setItem("Bookmark_list",bookmark_serialized);
      console.log(JSON.parse(localStorage.getItem("Bookmark_list")))
      bookmark_list();
   }
 }
 }
}
