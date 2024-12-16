const question = document.querySelector('.quize h3')
const answerbuttons = document.querySelectorAll('.set')
const nextbtn = document.querySelector('.next')
const startbtn = document.querySelector('.start')
const box = document.querySelector('.answer-buttons')

nextbtn.addEventListener('click', nextbutton);
startbtn.addEventListener('click', start)


const questions = [
    {
        quest : 'What is the name of our president',
        ans : [
        {text:'peter',correct:false},
        {text:'ben',correct:false},
        {text:'tinibu',correct:true},
        {text:'paul',correct:false},
    ]
   }, 
   {
    quest : 'what is the colur of nigeria flag',
    ans : [
        {text:'green-white',correct:true},
        {text:'blue purple',correct:false},
        {text:'brown',correct:false},
        {text:'pink-brown',correct:false},
    ]
   },
   {
    quest : 'What is the colour of the sky in day',
   ans : [
       {text:'blue',correct:false},
       {text:'sky blue',correct:true},
       {text:'white',correct:false},
       {text:'orange',correct:false},
    ]
   },
   {
    quest : 'Which is the sweetest',
    ans : [
       {text:'apple',correct:true},
       {text:'beans',correct:false},
       {text:'water melon',correct:false},
       {text:'cocomba',correct:false},
    ]
    },
    {
    quest : 'The colour of the new #1000',
    ans : [
       {text:'brown',correct:false},
       {text:'green',correct:false},
       {text:'gray',correct:false},
       {text:'blue',correct:true},
    ]
},
]

let questionindex = 0;
let score = 0;

function startquize(){
    questionindex = 0;
    score = 0;
    nextbtn.style.display= 'none';
    startbtn.style.display = 'none'
    showquize()
}

function showquize(){
    let currentquestion = questions[questionindex]
    let questionNo = questionindex + 1;
     question.innerHTML = questionNo + '.'+ currentquestion.quest;
  let short = currentquestion.ans;

        for(let i = 0; i < answerbuttons.length ; i++){
              answerbuttons[i].innerHTML = currentquestion.ans[i].text;
            if(short[i]){
                answerbuttons[i].dataset.correct = short[i].correct;
            answerbuttons[i].addEventListener('click', selectAnswer)

            }
        }
}



  function selectAnswer(e){
     let todo = e.target;

       
     if(todo.dataset.correct === 'false'){
        todo.classList.add('incorrect')
     
    }else if(todo.dataset.correct === 'true'){
        todo.classList.add('correct')
        score++;
        
     }

     answerbuttons.forEach(button => {
        if(button.dataset.correct === 'true'){

        button.classList.add('correct')
     button.dataset.correct = null;

        }
        button.disabled = true;

     })
     nextbtn.style.display = ' flex'

  }

  function nextbutton(){

    if(questionindex > questions.length - 2){
         box.style.display = 'none'
         question.innerHTML = `You scored ${score} out of ${questions.length}`
        startbtn.style.display = 'flex';
        nextbtn.style.display = 'none';
        questionindex = 0;

    }else{
    questionindex++;
        showquize()
        answerbuttons.forEach(button => {
            button.classList.remove('correct')
            button.classList.remove('incorrect')
            button.disabled = false;
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
        
    })
    
    startquize()
  }

  startquize()
