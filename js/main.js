import { loadTypes, displayTypes, allTypes, allCuisines, displayCuisines, loadCuisines } from './components/hero.js';
import {allMeals, loadMeals, displayAllMeals, searchInput } from "../js/components/meal cards.js"
import {productSearchInput, loadProducts, displayProduct} from './components/product scanner.js'
const mainContentLink = document.querySelector('[href="#main-content"]')
const productScannerLink = document.querySelector('[href="#products-section"]')
const mealLogLink = document.querySelector('[href="#foodlog-section"]')
 //this has to display each section separately when anchor is clicked from side bar
 //although it doesn't work and only shows the first page
/*mainContentLink.addEventListener('click',function(e){
  e.preventDefault();
  document.getElementById('main-content').classList.remove('hidden')
  document.getElementById('products-section').classList.add('hidden')
  document.getElementById('foodlog-section').classList.add('hidden')
})
productScannerLink.addEventListener('click', function(e){
  e.preventDefault();
  document.getElementById('products-section').classList.remove('hidden')
  document.getElementById('main-content').classList.add('hidden')
  document.getElementById('foodlog-section').classList.add('hidden')
})
mealLogLink.addEventListener('click', function(e){
  e.preventDefault();
  document.getElementById('foodlog-section').classList.remove('hidden')
  document.getElementById('main-content').classList.add('hidden')
  document.getElementById('products-section').classList.add('hidden')
})*/

loadCuisines()
loadTypes()
loadMeals('chicken')
//this shouls show recipe when a cuisine category is clicked
document.getElementById("cuisines").addEventListener('click', function(e){
  const cuisine = e.target.closest('button');
  const areaName = cuisine.dataset.name
  console.log(areaName)
  //i can't think what do after this
})
let details;
let chosenRecipe = document.getElementById('recipes-grid')
chosenRecipe.addEventListener('click', function(e){
    const card = e.target.closest(".recipe-card");
    const mealId = card.dataset.mealId;
    showMealDetail(mealId)
})
async function showMealDetail(id){
    let response = await fetch(`https://nutriplan-api.vercel.app/api/meals/${id}`);
    if(response.ok){
        let data = await response.json();
        details = data.result;
        mealDetails()
    }
} //shows meal detail- please scroll to be able to see it
function mealDetails(){
    document.getElementById('meal-details').classList.remove('hidden')
    document.getElementById('meal-details').innerHTML = 
    `<div class="max-w-7xl mx-auto">
          <!-- Back Button -->
          <button
            id="back-to-meals-btn"
            class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors"
          >
            <i class="fa-solid fa-arrow-left"></i>
            <span>Back to Recipes</span>
          </button>

          <!-- Hero Section -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div class="relative h-80 md:h-96">
              <img
                src="${details.thumbnail}"
                alt="${details.name}"
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              ></div>
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <div class="flex items-center gap-3 mb-3">
                  <span
                    class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full"
                    >${details.category}</span
                  >
                  <span
                    class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full"
                    >${details.area}</span
                  >
                </div>
                <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                  ${details.name}
                </h1>
                <div class="flex items-center gap-6 text-white/90">
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-clock"></i>
                    <span>30 min</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-utensils"></i>
                    <span id="hero-servings">4 servings</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-fire"></i>
                    <span id="hero-calories">485 cal/serving</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-3 mb-8">
            <button
              id="log-meal-btn"
              class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
              data-meal-id="52772"
            >
              <i class="fa-solid fa-clipboard-list"></i>
              <span>Log This Meal</span>
            </button>
          </div>

          <!-- Main Content Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column - Ingredients & Instructions -->
            <div class="lg:col-span-2 space-y-8">
              <!-- Ingredients -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-list-check text-emerald-600"></i>
                  Ingredients
                  <span class="text-sm font-normal text-gray-500 ml-auto"
                    >9 items</span
                  >
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900">${details.ingredients[0].measure}</span>
                      ${details.ingredients[0].ingredient}
                    </span>
                  </div>
                  <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900">${details.ingredients[1].measure}</span>
                      ${details.ingredients[1].ingredient}
                    </span>
                  </div>
                  <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900">${details.ingredients[2].measure}</span>
                      ${details.ingredients[2].ingredient}
                    </span>
                  </div>
                  <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900"
                        >${details.ingredients[3].measure}</span
                      >
                      ${details.ingredients[3].ingredient}
                    </span>
                  </div>
                  <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900"
                        >${details.ingredients[4].measure}</span
                      >
                      ${details.ingredients[4].ingredient}
                    </span>
                  </div>
                  <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900"
                        >${details.ingredients[5].measure}</span
                      >
                      ${details.ingredients[5].ingredient}
                    </span>
                  </div>
                  <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900">${details.ingredients[6].measure}</span>
                      ${details.ingredients[6].ingredient}
                    </span>
                  </div>
                  <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900">${details.ingredients[7].measure}</span>
                      ${details.ingredients[7].ingredient}
                    </span>
                  </div>
                  <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900">${details.ingredients[8].measure}</span>
                      ${details.ingredients[8].ingredient}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Instructions -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
                  Instructions
                </h2>
                <div class="space-y-4">
                  <div
                    class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div
                      class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
                    >
                      1
                    </div>
                    <p class="text-gray-700 leading-relaxed pt-2">
                      ${details.instructions[0]}
                    </p>
                  </div>
                  <div
                    class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div
                      class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
                    >
                      2
                    </div>
                    <p class="text-gray-700 leading-relaxed pt-2">
                      ${details.instructions[1]}
                    </p>
                  </div>
                  <div
                    class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div
                      class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
                    >
                      3
                    </div>
                    <p class="text-gray-700 leading-relaxed pt-2">
                     ${details.instructions[2]}
                    </p>
                  </div>
                  <div
                    class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div
                      class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
                    >
                      4
                    </div>
                    <p class="text-gray-700 leading-relaxed pt-2">
                      ${details.instructions[3]}
                    </p>
                  </div>
                  <div
                    class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div
                      class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
                    >
                      5
                    </div>
                    <p class="text-gray-700 leading-relaxed pt-2">
                      ${details.instructions[4]}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Video Section -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-video text-red-500"></i>
                  Video Tutorial
                </h2>
                <div
                  class="relative aspect-video rounded-xl overflow-hidden bg-gray-100"
                >
                  <iframe
                    src="${details.youtube}"
                    class="absolute inset-0 w-full h-full"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  >
                  </iframe>
                </div>
              </div>
            </div>

            <!-- Right Column - Nutrition -->
            <div class="space-y-6">
              <!-- Nutrition Facts -->
              <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                  Nutrition Facts
                </h2>
                <div id="nutrition-facts-container">
                  <p class="text-sm text-gray-500 mb-4">Per serving</p>

                  <div
                    class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl"
                  >
                    <p class="text-sm text-gray-600">Calories per serving</p>
                    <p class="text-4xl font-bold text-emerald-600">485</p>
                    <p class="text-xs text-gray-500 mt-1">Total: 1940 cal</p>
                  </div>

                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span class="text-gray-700">Protein</span>
                      </div>
                      <span class="font-bold text-gray-900">42g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-emerald-500 h-2 rounded-full"
                        style="width: 84%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span class="text-gray-700">Carbs</span>
                      </div>
                      <span class="font-bold text-gray-900">52g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-blue-500 h-2 rounded-full"
                        style="width: 17%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span class="text-gray-700">Fat</span>
                      </div>
                      <span class="font-bold text-gray-900">8g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-purple-500 h-2 rounded-full"
                        style="width: 12%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span class="text-gray-700">Fiber</span>
                      </div>
                      <span class="font-bold text-gray-900">4g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-orange-500 h-2 rounded-full"
                        style="width: 14%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span class="text-gray-700">Sugar</span>
                      </div>
                      <span class="font-bold text-gray-900">12g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-pink-500 h-2 rounded-full"
                        style="width: 24%"
                      ></div>
                    </div>
                  </div>

                  <div class="mt-6 pt-6 border-t border-gray-100">
                    <h3 class="text-sm font-semibold text-gray-900 mb-3">
                      Vitamins & Minerals (% Daily Value)
                    </h3>
                    <div class="grid grid-cols-2 gap-3 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-600">Vitamin A</span>
                        <span class="font-medium">15%</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Vitamin C</span>
                        <span class="font-medium">25%</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Calcium</span>
                        <span class="font-medium">4%</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Iron</span>
                        <span class="font-medium">12%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
        const backToRecipeBtns = document.getElementById('back-to-meals-btn')
        backToRecipeBtns.addEventListener('click',function(){
        document.getElementById('meal-details').classList.add('hidden')
})
/*async function getNutritionInfo(){
  response = await fetch('https://nutriplan-api.vercel.app/api/nutrition/analyze',
    {
      method :"POST",
      headers:{"Content-Type": "application/json",
        "x-api-key": "fNrQiOwURXthzjP5F1mnGr9gxVPguR51cYfEmMZx"
      }
    }
  )
if(response.ok){
  let data = await response.json();
  let nutritionInfo = data.response;
}
}*/

const logMealBtn = document.getElementById('log-meal-btn')
logMealBtn.addEventListener('click', function(){
  document.getElementById('logMeal').style.display = 'flex'
  document.getElementById('logMeal').innerHTML = `
      <div class="log-screen-container">
        <div>
        <div class="d-flex mb-2">
          <div class="w-25 h-25">
            <img class="w-100 rounded rounded-2" src="" alt="">
          </div>
          <div>
            <h3>Log this meal</h3>
            <p class="text-secondary"></p>
          </div>
        </div>
        <div>
          <span class="text-secondary">Number of Servings</span>
        </div>
        <div class="d-flex justify-content-start p-2">
          <button class="servings-btn">-</button>
          <input type="number" name="servings" id="servings" min="0" max="100" step="0.5" value="1">
          <button class="servings-btn">+</button>
        </div>
        <div class="nutrition-facts">
          <p>Estimated nutrition per serving:</p>
          <div class="nutrition-facts-inner">
            <div>
              <span></span> <p>Calories</p>
            </div>
            <div>
              <span></span> <p>Protein</p>
            </div>
            <div>
              <span></span> <p>Carbs</p>
            </div>
            <div>
              <span></span> <p>Fat</p>
            </div>
          </div>
        </div>
        <div class="btns">
          <button class="cancel-btn">Cancel</button>
          <button class="log-btn">Log meal</button>
        </div>
      </div>
      </div>
    `
})
const cancelBtn = document.querySelector('.cancel-btn')
cancelBtn.addEventListener('click', function(){
  document.getElementById('logMeal').style.display ='none'
})
document.getElementById.querySelector('.log-btn').addEventListener('click',function(){
  document.getElementById('logged-items-list').innerHTML = 
  `<div class="flex justify-between">
                  <div class="flex">
                    <div class="w-50">
                      <img src="" alt="" class="w-full">
                    </div>
                    <div>
                      <h4>
                      </h4>
                      <p> serving</p> <span>Recipe</span>
                    </div>
                  </div>
                  <div class="flex">
                    <div><h4>1564</h4>
                      <span>kcal</span>
                    </div>
                    <div>95g P</div>
                    <div>107g C</div>
                    <div>149g F</div>
                    <div><i class="fa-solid fa-trash-can"></i></div>
                  </div>
                </div>`
})
}

