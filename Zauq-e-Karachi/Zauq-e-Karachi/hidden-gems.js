let gems = [];
let filteredGems = [];
let currentPage = 1;
const itemsPerPage = 6;
const container = document.getElementById("gemContainer");
const gemCount = document.getElementById("gemCount");
const pagination = document.getElementById("pagination");

function showSkeleton() {
    container.innerHTML = "";
    for (let i = 0; i < 6; i++) {
        container.innerHTML += `
        <div class="col-lg-4 col-md-6">
            <div class="skeleton-card">
                <div class="skeleton-image"></div>
                <div class="skeleton-content">
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line short"></div>
                    <div class="skeleton-line"></div>
                </div>
            </div>
        </div>`;
    }
}

fetch("hidden-gems.json")
    .then((res) => res.json())
    .then((data) => {
        gems = data;
        filteredGems = data;
        gemCount.innerText = `${gems.length} Hidden Gems Found`;
        setTimeout(renderGems, 800);
    })
    .catch((err) => {
        console.log("Error loading gems:", err);
    });

$(document).on("click", ".filter-btn", function () {
    $(".filter-btn").removeClass("active");
    $(this).addClass("active");
    currentPage = 1;
    applyFilters($(this).data("filter"));
});

$("#searchInput").on("keyup", function () {
    currentPage = 1;
    applyFilters($(".filter-btn.active").data("filter"));
});

function applyFilters(filter) {
    const searchValue = $("#searchInput").val().toLowerCase();
    filteredGems = gems.filter((item) => {
        const matchCategory = filter === "all" || item.category === filter;
        const matchSearch = item.name.toLowerCase().includes(searchValue);
        return matchCategory && matchSearch;
    });
    gemCount.innerText = `${filteredGems.length} Hidden Gems Found`;
    renderGems();
}

function renderGems() {
    showSkeleton();
    setTimeout(() => {
        container.innerHTML = "";
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginated = filteredGems.slice(start, end);

        if (paginated.length === 0) {
            container.innerHTML = `
            <div class="col-12 no-results">
                <h3>No hidden gems found</h3>
                <p>Try a different search or category</p>
            </div>`;
            pagination.innerHTML = "";
            return;
        }

        paginated.forEach((item) => {
            container.innerHTML += `
            <div class="col-lg-4 col-md-6">
                <div class="hidden-gem-card reveal">
                    <span class="gem-badge">Hidden Gem</span>
                    <img src="${item.image}" alt="${item.name}">
                    <div class="gem-content">
                        <h3>${item.name}</h3>
                        <p class="gem-area">
                            <i class="fa-solid fa-location-dot"></i>
                            ${item.area}
                        </p>
                        <p class="gem-desc">${item.desc}</p>
                        <span class="must-try">Must Try: ${item.mustTry}</span>
                    </div>
                </div>
            </div>`;
        });

        renderPagination();
    }, 400);
}

function renderPagination() {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(filteredGems.length / itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
        <li class="page-item ${i === currentPage ? "active" : ""}">
            <a class="page-link" href="#" onclick="goToPage(${i})">${i}</a>
        </li>`;
    }
}

function goToPage(page) {
    currentPage = page;
    renderGems();
}
