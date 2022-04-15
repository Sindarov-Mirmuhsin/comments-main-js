const elList = document.querySelector("#list");
const elListPosts = document.querySelector("#listPosts");
const elListComents = document.querySelector("#listComents");
let mask = document.querySelector(".loader");

function renderUsers(user, element) {
  elList.innerHTML = "";


  user.forEach(elem => {

    //*new create atributes...
    const newLi = document.createElement("li");

    const addressWrite = document.createElement("div");
    const companyWrite = document.createElement("div");
    const companyNumber = document.createElement("a");
    const companyId = document.createElement("p");
    const companyEmail = document.createElement("a");
    const companyGeo = document.createElement("a");
    const companyWebsite = document.createElement("a");

    const userName = document.createElement("span");
    const userTitle = document.createElement("h3");

    const streetText = document.createElement("span");
    const suiteText = document.createElement("span");
    const cityText = document.createElement("span");
    const zipcodeText = document.createElement("span");

    const companyNameText = document.createElement("p");
    const companyCatchPhraseText = document.createElement("p");
    const companyBsText = document.createElement("p");
    const buttonModal = document.createElement("button");

    //add class
    newLi.classList.add("list__item");
    userName.classList.add("user__Name");
    addressWrite.classList.add("address__write");
    companyWrite.classList.add("company__write");
    companyNumber.classList.add("company__phone");
    buttonModal.classList.add("user__button");
    companyId.classList.add("user__id");
    companyEmail.classList.add("user__email");
    companyGeo.classList.add("user__geo");
    companyWebsite.classList.add("user__website");

    //textContents
    userName.textContent = elem.username;
    userTitle.textContent = elem.name;

    streetText.textContent = elem.address.street;
    suiteText.textContent = elem.address.suite;
    cityText.textContent = elem.address.city;
    zipcodeText.textContent = elem.address.zipcode;

    companyNameText.textContent = elem.company.name;
    companyCatchPhraseText.textContent = elem.company.catchPhrase;
    companyBsText.textContent = elem.company.bs;
    companyNumber.textContent = elem.phone;
    buttonModal.dataset.id = elem.id
    buttonModal.textContent = "Posts";
    companyId.textContent = elem.id;
    companyEmail.textContent = elem.email;
    companyGeo.textContent = elem.address.geo;
    companyWebsite.textContent = elem.website;

    companyNumber.setAttribute("href", "tel:elem.phone");
    companyNumber.setAttribute("target", "__blank");
    companyEmail.setAttribute("href", "mailto:elem.email");
    companyEmail.setAttribute("target", "__blank");
    companyGeo.setAttribute("href", `https://www.google.com/maps/place/${elem.address.geo.lat}${elem.address.geo.lng}`);
    companyGeo.setAttribute("target", "__blank");
    companyWebsite.setAttribute("href", "https://www.google.com:elem.website")
    companyWebsite.setAttribute("target", "__blank");

    //appendchilds
    newLi.appendChild(userName);
    newLi.appendChild(userTitle);

    addressWrite.appendChild(streetText);
    addressWrite.appendChild(suiteText);
    addressWrite.appendChild(cityText);
    addressWrite.appendChild(zipcodeText);
    addressWrite.appendChild(companyNumber);
    newLi.appendChild(addressWrite);

    companyWrite.appendChild(companyNameText);
    companyWrite.appendChild(companyCatchPhraseText);
    companyWrite.appendChild(companyBsText);
    newLi.appendChild(companyWrite);
    newLi.appendChild(buttonModal);
    newLi.appendChild(companyId);
    newLi.appendChild(companyEmail);
    newLi.appendChild(companyGeo);
    newLi.appendChild(companyWebsite);


    element.appendChild(newLi);

    buttonModal.addEventListener(`click`, (e) => {

      let x = e.target.dataset.id

      fetch(`https://jsonplaceholder.typicode.com/posts`).then(response => response.json()).then(data => {

        data.forEach((posts) => {
          let postsId = posts.userId;
          if (x == postsId) {
            const postsLi = document.createElement("li");
            const postsTitle = document.createElement("h3");
            const postsText = document.createElement("p");
            const buttonPosts = document.createElement("button");

            postsLi.classList.add("list__item");
            buttonPosts.classList.add("user__button");
            postsText.classList.add("company__write");

            postsTitle.textContent = posts.title;
            postsText.textContent = posts.body;
            buttonPosts.textContent = "Comments";
            buttonPosts.dataset.id = posts.id;
            console.log(buttonPosts);
            postsLi.appendChild(postsTitle);
            postsLi.appendChild(postsText);
            postsLi.appendChild(buttonPosts);
            elListPosts.appendChild(postsLi);

            buttonPosts.addEventListener("click", (evn) => {
              elListComents.textContent = "";
              let y = evn.target.dataset.id;

              fetch(`https://jsonplaceholder.typicode.com/comments`).then(response => response.json()).then(data => {
                data.forEach((comments) => {
                  if (y == comments.postId) {
                    const commentsLi = document.createElement("li")
                    const commentsName = document.createElement("h3");
                    const commentsEmail = document.createElement("a");
                    const commentsText = document.createElement("p");

                    commentsLi.classList.add("list__item");
                    commentsEmail.classList.add("address__write");
                    commentsText.classList.add("company__write");

                    commentsName.textContent = comments.name;
                    commentsEmail.textContent = comments.email;
                    commentsText.textContent = comments.body;

                    commentsEmail.setAttribute("href", "mailto:comments.email")

                    commentsLi.appendChild(commentsName)
                    commentsLi.appendChild(commentsEmail)
                    commentsLi.appendChild(commentsText)
                    elListComents.appendChild(commentsLi)
                  }
                })
              }
              )
            })
          }
        })
      })
    })
  });
}

async function promiseUser() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  const json = renderUsers(data, elList)
  console.log(data);
}
promiseUser();


window.addEventListener("load", () => {
  mask.classList.add("qwerty");
  setTimeout(() => {
    mask.remove();
  }, 600);
})

