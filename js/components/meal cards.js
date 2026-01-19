//displayes meal cards
export let allMeals
export const searchInput = document.getElementById("search-input")
export async function loadMeals(filter){
    let response = await fetch(`https://nutriplan-api.vercel.app/api/meals/search?q=${filter}&page=1&limit=25`)
    if(response.ok){
        let data = await response.json()
        allMeals = data.results;
        displayAllMeals()
    }
}
export function displayAllMeals(){
    let meal = ``
    for(let i = 0; i<allMeals.length; i++){
        meal += `<div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id=${allMeals[i].id}
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${allMeals[i].thumbnail}"
                  alt="${allMeals[i].name}"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${allMeals[i].category}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    ${allMeals[i].area}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${allMeals[i].name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${allMeals[i].instructions}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    C${allMeals[i].category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${allMeals[i].area}
                  </span>
                </div>
              </div>
            </div>`
    }
    document.getElementById('recipes-grid').innerHTML = meal
}

searchInput.addEventListener('input', function(){
    loadMeals(searchInput.value)
})
