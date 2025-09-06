const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const removeActive = () => {
  const lessonBtn = document.querySelectorAll(".lesson-btn");
  lessonBtn.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWords = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      // console.log(clickBtn);
      clickBtn.classList.add("active");
      diplayLevelWord(data.data);
    });
};
const loadWordDetail=async(id)=>
{
const url= `https://openapi.programming-hero.com/api/word/${id}`
const res = await fetch (url);
const details = await res.json();
diplayWordDtails(details.data)
};

const  diplayWordDtails = (word)=>{
console.log(word);
const detailsBox = document.getElementById("details-container");
detailsBox.innerHTML=` <div>
<h2>${word.word} ( :${word.pronunciation})</h2>
</div>

<div>
<h2  class="font-bold">${word.meaning}</h2>
</div>
<div>
<h2  class="font-bold">example</h2>
<p>${word.sentence}</p>
</div>
<div>
<h2  class="font-bold gap-5">synonym</h2>
<button class="btn">syn1</button>
<button class="btn">syn2</button>
<button class="btn">syn4</button>
</div>`
document.getElementById("my_modal_5").showModal();
}
const diplayLevelWord = (words) => {
  // id:  87
  // level : 1
  // meaning : "সূর্য"
  // pronunciation : "সান"
  // word: "Sun"
  // [[Prototype]] :  Object

  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = ` 
<div class="container mx-auto p-4 text-center col-span-3 bg-[#Fff2f2]  p-4">
<i class="text-5xl fa-solid fa-triangle-exclamation"></i>
<p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
<h3 class="font-bold text-2xl">নেক্সট Lesson এ যান</h3>
</div>
`;
  }

  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `

<div class=" bg-white text-center p-4 py-10 rounded-xl shadow-md">
<h3 class="font-bold text-2xl">${
      word.word ? word.word : "শব্দ পাওয়া জায়নি"
    }</h3>
<p >Menaing / Pronounciation</p>
<p class="text-xl"> ${word.meaning ? word.meaning : "অর্থ পাওয়া জায়নি"} / ${
      word.pronunciation ? word.pronunciation : " পাওয়া জায়নি"
    }</p> 
<div class="flex justify-between items-center mt-4">
<button onclick="loadWordDetail(${word.id})" class="bg-[#F3F4F6] hover:bg-[#1a91ff40]  p-1 rounded"><i class="fa-solid fa-info"></i></button>
<button class="bg-[#F3F4F6] hover:bg-[#1a91ff40]  p-1 rounded"><i class="fa-solid fa-volume-xmark"></i></button>
</div>
</div>

`;
    wordContainer.appendChild(card);
  });
};

const displayLessons = (lessons) => {
  //   1 GET THE CONTAINER
  const levelsContainer = document.getElementById("level-container");
  levelsContainer.innerHTML = "";
  // 2 GET into every lesson
  for (let lesson of lessons) {
    // console.log(lesson);
    // 3 CREATE A Element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
<button id="lesson-btn-${lesson.level_no}" onClick="loadLevelWords(${lesson.level_no})" class="hover:bg-[#422AD5] hover:text-[#ffffff] border-2 p-1 text-[#422AD5] rounded-lg lesson-btn"><i class="fa-solid fa-book-open-reader"></i>Lessons-${lesson.level_no}
               </button>
`;
    // 4 append into the container
    levelsContainer.appendChild(btnDiv);
  }
};

loadLessons();
