let restaurants = [];
let filteredRestaurants = [];
let currentFilter = "all";
let currentPage = 1;
const itemsPerPage = 5;
const container = document.getElementById("restaurantContainer");

fetch("restaurants.json")
  .then((res) => res.json())
  .then((data) => {
    restaurants = data;
    filteredRestaurants = data;
    render();
  })
  .catch((err) => console.log("JSON Error:", err));

function render() {
  displayRestaurants();
  createPagination();
  updateCount();
}

function displayRestaurants() {
  container.innerHTML = "";
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = filteredRestaurants.slice(start, end);

  if (pageItems.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center">
        <h3>No restaurant found</h3>
      </div>
    `;
    return;
  }

  pageItems.forEach((item) => {
    container.innerHTML += `
      <div class="col-lg-4 col-md-6">
        <div class="restaurant-card">
          <img src="${item.image}" alt="${item.name}">
          <div class="restaurant-content">
            <h3>${item.name}</h3>
            <p class="area">
              <i class="fa-solid fa-location-dot"></i>
              ${item.area}
            </p>
            <p class="desc">${item.desc}</p>
            <span class="must-order">Must Order: ${item.mustOrder}</span>
          </div>
        </div>
      </div>
    `;
  });
}

function applyFilters() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  filteredRestaurants = restaurants.filter((item) => {
    const matchCategory = currentFilter === "all" || item.category === currentFilter;
    const matchSearch = item.name.toLowerCase().includes(searchValue);
    return matchCategory && matchSearch;
  });

  currentPage = 1;
  render();
}

function createPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `
      <button class="page-number ${currentPage === i ? "active" : ""}" onclick="goToPage(${i})">
        ${i}
      </button>
    `;
  }
}

function goToPage(page) {
  currentPage = page;
  render();
}

function updateCount() {
  document.getElementById("restaurantCount").innerText = `${filteredRestaurants.length} Restaurants Found`;
}

$(".filter-btn").click(function () {
  $(".filter-btn").removeClass("active");
  $(this).addClass("active");
  currentFilter = $(this).data("filter");
  applyFilters();
});

$("#searchInput").on("keyup", function () {
  applyFilters();
});