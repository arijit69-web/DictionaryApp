let input = document.querySelector("#input");
let btn = document.querySelector("#search");
let apikey = "63bff31f-326f-436b-a27e-468aacd59603";
let notfound = document.querySelector(".not_found");
let def = document.querySelector(".def");
let loading = document.querySelector(".loader");
//When button is clicked
btn.addEventListener("click", function (e) {
  e.preventDefault();//prevent to reload the page
  let word = input.value;
  //If input is blank
  if (word === "") {
    alert("⚠ Please Type a Word Before Searching ⚠");
    return;
  }
  //Function call
  getData(word);
});

async function getData(word) {
    //API Fetch
  loading.style.display = "block";
  notfound.innerHTML = "";
  def.innerHTML = "";
  const response = await fetch(
    `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apikey}`
  );
  const data = await response.json();
//If no data is found return No Result
  if (!data.length) {
    loading.style.display = "none";
    notfound.innerText = "No Result Found";
    return;
  }
  //If result is suggestion
  if (typeof data[0] === "string") {
    loading.style.display = "none";
    let heading = document.createElement("h4");
    heading.innerHTML = "Did you mean?";
    notfound.appendChild(heading);
    data.forEach((element) => {
      let suggestion = document.createElement("span");
      suggestion.classList.add("suggested");
      suggestion.innerHTML = element;
      notfound.appendChild(suggestion);
    });
  }
  //If result is Found
  loading.style.display = "none";
  let defination = data[0].shortdef[0];
  def.innerHTML = `Meaning of ${word} : ` + defination;
}
