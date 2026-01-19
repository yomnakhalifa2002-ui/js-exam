//searches for product by name or barcode
export const productSearchInput = document.getElementById('product-search-input')
export const barcodeSearchInput = document.getElementById('barcode-input')
document.getElementById('search-product-btn').addEventListener('click', function(){
    loadProducts(productSearchInput.value)
})
document.getElementById('lookup-barcode-btn').addEventListener('click', function(){
  loadProductByBarcode(barcodeSearchInput.value)
})
export let allProducts;
export async function loadProducts(productName){
    let response = await fetch(`https://nutriplan-api.vercel.app/api/products/search?q=${productName}&page=1&limit=24`)
    if(response.ok){
        let data = await response.json();
        allProducts = data.results;
        displayProduct()
    }
}
export async function loadProductByBarcode(barcode){
  let response = await fetch(`https://nutriplan-api.vercel.app/api/products/barcode/${barcode}`)
  if(response.ok){
    let data = await response.json();
    allProducts = [data.result];
    displayProduct()
  }
}
export function displayProduct(){
    let product = ``
    for (let i =0 ; i< allProducts.length; i++){
        product += `<div
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="${allProducts[i].barcode}"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${allProducts[i].image}"
                    alt="${allProducts[i].name}"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div
                    class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                    Nutri-Score ${allProducts[i].nutritionGrade}
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA ${allProducts[i].novaGroup}"
                  >
                    ${allProducts[i].novaGroup}
                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                    ${allProducts[i].brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                    ${allProducts[i].name}
                  </h3>

                  <div
                    class="flex items-center gap-3 text-xs text-gray-500 mb-3"
                  >
                    <span
                      ><i class="fa-solid fa-weight-scale mr-1"></i>${allProducts[i].servingSize}g</span
                    >
                    <span
                      ><i class="fa-solid fa-fire mr-1"></i>${allProducts[i].calories} kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${allProducts[i].protein}g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${allProducts[i].carbs}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${allProducts[i].fat}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${allProducts[i].sugar}g</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>`
    }
    document.getElementById('products-grid').innerHTML = product
}