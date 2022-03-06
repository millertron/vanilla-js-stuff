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
                resultHeading.innterHTML = `<h2>Search results for ${term}</h2>`

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

submit.addEventListener('submit', searchMeal)
