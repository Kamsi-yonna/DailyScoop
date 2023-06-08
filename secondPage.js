"strict mode";
// DROPDOWN MENU FUNCTION
let mobileMenu = document.querySelector(".mobile");
let menuBtn = document.querySelector(".menuBtn");
let menuBtnDisplay = true;

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
//
//
//
//
//

//GITHUB LINK
// Get the GitHub icon element
const gitIcon = document.querySelector(".gitIcon i");

// Add click event listener to the icon element
gitIcon.addEventListener("click", () => {
  // Open the GitHub link in a new page
  window.open("https://github.com/Kamsi-yonna", "_blank");
});

const apiKey = "099148be22804e849a0c6fe022b7cf5e";
const Url = "https://newsapi.org/v2/everything?q=";

//SECOND PAGE
async function selectedNews(query) {
  try {
    const response = await fetch(`${Url}${query}&apiKey=${apiKey}`);
    // console.log(`${Url}${query}&apiKey=${apiKey}`);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }

    // Convert the response to JSON
    const objectData = await response.json();

    // Get the text elements
    const textTitle = document.querySelectorAll(".mainArticleItemContent-page2 h3");
    const textDescription = document.querySelectorAll(
      ".mainArticleItemContent-page2 p"
    );
    const textAuthor = document.querySelectorAll(
      ".mainArticleItemContent-page2 h2"
    );


    // Determine the loop limit based on the shorter length between textElements and objectData.articles
    const loopLimit = Math.min(textTitle.length, objectData.articles.length);

    // Loop through the articles and update the corresponding elements
    for (let i = 0; i < loopLimit; i++) {
      // Generate a random index within the range
      const randomIndex = Math.trunc(
        Math.random() * objectData.articles.length
      );
      console.log(randomIndex);

      // Get the data using the random index
      const articleTitle = objectData.articles[randomIndex].title;
      const articleImage = objectData.articles[randomIndex].urlToImage;
      const articleDescription = objectData.articles[randomIndex].description;
      const articleAuthor = objectData.articles[randomIndex].author;

      // If image is not available, skip to the next iteration
      if (!articleImage) {
        // console.log("Picture not available");
        continue;
      } else {
        // Update the title element
        textTitle[i].innerHTML = articleTitle;
        textDescription[i].innerHTML = articleDescription;
        textAuthor[i].innerHTML = articleAuthor;

        // Update the image source
        const imageElement = document.querySelectorAll(
          ".mainArticleItemContentImg-page2 img"
        )[i];
        imageElement.src = articleImage;

        // console.log("Picture available");
      }
    }

    console.log(objectData);
  } catch (error) {
    console.log("Error:", error);
  }
}

// Call the fetchData function to start fetching data
selectedNews("entertainment");


//FETCH FOR THE  SECTION 2.1/TECH
async function techData(query) {
  try {
    const response = await fetch(`${Url}${query}&apiKey=${apiKey}`);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }

    // Convert the response to JSON
    const objectData = await response.json();

    // Get the text elements
    const textElements = document.querySelectorAll(".sideArticleContent h2");
    const imageElement = document.querySelector(".sideArticleImg img");
    // Determine the loop limit based on the shorter length between textElements and objectData.articles
    const loopLimit = Math.min(textElements.length, objectData.articles.length);

    // Loop through the articles and update the corresponding elements
    for (let i = 0; i < loopLimit; i++) {
      // Generate a random index within the range
      const randomIndex = Math.floor(
        Math.random() * objectData.articles.length
      );

      // Get the article title and image URL using the random index
      const articleTitle = objectData.articles[randomIndex].title;
      const articleImage = objectData.articles[randomIndex].urlToImage;

      // If image is not available, skip to the next iteration
      if (!articleImage) {
        continue;
      }

      // Update the title element
      textElements[i].innerHTML = articleTitle;

      // // Update the category element
      // categoryElement.innerHTML = query.toUpperCase();

      // Update the image source
      imageElement.src = articleImage;

      // console.log("Picture available:", articleImage);
    }

    console.log(objectData);
  } catch (error) {
    console.log("Error:", error);
  }
}

// Call the fetchData function to start fetching data
techData("technology");

// async function handleFormSubmit(e, inputElement) {
//   e.preventDefault();
//   console.log(inputElement.value);

//   const data = await fetchData(inputElement.value);
//   console.log(data);
//   renderMain(data.articles);
// }

// const searchBtn = document.getElementById("searchForm");
// const searchBtnMobile = document.getElementById("searchFormMobile");

// const searchInput = document.getElementById("searchInput");
// const searchInputMobile = document.getElementById("searchInputMobile");

// searchBtn.addEventListener("submit", (e) => handleFormSubmit(e, searchInput));
// searchBtnMobile.addEventListener("submit", (e) =>
//   handleFormSubmit(e, searchInputMobile)
// );

// async function search(query) {
//   const data = await fetchData(query);
//   renderMain(data.articles);
// }
