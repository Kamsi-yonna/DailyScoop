"strict mode";

//PRELOADER
var loader = document.getElementById("preloader");
window.addEventListener("load", function () {
  loader.style.display = "none";
});

//DROPDOWN MENU FUNCTION
const mobileMenu = document.querySelector(".mobile");
const menuBtn = document.querySelector(".menuBtn");
const menuBtnDisplay = true;

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

//BANNER SLIDESHOW
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  const slides = document.getElementsByClassName("banner");
  const dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  } else if (n < 1) {
    slideIndex = slides.length;
  }

  Array.from(slides).forEach((slide) => {
    slide.style.display = "none";
  });

  Array.from(dots).forEach((dot) => {
    dot.classList.remove("active");
  });

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");
}

//LINK TO GITHUB
// storing the GitHub element
const gitIcon = document.querySelector(".gitIcon i");

// Add click event listener to the icon element
gitIcon.addEventListener("click", () => {
  // Open the GitHub link in a new page
  window.open("https://github.com/Kamsi-yonna", "_blank");
});

//FETCH
// Setting the API key and URL
// const apiKey = "646f6fa9592d4218b1319a268668121a";
const apiKey = "099148be22804e849a0c6fe022b7cf5e ";
const Url = "https://newsapi.org/v2/everything?q=";

//SHUFFLE ARRAY FUNCTION - to shuffle the indices of an array randomly.
function shuffleArray(array) {
  // Create a new array with the same elements using the map method
  const shuffledArray = array.map((element) => element);

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap elements using destructuring assignment
    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];
  }
  return shuffledArray;
}

// Common function to fetch data and handle errors
async function fetchData(url) {
  try {
    // Fetch data from the API
    const response = await fetch(url);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }

    // Convert the response to JSON and return the data
    return await response.json();
  } catch (error) {
    console.log("Error:", error);
  }
}

// Function to fetch and display banner data
async function bannerData(query) {
  const apiUrl = `${Url}${query}&apiKey=${apiKey}`;

  // Fetch data using the common fetchData function
  const objectData = await fetchData(apiUrl);

  if (!objectData) {
    return; // Return early if there was an error fetching the data
  }

  // Get the text and image elements from the banner section
  const textElements = document.querySelectorAll(".banner h1");
  const imageElements = document.querySelectorAll(".banner .bannerImage img");

  // Create an array of available article indices
  const availableIndices = Array.from(
    { length: objectData.articles.length },
    (_, index) => index
  );

  // Shuffle the available indices randomly
  const shuffledIndices = shuffleArray(availableIndices);

  // Determine the loop limit based on the shorter length between textElements and shuffledIndices
  const loopLimit = Math.min(textElements.length, shuffledIndices.length);

  // Loop through the text and image elements
  for (let i = 0; i < loopLimit; i++) {
    const articleIndex = shuffledIndices[i];
    const articleTitle = objectData.articles[articleIndex].title;
    const articleImage = objectData.articles[articleIndex].urlToImage;
    const articleURL = objectData.articles[articleIndex].url;

    // If image URL is not available, skip to the next iteration
    if (!articleImage) {
      continue;
    }

    // Update the title element with the article title
    textElements[i].innerHTML = articleTitle;

    // Update the image source with the article image
    imageElements[i].src = articleImage;

    // Get the urlLink element for the current iteration
    let urlLinkElement = document.querySelectorAll(".urlLink")[i];

    // Add a click event listener to the urlLink element
    urlLinkElement.addEventListener("click", function (event) {
      // Prevent the default behavior of the link
      event.preventDefault();

      // Update the href attribute with the article URL
      urlLinkElement.href = articleURL;

      // Open the page in a new web screen
      window.open(urlLinkElement.href, "_blank");
    });
    //to check the link
    // console.log(articleURL);
  }
}
bannerData("Headlines");

// Function to fetch and display entertainment data
async function entertainmentData(query) {
  const apiUrl = `${Url}${query}&apiKey=${apiKey}`;

  // Fetch data using the common fetchData function
  const objectData = await fetchData(apiUrl);

  if (!objectData) {
    return; // Return early if there was an error fetching the data
  }

  // Get the text elements from the main article section
  const textTitle = document.querySelectorAll(".mainArticleItemContent h3");
  const textDescription = document.querySelectorAll(
    ".mainArticleItemContent p"
  );
  const textAuthor = document.querySelectorAll(".mainArticleItemContent h4");
  const textDate = document.querySelectorAll(".mainArticleItemContent h5");

  // Determine the loop limit based on the shorter length between text elements and article data
  const loopLimit = Math.min(textTitle.length, objectData.articles.length);

  // Shuffle the indices using the shuffleArray function
  const shuffledIndices = shuffleArray(
    Array.from({ length: objectData.articles.length }, (_, index) => index)
  );

  // Loop through the articles and update the corresponding elements
  for (let i = 0; i < loopLimit; i++) {
    const randomIndex = shuffledIndices[i];

    // Get the data using the random index
    const articleTitle = objectData.articles[randomIndex].title;
    const articleImage = objectData.articles[randomIndex].urlToImage;
    const articleDescription = objectData.articles[randomIndex].description;
    const articleAuthor = objectData.articles[randomIndex].source.name;
    const articleDate = objectData.articles[randomIndex].publishedAt.substring(
      0,
      10
    );

    // If image is not available, skip to the next iteration
    if (!articleImage) {
      continue;
    } else {
      // Update the title, description, and author elements
      textTitle[i].innerHTML = articleTitle;
      textDescription[i].innerHTML = articleDescription;
      textAuthor[i].innerHTML = articleAuthor;
      textDate[i].innerHTML = articleDate;

      // Update the image source
      const imageElement = document.querySelectorAll(
        ".mainArticleItemContent img"
      )[i];
      imageElement.src = articleImage;
    }
  }

  // Log the objectData (for debugging purposes)
  console.log(objectData);
}
entertainmentData("entertainment");

// Function to fetch and display entertainment data
// async function entertainmentData(query) {
//   try {
//     // Fetch data from the API
//     const response = await fetch(`${Url}${query}&apiKey=${apiKey}`);
//     // Check if the response is successful
//     if (!response.ok) {
//       throw new Error("Request failed with status " + response.status);
//     }
//     // Convert the response to JSON
//     const objectData = await response.json();

//     // Get the text elements from the main article section
//     const textTitle = document.querySelectorAll(".mainArticleItemContent h3");
//     const textDescription = document.querySelectorAll(".mainArticleItemContent p");
//     const textAuthor = document.querySelectorAll(".mainArticleItemContent h4");

//     // Determine the loop limit based on the shorter length between text elements and article data
//     const loopLimit = Math.min(textTitle.length, objectData.articles.length);

//     // Shuffle the indices using the shuffleArray function
//     const shuffledIndices = shuffleArray(Array.from({ length: objectData.articles.length }, (_, index) => index));

//     // Loop through the articles and update the corresponding elements
//     for (let i = 0; i < loopLimit; i++) {
//       const randomIndex = shuffledIndices[i];

//       // Get the data using the random index
//       const articleTitle = objectData.articles[randomIndex].title;
//       const articleImage = objectData.articles[randomIndex].urlToImage;
//       const articleDescription = objectData.articles[randomIndex].description;
//       const articleAuthor = objectData.articles[randomIndex].author;

//       // If image is not available, skip to the next iteration
//       if (!articleImage) {
//         continue;
//       } else {
//         // Update the title, description, and author elements
//         textTitle[i].innerHTML = articleTitle;
//         textDescription[i].innerHTML = articleDescription;
//         textAuthor[i].innerHTML = articleAuthor;

//         // Update the image source
//         const imageElement = document.querySelectorAll(".mainArticleItemContent img")[i];
//         imageElement.src = articleImage;
//       }
//     }

//     // Log the objectData (for debugging purposes)
//     console.log(objectData);
//   } catch (error) {
//     console.log("Error:", error);
//   }
// }
// Call the entertainmentData function to fetch and display entertainment data
// entertainmentData("entertainment");

// Function to fetch and display tech data
async function techData(query) {
  const apiUrl = `${Url}${query}&apiKey=${apiKey}`;

  // Fetch data using the common fetchData function
  const objectData = await fetchData(apiUrl);

  if (!objectData) {
    return; // Return early if there was an error fetching the data
  }

  // Get the text elements
  const textElements = document.querySelectorAll(".sideArticleContent h2");
  const imageElement = document.querySelector(".sideArticleImg img");

  // Create an empty array for available article indices
  const availableIndices = [];

  // Populate the availableIndices array
  for (let index = 0; index < objectData.articles.length; index++) {
    availableIndices.push(index);
  }

  // Shuffle the available indices randomly
  const shuffledIndices = shuffleArray(availableIndices);

  // Determine the loop limit based on the shorter length between textElements and shuffledIndices
  const loopLimit = Math.min(textElements.length, shuffledIndices.length);

  // Loop through the text and image elements
  for (let i = 0; i < loopLimit; i++) {
    const articleIndex = shuffledIndices[i];
    const articleTitle = objectData.articles[articleIndex].title;
    const articleImage = objectData.articles[articleIndex].urlToImage;

    // If image URL is not available, skip to the next iteration
    if (!articleImage) {
      continue;
    }

    // Update the title element
    textElements[i].innerHTML = articleTitle;

    // Update the image source
    imageElement.src = articleImage;
  }

  console.log(objectData);
}
techData("technology");

// Function to fetch and display sports data
async function sportsData(query) {
  const apiUrl = `${Url}${query}&apiKey=${apiKey}`;

  // Fetch data using the common fetchData function
  const objectData = await fetchData(apiUrl);

  if (!objectData) {
    return; // Return early if there was an error fetching the data
  }

  // Get the text elements
  const textAuthor = document.querySelectorAll(".carouselItemContent h3");
  const textTitle = document.querySelectorAll(".carouselItemContent p");

  // Create an array of available article indices
  const availableIndices = Array.from(
    { length: objectData.articles.length },
    (_, index) => index
  );

  // Shuffle the available indices randomly
  const shuffledIndices = shuffleArray(availableIndices);

  // Determine the loop limit based on the shorter length between textTitle and shuffledIndices
  const loopLimit = Math.min(textTitle.length, shuffledIndices.length);

  // Loop through the articles and update the corresponding elements
  for (let i = 0; i < loopLimit; i++) {
    const articleIndex = shuffledIndices[i];
    const articleImage = objectData.articles[articleIndex].urlToImage;
    const articleTitle = objectData.articles[articleIndex].title;
    const articleDate = objectData.articles[articleIndex].publishedAt.substring(
      0,
      10
    );

    // If image is not available, skip to the next iteration
    if (!articleImage) {
      continue;
    }

    // Update the author and title elements
    textAuthor[i].innerHTML = articleTitle;
    textTitle[i].innerHTML = articleDate;

    // Update the image source
    const imageElement = document.querySelectorAll(".carouselItemContent img")[
      i
    ];
    imageElement.src = articleImage;
  }

  // console.log(objectData);
}
sportsData("FA CUP");

// Function to fetch and display travel data
async function travelData(query) {
  const apiUrl = `${Url}${query}&apiKey=${apiKey}`;

  // Fetch data using the common fetchData function
  const objectData = await fetchData(apiUrl);

  if (!objectData) {
    return; // Return early if there was an error fetching the data
  }

  // Get the text elements
  const textAuthor = document.querySelectorAll(".featuredItemContent h3");

  // Create an array of available article indices
  const availableIndices = Array.from(
    { length: objectData.articles.length },
    (_, index) => index
  );

  // Shuffle the available indices randomly
  const shuffledIndices = shuffleArray(availableIndices);

  // Determine the loop limit based on the shorter length between textAuthor and shuffledIndices
  const loopLimit = Math.min(textAuthor.length, shuffledIndices.length);

  // Loop through the articles and update the corresponding elements
  for (let i = 0; i < loopLimit; i++) {
    const articleIndex = shuffledIndices[i];
    const articleImage = objectData.articles[articleIndex].urlToImage;
    const articleTitle = objectData.articles[articleIndex].title;

    // If image is not available, skip to the next iteration
    if (!articleImage) {
      continue;
    }

    // Update the author element
    textAuthor[i].innerHTML = articleTitle;

    // Update the image source
    const imageElement = document.querySelectorAll(".featuredItemContent img")[
      i
    ];
    imageElement.src = articleImage;
  }

  console.log(objectData);
}
travelData("places to travel");

// Function to update the search query for all data-fetching functions
function updateSearchQuery(query) {
  entertainmentData(query);
  techData(query);
  sportsData(query);
  bannerData(query);
  travelData(query);
  sportsData(query);
}

// Get the search form, input element, and search icon
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchIcon = document.querySelector(".ri-search-line");

const navLink = document.querySelectorAll(".navLink li");

// Function to handle search
function handleSearch() {
  const searchQuery = searchInput.value.trim();
  updateSearchQuery(searchQuery);
  searchInput.value = ""; // Clear the input field
}

// Add event listener to the form
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  handleSearch();
});

// Add event listener to the search icon
searchIcon.addEventListener("click", handleSearch);

//Adding an event listener to the nav links
async function search(query) {
  updateSearchQuery(query);
}
