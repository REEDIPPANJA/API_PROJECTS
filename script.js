
const url= "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

const btn=document.querySelector('#btn')

const ind=document.querySelector('#ind');
const indDes=document.querySelector('#ind-des');

function changeIndDes(indval, indDesval){
    ind.innerHTML=indval;
    indDes.innerHTML=indDesval;
}

btn.addEventListener('click',()=>{
    let input=document.querySelector('#searchbox').value.trim();
    if (!input) {
        changeIndDes("", "Please enter an ingredient.");
        return;
    }


    fetch(url)
    .then((response)=>{
         return response.json();
    })
    .then((data)=>{
        if (!data.meals) {
            changeIndDes("", "No data found from API.");
            return;
        }

        let found = false;
          for(let i=0; i<data.meals.length;i++){
            if(data.meals[i].strIngredient.toLowerCase()===input.toLowerCase()){
                document.querySelector(".description").style.display = "block"
                changeIndDes(input,data.meals[i].strDescription);
                found=true;
                break;
                  
            }
        }
          if(!found){
            changeIndDes("","NOT FOUND");
        }
    })
    .catch((error)=>{
        console.log(error);
        changeIndDes("","ERROR : 404 bad request"); 
    })
})
