// =========== Loading Spinner Design ============
/*
<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>
*/

// =========== Empty State Design ============
/*
<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No recipes found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
</div>
*/
/*loading cuisines*/
import {loadMeals, allMeals, displayAllMeals} from './meal cards.js'
export let allTypes;
export let allCuisines;
export async function loadCuisines(){
    let response = await fetch("https://nutriplan-api.vercel.app/api/meals/areas")
    if(response.ok){
        let data = await response.json()
        allCuisines = data.results
        displayCuisines()
    }
}
export function displayCuisines(){
    let cuisine = ``
    for(let i =0; i<allCuisines.length ;i++){
        cuisine +=`
            <button data-name=${allCuisines[i].name}
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
            >
              ${allCuisines[i].name}
            </button>
          </div>`
    }
    document.getElementById("cuisines").innerHTML = cuisine
}
//loading categories
export async function loadTypes(){
    let response = await fetch('https://nutriplan-api.vercel.app/api/meals/categories')
    if(response.ok){
        let data = await response.json()
        allTypes = data.results
        displayTypes()
    }
}
export function getCategoryIcon(categoryName) {
    const iconMap = {
        'Beef': 'fa-drumstick-bite',
        'Chicken': 'fa-drumstick-bite',
        'Pork': 'fa-drumstick-bite',
        'Fish': 'fa-fish',
        'Seafood': 'fa-fish',
        'Vegetarian': 'fa-leaf',
        'Vegan': 'fa-leaf',
        'Dessert': 'fa-ice-cream',
        'Pasta': 'fa-utensils',
        'Breakfast': 'fa-coffee',
        'Lunch': 'fa-utensils',
        'Dinner': 'fa-utensils'
    };
    return iconMap[categoryName] || 'fa-utensils'; // default icon
}

export function displayTypes(){
    let type = ``
    for(let i=0 ;i<allTypes.length ;i++){
         type += `<div
              class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
              data-category="${allTypes[i].id}"
            >
              <div class="flex items-center gap-2.5">
                <div
                  class="text-white w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
                >
                  <i class="fa-solid ${getCategoryIcon(allTypes[i].name)}"></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-900">${allTypes[i].name}</h3>
                </div>
              </div>
            </div>`
    }
    document.getElementById("categories-grid").innerHTML = type
    
}




