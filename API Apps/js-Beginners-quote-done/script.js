const quoteAPI = "https://api.quotable.io/random?tags=technology,famous-quotes";

const overlay = document.querySelector(".overlay");
const bookmarkMsg = document.querySelector(".msg");
const ul = overlay.querySelector("ul");
const btnShowbookmark = document.querySelector(".bookmarks");
const btnbookmark = document.querySelector(".mark");
const btnNewQuote = document.querySelector(".new");
const Quote = document.querySelector(".quote");
const quote_content = Quote.querySelector("h3");
const quote_author = Quote.querySelector("h5");
let author, content;
let bookmarkArray = localStorage.getItem("mybookmark")
  ? JSON.parse(localStorage.getItem("mybookmark"))
  : [];

// showBookmark();

async function randomQuote() {
  const data = await fetch(quoteAPI);
  const response = await data.json();
  author = response.author;
  content = response.content;
  displayQuote();
  unBookmarked();
}

function displayQuote() {
  quote_content.textContent = `${content}`;
  quote_author.textContent = `--${author}`;
}

function unBookmarked() {
  btnbookmark.textContent = "Bookmark";
  btnbookmark.classList.remove("active");
}

function Bookmarked() {
  btnbookmark.textContent = "Bookmarked";
  btnbookmark.classList.add("active");
  bookmarkArray.push({
    id: new Date().getTime(),
    content: content,
    author: author,
  });
  localStorage.setItem("mybookmark", JSON.stringify(bookmarkArray));
}
function showBookmark() {
  ul.innerHTML = "";
  overlay.classList.add("active");
  if (bookmarkArray.length > 0) {
    bookmarkMsg.classList.remove("active");
  } else {
    bookmarkMsg.classList.add("active");
    document.addEventListener("click", function (e) {
      if (e.target.closest(".overlay")) {
        bookmarkMsg.classList.remove("active");
        overlay.classList.remove("active");
      }
    });
  }
  renderBookmarkDatas();
}

function renderBookmarkDatas() {
  bookmarkArray.forEach(function (bookmark) {
    const liquote = `<li>
        <span class="del" data-id="${bookmark.id}">🗑️</span>
        <p class="content">${bookmark.content}</p>
        <p class="author">-${bookmark.author}</p>
    </li>`;
    ul.insertAdjacentHTML("beforeend", liquote);
  });
}

function deleteBookmark(e) {
  e.preventDefault();
  const targetId = +e.target.getAttribute("data-id");
  const ele = e.target.parentElement;
  ul.removeChild(ele);
  const temp = bookmarkArray.filter(function (bookmark) {
    if (targetId !== +bookmark.id) {
      return bookmark;
    }
  });
  bookmarkArray = temp;
  localStorage.removeItem("mybookmark");
  localStorage.setItem("mybookmark", JSON.stringify(temp));
  showBookmark();
}

//Events

btnNewQuote.addEventListener("click", randomQuote);
btnbookmark.addEventListener("click", Bookmarked);
btnShowbookmark.addEventListener("click", showBookmark);

ul.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("del")) {
    deleteBookmark(e);
  }
});

overlay.addEventListener("click", function (e) {
  if (!e.target.closest("li")) {
    overlay.classList.remove("active");
  }
});

randomQuote();
