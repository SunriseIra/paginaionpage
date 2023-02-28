let postbtn = document.querySelector(".postbtn");
let card_plhold = document.getElementById("cardDiv");
const loaderContainer = document.querySelector(".loader-container");
let popup = document.querySelector(".popup");
let popup_content = document.querySelector(".popup_content");
let closePopup = document.querySelector(".popup_close");
let popup_card = document.querySelector(".popup_card");

let steps = 10;
const displayLoading = () => {
  loaderContainer.classList.add("active");
  // console.log(5454);
};
const hideLoading = () => {
  loaderContainer.classList.remove("active");
  // console.log(11111111);
};

postbtn.addEventListener("click", function () {
  displayLoading();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  let myactivePage = +urlParams.get("page") === 0 ? 1 : +urlParams.get("page");
  let activePage = myactivePage;
  // console.log(activePage);

  fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then((response) => response.json())
    .then(function (data) {
      // hideLoading();
      let pageSpan = document.querySelector(".page");
      let pagesCount = Math.ceil(data.length / steps);
      let ulEl = document.createElement("ul");
      ulEl.classList.add("paginationList");

      for (let i = 0; i < pagesCount; i++) {
        // console.log(data[20].userId);
        let liEl = document.createElement("li");
        liEl.classList.add("paginationItem");
        liEl.innerText = i + 1;
        let activePage = i + 1;
        ulEl.appendChild(liEl);
        if (activePage == 1) {
          liEl.classList.add("paginationItem_active");
          liEl.dataset.name = 1;
        }
      }
      pageSpan.appendChild(ulEl);

      let currentItemLi = document.querySelector(".paginationItem_active");
      let currentPage = +currentItemLi.innerText;
      let liElCurent = document.querySelector(".paginationItem");
      let liElCur = document.querySelectorAll(".paginationItem");
      let allliElCur = Array.from(liElCur);

      if (urlParams.has("page") == false) {
        displayLoading();
        fetchData(activePage);
        popupBtn(activePage);
        const nextURL = `?page=${activePage}`;
        const nextTitle = activePage + 1;
        window.history.replaceState(null, nextTitle, nextURL);
      } else {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let myactivePage =
          +urlParams.get("page") === 1 ? 1 : +urlParams.get("page");
        let activePage = myactivePage;

        allliElCur.forEach((elem) => {
          if (elem.innerText == activePage) {
            currentItemLi.classList.remove("paginationItem_active");
            elem.classList.add("paginationItem_active");
          }
        });
        displayLoading();
        fetchData(activePage);
        let btnR = document.querySelectorAll(".button-85");
        let allbtnR = Array.from(btnR);
        console.log(allbtnR);
        popupBtn(activePage);
      }

      allliElCur.forEach((elem) => {
        elem.addEventListener("click", function (event) {
          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
          let myactivePage =
            +urlParams.get("page") === 1 ? 1 : +urlParams.get("page");
          let activePage = myactivePage;

          if (event.target.classList.contains("paginationItem")) {
            countliEl = +elem.innerText;
          }
          // console.log(elem);
          let currentItemLi = document.querySelector(".paginationItem_active");
          currentItemLi.classList.remove("paginationItem_active");
          elem.classList.add("paginationItem_active");
          activePage = countliEl;
          const nextURL = `?page=${activePage}`;
          const nextTitle = activePage;
          window.history.replaceState(null, nextTitle, nextURL);
          displayLoading();
          fetchData(countliEl);
          popupBtn(countliEl);
        });
      });
    });

  document.querySelector(".postbtn").disabled = true;
});

function fetchData(countliEl) {
  fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${countliEl}&limit=10`
  )
    .then((response) => response.json())
    .then(function (data) {
      hideLoading();
      card_plhold.innerHTML = "";

      for (let i = 0; i < data.length; i++) {
        // console.log(countliEl);
        card_plhold.innerHTML += `
        <div class="card_plhold_inner" data-name="${data[i].id}">
        <div class="card_pl_inn"> ${data[i].id}</div>
        <div class="card_body" data-name="${data[i].id}">
        <p class="card_plhold_title">${data[i].title}</p>
        </div>
        <div class="button_pop" data-name="${data[i].id}">
        <button class="button-85" data-name="${data[i].id}" role="button">More >> </button></div>
        </div>
        `;
      }

      popupBtn(countliEl)
    });
}

function popupBtn(countliEl) {
  let btnR = document.querySelectorAll(".button-85");
  let allbtnR = Array.from(btnR);
  // console.log(allbtnR);

  allbtnR.forEach((elem) => {
    elem.addEventListener("click", function (event) {
      if (event.target.classList.contains("button-85")) {
        let parentMin = event.target.parentElement;
        let parentId = event.target.dataset.name;
        // console.log(parentId);
        displayLoading();
        fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${countliEl}&limit=10`
        )
          .then((response) => response.json())
          .then(function (data) {
            hideLoading();

            for (let i = 0; i < data.length; i++) {
             
              if (+parentId === data[i].id) {
                console.log(data[i].id);
                console.log(+parentId);
                popup.classList.add("active");
                popup_card.innerHTML = `
                  <div class="popup_card_inner" data-name="${data[i].id}"> 
                  <div class="popup_card_inn" data-name="${data[i].id}">
                  ${data[i].title}
                  </div>
                  <div class="popup_card_imag"> ${popupImg(data[i].id)}
                  </div>
                  <div class="popup_card_body" data-name="${data[i].id}">${data[i].body}
                  </div>
                  </div>
                  `;
              } else {
                popup.classList.add("notActive");
              }
            }
          });

        function popupImg() {
          displayLoading();
          fetch(`https://jsonplaceholder.typicode.com/albums/1/photos`)
            .then((response) => response.json())
            .then(function (data) {
              hideLoading();
              for (let i = 0; i < data.length; i++) {
                let popup_card_imag =
                  document.querySelector(".popup_card_imag");
                // console.log(data[i].thumbnailUrl);
                if (+parentId === data[i].id) {
                  popup_card_imag.innerHTML = `<img class="popup_card_imag_img" src="${data[i].thumbnailUrl}">`;
                }
              }
            });
        }
      }
    });
    closePopup.addEventListener("click", (e) => {
      e.preventDefault();
      popup.classList.remove("active");
    });
    popup.addEventListener("click", (e) => {
      if (!e.target.closest(".popup_content")) {
        popup.classList.remove("active");
      }
    });
  });
}
