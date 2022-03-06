const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultHeading = document.getElementById('resultHeading')
    singleMealEl = document.getElementById('singleMeal')

const searchMeal = (e) => {
    e.preventDefault()

    singleMealEl.innerHTML = ''

    const term = search.value
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                resultHeading.innerHTML = `<h2>Search results for ${term}</h2>`

                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>No meal found for ${term}</p>`
                } else {
                    mealsEl.innerHTML = data.meals.map(meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                            <div class="meal-info" data-mealId="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    `).join('')
                }
            })
        search.value = ''
    }
}

const addMealToDOM = (meal) => {
    const ingredients = []
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`]
        if(ingredient) {
            ingredients.push(`${ingredient} - ${meal[`strMeasure${i}`]}`)
        } else {
            break
        }
    }
    singleMealEl.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>Category: ${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>Area: ${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
            </div>
        </div>
    `
}

const getRandomMeal = () => {
    mealsEl.innerHTML = ''
    resultHeading.innerHTML = ''

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => {
            addMealToDOM(data.meals[0])
        })
}

const getMealById = id => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0]
            addMealToDOM(meal)
        })
}

submit.addEventListener('submit', searchMeal)
random.addEventListener('click', getRandomMeal)

mealsEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item => item.classList ? item.classList.contains('meal-info') : false)
    if (mealInfo) {
        const mealId = mealInfo.getAttribute('data-mealId')
        getMealById(mealId)
    }
})
