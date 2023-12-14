fetch("data.json")
  .then((response) => response.json())
  .then((countries) => {
    const filterSearch = document.getElementById("filter-search");
    const countryGrid = document.querySelector(".js-country-grid");
    const searchBar = document.getElementById("search-bar");

    // Array that stores unique regions
    const uniqueRegions = [
      ...new Set(countries.map((country) => country.region)),
    ];

    // Add a default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Filter by Region";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    filterSearch.appendChild(defaultOption);

    // Iterate through unique regions and create options
    uniqueRegions.forEach((region) => {
      const option = document.createElement("option");
      option.value = region;
      option.textContent = region;
      filterSearch.appendChild(option);
    });

    // Function to filter countries based on selected region
    function filterCountriesByRegion(region) {
      const filteredCountries = region
        ? countries.filter((country) => country.region === region)
        : countries;

      displayCountries(filteredCountries);
    }

    // Function to filter countries based on search input
    function filterCountriesBySearch(query) {
      const filteredCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(query.toLowerCase())
      );

      displayCountries(filteredCountries);
    }

    // function to format the population
    function formatPopulation(population) {
      return population.toLocaleString();
    }

    // Function to display countries in the grid
    function displayCountries(countriesToDisplay) {
      const countryHTML = countriesToDisplay
        .map(
          (country) => `
            <a href="country-detail.html?country=${country.name}">
              <div class="card">
                <div class="country-flag-image">
                  <img src="${country.flag}" alt="country flag" />
                </div>
                <div class="country-content">
                  <h2>${country.name}</h2>
                  <p><span>Population:</span> ${formatPopulation(
                    country.population
                  )}</p>
                  <p><span>Region:</span> ${country.region}</p>
                  <p><span>Capital:</span> ${country.capital}</p>
                </div>
              </div>
            </a>
          `
        )
        .join("");

      // Display filtered countries in the grid
      countryGrid.innerHTML = countryHTML;
    }

    // Event listener for filter search dropdown
    filterSearch.addEventListener("change", function () {
      const selectedRegion = this.value;
      filterCountriesByRegion(selectedRegion);
    });

    // Event listener for search bar
    searchBar.addEventListener("input", function () {
      const searchQuery = this.value;
      filterCountriesBySearch(searchQuery);
    });

    // Initial display of all countries
    filterCountriesByRegion("");
  });
