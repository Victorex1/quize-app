const question = document.querySelector('.quize h3')
const app = document.querySelector('.app')
const answerbuttons = document.querySelectorAll('.set')
const nextbtn = document.querySelector('.next')
const startbtn = document.querySelector('.start')
const box = document.querySelector('.answer-buttons')
const test = document.querySelector('.testing')

startbtn.addEventListener('click', start)
window.addEventListener('DOMContentLoaded', () => {
    test.style.display = 'all';
    app.style.cursor= 'none';
     app.style.opacity= "20%";

})
let questionindex = 0;

let results = '';

const fetchData  = async () => {
 const response = await fetch("https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple");
 const convat = await response.json();

respons(convat.results);
nextbtn.addEventListener('click', () => nextbutton(convat.results));
test.style.display = 'none';
app.style.cursor= 'pointer';
 app.style.opacity= "100%";

}
const respons = e => {
    // questionindex++;
    upDate(questionindex,e, output => {
        showquize(output)
})

}

fetchData();

const upDate = (i,cro,Callback) => {
    // let i = questionindex;
    // console.log(cro)
let letter = '';
let num1 = [cro[i].incorrect_answers[0], cro[i].correct_answer ,cro[i].incorrect_answers[1] ,cro[i].incorrect_answers[2] ] ;
let num2 = [cro[i].correct_answer ,cro[i].incorrect_answers[0],cro[i].incorrect_answers[1] ,cro[i].incorrect_answers[2] ] ;
let num3 = [cro[i].incorrect_answers[0],cro[0].incorrect_answers[1], cro[i].correct_answer ,cro[i].incorrect_answers[2] ] ;
let num4 = [cro[i].incorrect_answers[0] ,cro[0].incorrect_answers[1] ,cro[i].incorrect_answers[2] , cro[i].correct_answer ] ;


let sum = [num1, num2, num3 ,num4]

let index = Math.floor(Math.random() * 4);
   letter = sum[index]
  results = cro;
  Callback([{text:letter},{index:index}])

}

let score = 0;

function startquize(){
    questionindex = 0;
    score = 0;
    nextbtn.style.display= 'none';
    startbtn.style.display = 'none'
}
function showquize(answer){
    
    let currentquestion = results[questionindex];
    let questionNo = questionindex + 1;
     question.innerHTML = questionNo + '.'+ currentquestion.question;

        for(let i = 0; i < answerbuttons.length ; i++){
              answerbuttons[i].innerHTML = answer[0].text[i];


              switch (answer[1].index){
                case 0:
                    answerbuttons[1].dataset.correct = answer[0].text[1];
                    break;
                case 1:
                    answerbuttons[0].dataset.correct = answer[0].text[0];
                    break;
                case 2:
                    answerbuttons[2].dataset.correct = answer[0].text[2];
                    break;
                case 3:
                    answerbuttons[3].dataset.correct = answer[0].text[3];
                    break;
                   
              }
             answerbuttons[i].addEventListener('click', selectAnswer)
  }}

  function selectAnswer(e){
let todo = e.target;

     if(todo.innerHTML !== todo.dataset.correct){
        todo.classList.add('incorrect')
     
    }else if(todo.innerHTML == todo.dataset.correct){
        todo.classList.add('correct')
        score++;
        
     }

     answerbuttons.forEach(button => {

        if(button.innerHTML == button.dataset.correct){
           
        button.classList.add('correct')
     todo.dataset.correct = null;

        }
      button.disabled = true;
     })
     nextbtn.style.display = ' flex'

  }

  function nextbutton(details){
    if(questionindex > details.length - 2){
         box.style.display = 'none';
         question.innerHTML = `You scored ${score} out of ${details.length}`
        startbtn.style.display = 'flex';
        nextbtn.style.display = 'none';
        questionindex = 0;

    }else{
    questionindex++;
    upDate(questionindex,results, output => {
        showquize(output)
})

        answerbuttons.forEach(button => {
            button.classList.remove('correct')
            button.classList.remove('incorrect')
            button.disabled = false
        })
    
        nextbtn.style.display = 'none';
    }
   }

  function start(){
    startbtn.style.display = 'none';
    box.style.display = 'block';
    answerbuttons.forEach(button => {
        button.classList.remove('correct')
        button.classList.remove('incorrect')
        button.disabled = false;
        test.style.display = 'all';
        app.style.cursor= 'none';
         app.style.opacity= "20%";

        
    })
    
    startquize()
  }

startquize()
