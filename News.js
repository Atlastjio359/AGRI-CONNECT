
document.addEventListener('change', function (event) {
    document.getElementById('noNewsNote').style.display = "none";
    let selectedCountry = "ph";
    selectedCountry = event.target.value;
    console.log('Selected Country:', selectedCountry);

    const API_KEY = "1dc50e7604544c76ad71faeeab8d0bd9";
    const NEWS_APP_API_URL = `https://newsapi.org/v2/top-headlines?country=${selectedCountry}&apiKey=${API_KEY}`;

    fetch(NEWS_APP_API_URL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayNews(data.articles);
        })
        .catch(function (error) {
        console.error("Error fetching data:", error);
        });
});


function displayNews(articles) {
    const newsContainer = document.getElementById("news-container");

    articles.forEach(function (article) {
        const newsCard = document.createElement("div");
        newsCard.classList.add("news-card");

        const newsImage = document.createElement("img");
        newsImage.src = article.urlToImage;
        newsImage.alt = "News Image";

        const newsTitle = document.createElement("h1");
        newsTitle.textContent = article.title;

        const newsContent = document.createElement("p");
        newsContent.textContent = article.description;

        const newsSource = document.createElement("p");
        newsSource.innerHTML = `<i>Source: ${article.author}</i>`;

        const newsFooter = document.createElement("div");
        newsFooter.classList.add("news-footer");

        const datePublished = document.createElement("small");
        datePublished.textContent = `Date: ${article.publishedAt}`;

        const readMoreLink = document.createElement("a");
        readMoreLink.href = article.url;
        readMoreLink.target = "_blank";
        readMoreLink.textContent = "Read More...";

        newsFooter.appendChild(datePublished);
        newsFooter.appendChild(readMoreLink);

        newsCard.appendChild(newsImage);
        newsCard.appendChild(newsTitle);
        newsCard.appendChild(newsContent);
        newsCard.appendChild(newsSource);
        newsCard.appendChild(newsFooter);

        newsContainer.appendChild(newsCard);
    });
}
