const urlParams = new URLSearchParams(window.location.search);
const countryName = urlParams.get("country");

// Function to navigate to a country detail page
function navigateToCountryDetail(clickedCountryName) {
  window.location.href = `country-detail.html?country=${clickedCountryName}`;
}

// function to format the population
function formatPopulation(population) {
  return population.toLocaleString();
}

fetch("data.json")
  .then((response) => response.json())
  .then((countries) => {
    // Find the country object based on the name from the URL parameter
    const selectedCountry = countries.find(
      (country) => country.name === countryName
    );

    if (selectedCountry) {
      document.querySelector(".country-flag img").src =
        selectedCountry.flags.svg;
      document.querySelector(".country-detail-content h2").textContent =
        selectedCountry.name;
      document.querySelector(".country-name").textContent =
        selectedCountry.nativeName;
      document.querySelector(".country-population").textContent =
        formatPopulation(selectedCountry.population);
      document.querySelector(".country-region").textContent =
        selectedCountry.region;
      document.querySelector(".country-sub-region").textContent =
        selectedCountry.subregion;
      document.querySelector(".country-capital").textContent =
        selectedCountry.capital;

      document.querySelector(".country-top-level-domain").textContent =
        selectedCountry.topLevelDomain[0];
      document.querySelector(
        ".country-currency"
      ).textContent = `${selectedCountry.currencies[0].name} (${selectedCountry.currencies[0].code})`;
      document.querySelector(".country-languages").textContent =
        selectedCountry.languages.map((lang) => lang.name).join(", ");

      const borderCountriesContainer =
        document.querySelector(".border-countries");
      if (selectedCountry.borders && selectedCountry.borders.length > 0) {
        const borderCountries = selectedCountry.borders.map((border) => {
          const borderCountryLink = document.createElement("a");
          const borderCountryObject = countries.find(
            (country) => country.alpha3Code === border
          );
          if (borderCountryObject) {
            borderCountryLink.textContent = borderCountryObject.name;
            borderCountryLink.href = `country-detail.html?country=${borderCountryObject.name}`;
            borderCountryLink.style.padding = "0 10px";
            borderCountryLink.style.margin = "3px";
            return borderCountryLink.outerHTML;
          }
          return "";
        });
        borderCountriesContainer.innerHTML = borderCountries.join(" ");
      } else {
        borderCountriesContainer.textContent = "No border countries";
      }
    } else {
      console.error("Country not found");
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
