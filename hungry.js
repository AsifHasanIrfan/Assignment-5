//event listener function //
const searchError = document.getElementById('searchError');
const showFood = document.getElementById('showFood');
const foodSearch = document.getElementById('foodSearch');
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', () => {
    getFoodName(foodSearch.value);
})

// get Food Name function //
function getFoodName(foodName) {
    document.getElementById('foodDetail').innerHTML ='';
    if(foodName == ''){
        errorHtml =`
            <h5>Please enter a food name first.</h5>
        `;
        searchError.innerHTML = errorHtml;
    }
    else{
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            let error = '';
            let html = '';
            if(data.meals){
                data.meals.forEach(food => {
                    html += `
                        <div onClick="getFoodDetail('${food.idMeal}')" class="col">
                            <div class="card h-100">
                                <img src="${food.strMealThumb}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title text-center">${food.strMeal}</h5>
                                </div>
                            </div>
                        </div>
                    `;
                })
            }else{
                error = `<h5>Sorry, we didn't find any food.</h5>`
            }
            searchError.innerHTML = error
            showFood.innerHTML = html
        })
    }
    
}

// food details api call //
function getFoodDetail (id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(response => response.json())
    .then(data => foodDetails(data.meals[0]))
}

const foodDetails = (food) => {
    const foodDetail = document.getElementById('foodDetail');
    foodDetail.innerHTML = `
            <div class="card mb-3 food-detail">
                <img src="${food.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h2 class="card-title">${food.strMeal}</h2>
                    <h5 class="mt-4">Ingredients</h5>
                </div>
                <div class="mx-4 pb-4">
                        <li>${food.strIngredient1}</li>
                        <li>${food.strIngredient2}</li>
                        <li>${food.strIngredient3}</li>
                        <li>${food.strIngredient4}</li>
                        <li>${food.strIngredient5}</li>
                        <li>${food.strIngredient6}</li>
                        <li>${food.strIngredient7}</li>
                        <li>${food.strIngredient8}</li>
                        <li>${food.strIngredient9}</li>
                        <li>${food.strIngredient10}</li>
                    </ul>
                </div>
            </div>
          `;
}
