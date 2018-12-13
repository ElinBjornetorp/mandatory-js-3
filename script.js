
//Letar upp element
let header = document.querySelector('h2');
let subheader = document.querySelector('h3');
let image = document.querySelector('img');
let list = document.querySelector('ul');
let galleryDiv = document.querySelector('#allpictures');

//EXEMPELKOD, IF-SATS SOM KOLLAR VILKEN SIDA MAN ÄR PÅ

//   //Letar upp hashtag
//   let hash = window.location.hash;

//  //Skapar variabler
//   let hashArray;
//   let breed;
//   let subbreed;
//
//   //Index-sidan
//   if(hash === ''){
//
//   }
//   //Subbreed-sidan
//   else if(hash.includes('_')){
//       hashArray = hash.split('_'); //Splittar strängen
//       breed = hashArray[0].substring(1); //Breed är första delen av strängen, utan hashtag
//       subbreed = hashArray[1]; //Subbreed är andra delen av strängen
//   }
//   //Breed-sidan
//   else {
//       breed = hash.substring(1); //Tar bort hashtag
//   }

// EXEMPELKOD, PROMISE
// return new Promise((resolve, reject) => {
//   //First function in promise
// })
// .then(parseJSON) //second function in promise
// //promise chain

// --------------------------------------------------------------------------
function setHeaderAndSubHeader() {
  let hash = window.location.hash;

  //Kod för index-sidan
  if(hash === ''){
    header.textContent = 'Random dog';
    header.style.textTransform = 'none';
  }
  //Kod för subbreed-sidan
  else if(hash.includes('_')) {
    let hashArray = hash.split('_'); //Splittar strängen
    let breed = hashArray[0].substring(1);
    header.textContent = breed;
    header.style.textTransform = 'capitalize';
    let subbreed = hashArray[1];
    subheader.textContent = subbreed;
    subheader.style.textTransform = 'capitalize';

  }
  //Kod för breed-sidan
  else {
    header.textContent = hash.substring(1);
    header.style.textTransform = 'capitalize';

    //Om det finns en underrubrik, ta bort den
    if(subheader.textContent !== '') {
      subheader.textContent = '';
    }
  }
}

// ------------- Funktion som kallar på showRandomImage, showRandomImageByBreed eller showRandomImageBySubBreed ------------------
function setRandomImage(){
  // debugger;

  let hash = window.location.hash;
  let hashArray;
  let breed;
  let subbreed;

  //Kod för index-sidan
  if(hash === ''){
    showRandomImage();
  }
  //Kod för subbreed-sidan
  else if(hash.includes('_')) {
    hashArray = hash.split('_');
    breed = hashArray[0].substring(1);
    subbreed = hashArray[1];
    showRandomImageBySubBreed(breed, subbreed);
  }
  //Kod för breed-sidan
  else {
    breed = hash.substring(1);
    showRandomImageByBreed(breed);
  }
}

// ------------- Funktion som visar en slumpad bild (alla raser) ------------------
function showRandomImage() {
  let request = new XMLHttpRequest();
  request.addEventListener('load', function() {
    return new Promise((resolve, reject) => {
      if(this.status >= 200 && this.status < 300) {
        resolve(this.responseText);
      } //if
    }) //End of first function in promise
    .then(parseJSON)
    .then(function(object){
      image.setAttribute('src', object.message);
    }) //Funktion som uppdaterar bildens url
  //promise chain
  }); //End of event listener
  request.open('GET', 'https://dog.ceo/api/breeds/image/random');
  request.send();
}

// ------------- Funktion som visar en slumpad bild av en viss ras ------------------
function showRandomImageByBreed(breed) {
  let urlString;

  let request = new XMLHttpRequest();
  request.addEventListener('load', function() {
    return new Promise((resolve, reject) => {
      if(this.status >= 200 && this.status < 300) {
        resolve(this.responseText);
      } //if
    }) //End of first function in promise
    .then(parseJSON)
    .then(function(object){
      image.setAttribute('src', object.message);
    }) //Funktion som uppdaterar bildens url
  //promise chain
  }); //End of event listener
  request.open('GET', 'https://dog.ceo/api/breed/' + breed + '/images/random');
  request.send();
}

//---------------Funktion som visar en slumpad bild av en viss underras ------------
function showRandomImageBySubBreed(breed, subbreed) {
  let urlString;

  let request = new XMLHttpRequest();
  request.addEventListener('load', function() {
    new Promise((resolve, reject) => {
      if(this.status >= 200 && this.status < 300) {
        resolve(this.responseText);
      } //if
    }) //End of first function in promise
    .then(parseJSON)
    .then(function(object){
      image.setAttribute('src', object.message);
    }) //Funktion som uppdaterar bildens url
  //promise chain
  }); //End of event listener
  urlString = 'https://dog.ceo/api/breed/' + breed + '/' + subbreed + '/images/random';
  request.open('GET', urlString);
  request.send();
}

// ------------- Funktion som parsar JSON ------------------
function parseJSON(jsonString) {
  let parsed;
  try {
    parsed = JSON.parse(jsonString);
    return parsed;
  }
  catch {
    console.error('Invalid JSON string.');
  }
}

//---------------Funktion som hanterar refresh-knappen och eventlyssnaren på denna -----
function setRefreshButton() {
  //Letar upp hashtag
  let hash = window.location.hash;

  //Letar upp refresh-knappen
  let refreshButton = document.querySelector('#refreshbutton');

  //Skapar variabler
  let hashArray;
  let breed;
  let subbreed;
  let newRefreshButton;

  //Index-sidan
  if(hash === ''){
    //Om det inte finns någon refresh-knapp, så skapa en och lägg till eventlyssnare
    if(refreshButton === null){
      //Skapar knappen
      createRefreshButton();

      //Letar upp knappen och lägger till eventlyssnare
      refreshButton = document.querySelector('#refreshbutton');
      refreshButton.addEventListener('click', showRandomImage);
    }
    //Om det redan finns en knapp, klona den (för att få bort tidigare eventlyssnare)
    else {
      //Klonar knappen
      newRefreshButton = refreshButton.cloneNode(true);
      document.body.replaceChild(newRefreshButton, refreshButton);

      //Lägger till eventlyssnare
      newRefreshButton.addEventListener('click', showRandomImage);
    }
  }
  //Subbreed-sidan
  else if(hash.includes('_')){
    //Om det inte finns någon refresh-knapp, så skapa en
    if(refreshButton === null){
      //Skapar knapp
      createRefreshButton();

      //Letar upp knappen och lägger till eventlyssnare
      refreshButton = document.querySelector('#refreshbutton');
      refreshButton.addEventListener('click', function(){
        hashArray = hash.split('_'); //Splittar strängen
        breed = hashArray[0].substring(1); //Breed är första delen av strängen, utan hashtag
        subbreed = hashArray[1]; //Subbreed är andra delen av strängen
        showRandomImageBySubBreed(breed, subbreed); //Skickar in breed och subbreed i showRandomImageBySubBreed
      });
    }
    //Om det redan finns en knapp, klona den (för att få bort tidigare eventlyssnare)
    else {
      //Klonar knappen
      newRefreshButton = refreshButton.cloneNode(true);
      document.body.replaceChild(newRefreshButton, refreshButton);

      //Lägger till eventlyssnare
      newRefreshButton.addEventListener('click', function(){
        hashArray = hash.split('_'); //Splittar strängen
        breed = hashArray[0].substring(1); //Breed är första delen av strängen, utan hashtag
        subbreed = hashArray[1]; //Subbreed är andra delen av strängen
        showRandomImageBySubBreed(breed, subbreed); //Skickar in breed och subbreed i showRandomImageBySubBreed
      });
    }
  }
  //Breed-sidan
  else {
    //Om det inte finns någon refresh-knapp, så skapa en ny
    if(refreshButton === null){
      //Skapar en refresh-knapp
      createRefreshButton();

      //Letar upp knappen och lägger till eventlyssnare
      refreshButton = document.querySelector('#refreshbutton');
      refreshButton.addEventListener('click', function(){
        breed = hash.substring(1); //Tar bort hashtag
        showRandomImageByBreed(breed);
      });
    }
    //Om det redan finns en knapp, klona den (för att få bort tidigare eventlyssnare)
    else {
      //Klonar knappen
      newRefreshButton = refreshButton.cloneNode(true);
      document.body.replaceChild(newRefreshButton, refreshButton);

      //Lägger till eventlyssnare
      newRefreshButton.addEventListener('click', function(){
        breed = hash.substring(1); //Tar bort hashtag
        showRandomImageByBreed(breed);
      });
    }
  }
}

// -------------------Funktion som skapar en refresh-knapp-----------------------
function createRefreshButton() {
  let refreshButton = document.createElement('button');
  refreshButton.id = 'refreshbutton';
  refreshButton.textContent = 'New picture';
  document.body.insertBefore(refreshButton, list);
}

//------------- Funktion som skapar en tillbaka-knapp (eller tar bort den) -----
function setGoBackButton() {

  //Letar upp hashtag
  let hash = window.location.hash;

 //Skapar variabler
  let hashArray;
  let breed;
  let subbreed;

  //Letar upp tillbaka-knappen, om det finns någon
  let goBackButton = document.querySelector('#gobackbutton');

  //Index-sidan
  //Tar bort tillbaka-knappen om det finns någon
  if(hash === ''){
    if(goBackButton){
      document.body.removeChild(goBackButton);
    }
  }
  //Subbreed-sidan
  else if(hash.includes('_')){
      hashArray = hash.split('_'); //Splittar strängen
      breed = hashArray[0].substring(1); //Breed är första delen av strängen, utan hashtag

      if(goBackButton === null) {
        //Skapar en tillbaka-knapp om det inte finns någon
        goBackButton = document.createElement('button');
        goBackButton.textContent = 'Back';
        goBackButton.id = 'gobackbutton';
        document.body.insertBefore(goBackButton, list);
      } //End of if

      goBackButton.removeEventListener('click', onClickGoToIndexPage);

      //Lyssnar på knappen
      goBackButton.addEventListener('click', onClickGoToBreed);

  }
  //Breed-sidan
  //Skapar en tillbaka-knapp om det inte finns någon
  else {
    if(goBackButton === null) {
      //Skapar en tillbaka-knapp
      goBackButton = document.createElement('button');
      goBackButton.textContent = 'Back';
      goBackButton.id = 'gobackbutton';
      document.body.insertBefore(goBackButton, list);
    } //End of if

    //Tar bort eventlyssnaren som leder till breed-sidan
    goBackButton.removeEventListener('click', onClickGoToBreed);

    //Lyssnar på knappen
    goBackButton.addEventListener('click', onClickGoToIndexPage);

  } //End of else
}

// ------------------- Funktion som skapar en lista med raser eller underraser ------------
//                    < Om det redan finns en lista så tar den bort den först >
function renderList() {

  //Skapar variabler
  let hash = window.location.hash;
  let urlString;

  //Tömmer listan
  while(list.firstChild){
    list.removeChild(list.firstChild);
  }

  //Ändrar urlString, beroende på vilken sida man befinner sig på
  //Index-sidan
  if(hash === ''){
    urlString = 'https://dog.ceo/api/breeds/list/all';
  }
  //Subbreed-sidan ska inte ha någon lista - går ur funktionen
  else if(hash.includes('_')){
    return;
  }
  //Breed-sidan
  else {
    urlString = 'https://dog.ceo/api/breed/' + hash.slice(1) + '/list';
  }

  //Gör GET-anrop
  let request = new XMLHttpRequest();
  request.addEventListener('load', function() {
    return new Promise((resolve, reject) => {
      if(this.status >= 200 && this.status < 300) {
        resolve(this.responseText);
      }
    })
    .then(parseJSON)
    .then(function(object){
      let breedObject;
      let subbreedArray;
      let listItem;
      let a;
      //Skapar en ny li och a för varje ras/underras, samt lägger till en eventlyssnare på a-taggen
      //Om det är index-sidan så används en for-in-loop, eftersom raserna ligger i ett objekt
      if(hash === ''){
        breedObject = object.message;
        for(let key in breedObject) {
          listItem = document.createElement('li');
          a = document.createElement('a');
          a.textContent = key;
          a.style.textTransform = 'capitalize';
          a.addEventListener('click', function(e){
            let breed = e.target.textContent;
            goToBreed(breed);
          });
          listItem.appendChild(a);
          list.appendChild(listItem);
        }
      } //if
      //Om det är underraserna som ska listas så används en for-of-loop, eftersom dessa ligger i en array
      else {
        subbreedArray = object.message;
        for(let subbreed of subbreedArray) {
          listItem = document.createElement('li');
          a = document.createElement('a');
          a.textContent = subbreed;
          a.style.textTransform = 'capitalize';
          a.addEventListener('click', onClickGoToSubBreed);
          listItem.appendChild(a);
          list.appendChild(listItem);
        }
      } //else
    })
  //promise chain
  }); //End of event listener
  request.open('GET', urlString);
  request.send();
}

// ------------------- Funktion som hanterar picture gallery ------------
function setPictureGallery() {
    //Letar upp hashtag
    let hash = window.location.hash;

   //Skapar variabler
    let hashArray;
    let breed;
    let subbreed;

    //Alla bilder i gallery div rensas bort
    while(galleryDiv.firstChild){
      galleryDiv.removeChild(galleryDiv.firstChild);
    }

    //Index-sidan
    if(hash === ''){
      return;
    }
    //Subbreed-sidan
    //Kallar på showAllPictures med två argument
    else if(hash.includes('_')){
      hashArray = hash.split('_'); //Splittar strängen
      breed = hashArray[0].substring(1); //Breed är första delen av strängen, utan hashtag
      subbreed = hashArray[1]; //Subbreed är andra delen av strängen
      showAllPictures(breed, subbreed);
    }
    //Breed-sidan
    //Kallar på showAllPictures med ett argument
    else {
      breed = hash.substring(1); //Tar bort hashtag
      showAllPictures(breed);
    }
}

function showAllPictures(breed, subbreed) {
  let urlString;

  //Ändrar urlString beroende på om det är bilder på en ras eller en underras som ska visas
  if(subbreed === undefined){
    console.log('the subbreed is undefined');
    urlString = 'https://dog.ceo/api/breed/' + breed + '/images';
  }
  else{
    urlString = 'https://dog.ceo/api/breed/' + breed + '/' + subbreed + '/images';
  }

  //Gör GET-anrop
  let request = new XMLHttpRequest();
  request.addEventListener('load', function() {
    return new Promise((resolve, reject) => {
      if(this.status >= 200 && this.status < 300) {
        resolve(this.responseText);
      }
    })
    .then(parseJSON)
    .then(function(object){
      let imageArray = object.message;
      let image;

      //Loopar igenom array:n med bilder
      for(let imageUrl of imageArray) {
        image = document.createElement('img');
        image.setAttribute('src', imageUrl);
        galleryDiv.appendChild(image);
      }
    })
  //promise chain
  }); //End of event listener
  request.open('GET', urlString);
  request.send();
}

//----------------Funktion som dirigerar användaren till index-sidan ---------
//                 < Ändrar hashtaggen och uppdaterar sedan innehållet >
function onClickGoToIndexPage(e){
  //Ändrar hashtag
  window.location.hash = '';

  //Setting header
  setHeaderAndSubHeader();

  //Setting random image
  setRandomImage();

  //Setting event listener for refresh button
  setRefreshButton();

  //Setting go-back-button
  setGoBackButton();

  //Rendering list with breeds or sub-breeds
  renderList();

  //Setting picture gallery
  setPictureGallery();
}

//--------------- Funktion som kallar på goToBreed ---------------------------
//               < Används när man går tillbaka från subbreed-sidan >
//               < Behöver kunna tas bort från eventlyssnaren och ligger därför i en separat funktion >
function onClickGoToBreed(){
  let breed = header.textContent;
  goToBreed(breed);
}

//----------------Funktion som dirigerar användaren till rätt undersida med raser ---------
//                 < Ändrar hashtaggen och uppdaterar sedan innehållet >
function goToBreed(breed) {
  //Ändrar hashtag
  window.location.hash = '#' + breed;

  //Setting header
  setHeaderAndSubHeader();

  //Setting random image
  setRandomImage();

  //Setting event listener for refresh button
  setRefreshButton();

  //Setting go-back-button
  setGoBackButton();

  //Rendering list with breeds or sub-breeds
  renderList();

  //Setting picture gallery
  setPictureGallery();
}

//----------------Funktion som dirigerar användaren till rätt undersida med underraser ---------
//                 < Ändrar hashtaggen och uppdaterar sedan innehållet >
function onClickGoToSubBreed(e) {
  //Subbreed är texten i listan som man klickade på
  let subbreed = e.target.textContent;

  //Breed är texten i h2
  let breed = header.textContent;

  //Ändrar hashtag
  window.location.hash = '#' + breed + '_' + subbreed;

  //Setting header and subheader
  setHeaderAndSubHeader();

  //Setting random image
  setRandomImage();

  //Setting event listener for refresh button
  setRefreshButton();

  //Setting go-back-button
  setGoBackButton();

  //Rendering list with breeds or sub-breeds
  renderList();

  //Setting picture gallery
  setPictureGallery();
}

//Tar fram headers
setHeaderAndSubHeader();

//Tar fram bilden
setRandomImage();

//Tar fram refresh-knappen
setRefreshButton();

//Skapar tillbaka-knappen (om den ska finnas)
setGoBackButton();

//Skapar listan
renderList();

//Tar fram alla bilder
setPictureGallery();
