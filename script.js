// function get the JSON DATA from the API
function Get(yourUrl) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}
// quiz1 json object
var science1 = JSON.parse(Get('https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple'));
var Gk1 = JSON.parse(Get('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'));
var computer1 = JSON.parse(Get('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple'));
var history1 = JSON.parse(Get('https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple'));
// taking only the required data from the JSNON
var science = science1.results
var Gk = Gk1.results;
var computer = computer1.results
var hist = history1.results;
console.log(hist)
console.log(Gk)
function myfunction() {
    var divmain = document.createElement("div");
    divmain.id = 'divmain'
    divmain.className = 'container-fluid'
    divmain.style = 'height:100%;'
    // created div for heading
    var div1 = document.createElement("div");
    div1.style = "text-align:center; padding-top:30px; height: 30%;margin-bottom: 2%;";
    var heading = document.createElement('h1')
    heading.id = 'head1';
    heading.innerHTML = 'SCHOOL QUIZ'
    div1.appendChild(heading)
    divmain.appendChild(div1)
    // creating div for discription
    var div2 = document.createElement("div");
    div2.id = 'div2'
    div2.innerHTML = 'Click on the image to start the respective Quiz'
    divmain.appendChild(div2)
    // creating div for quiz avilable
    var div3 = document.createElement("div");
    div3.id = 'div3'
    divmain.appendChild(div3)
    var quizImag = ['https://www.loveaquiz.com/wp-content/uploads/science-nature-quiz.jpg', 'https://www.freshers-iq-adda.com/assets/images/computer-quiz-723x482-43.png',
        'https://www.quizony.com/general-knowledge-quiz/imageForSharing.png', 'https://i1.wp.com/quizagogo.com/wp-content/uploads/2018/07/2018-07-11-018.jpg?resize=768%2C384&ssl=1']
    quizImag.forEach((element, i) => {
        var div = document.createElement("div");
        div.style = "display: flex; height: 120px;align-items: center;justify-content: center; "
        // div.className ="col-md-4" 
        var imgage = document.createElement("img");
        imgage.id = i + 1;
        var id = i + 1;
        imgage.style = "height: 200px; width :200px;border: solid black 2px;"
        imgage.src = element
        imgage.setAttribute("onclick", "quiz(" + id + ")")//on clicking on the image call the function to load quiz
        div.appendChild(imgage)
        div3.appendChild(div)
    });
    document.body.appendChild(divmain)
}
// function to load quiz instruction
function quiz(id) {
    var x = id;
    var divmin2 = document.createElement("div");
    var divmain2 = document.createElement("div");
    divmain2.className = 'container-fluid'
    divmain2.id = 'divamin2'
    var head = document.createElement("h1");
    head.innerHTML = 'Instructions :'
    head.style = 'margin-top: 5% ;'
    var ul = document.createElement('ul')
    ul.id = 'ul'
    // array of instructions to be displayed
    var instructions = ['Each question is a multiple-choice question with four answer choices',
        'Read the questions carefully and choose one right answer by clicking on the button',
        'Click on the Record  button to record your answers for the questions in a quiz',
        'Once a question is submitted, you  will be allowed to see the next question',
        'Result will be displayed once you finish the quiz',
        'Click on the start button to start the quiz',
        'All The Best']
    // for each loop to display instructions
    instructions.forEach(element => {
        var li = document.createElement('li')
        li.className = 'li'
        li.innerHTML = element
        ul.appendChild(li)
    });
    divmain2.appendChild(head)
    divmain2.appendChild(ul)
    divmin2.appendChild(divmain2)
    var start = document.createElement('button')
    start.style = 'border-radius: 12px;background-color: rgb(7, 228, 92);height: 50px; width :100px'
    start.innerHTML = 'START'
    start.setAttribute("onclick", "selectQuiz(" + x + ")")
    divmain2.appendChild(start)
    document.getElementById('divmain').innerHTML = divmin2.innerHTML

}
// add the exracted quiz json to ann array
var quizArray = [science, computer,Gk,hist]
// function to select quiz from array
var quiz1;
function selectQuiz(x) {
    var y = x-1
    var quizSelected = quizArray[y]
    quiz1= quizSelected
    loadquiz()
}


var count1 = 0;//counter for the questions
var option = [];
var shuffleOpt = [] 
var ansSelectedtemp =[];
var ansSelected =[];//array for actual correct choose
var correctAns =[];//array for actual correct ans
var num = 1 // qution number
var quest;
var startTime = performance.now();
var endTime;

// function called to load quiz
function loadquiz() {
    var count = count1
    var quiz = quiz1;
    var quz = quiz[count]
    quest = quz.question
    // pushing the options from json into a array
    option = [];
    option.push(quz.correct_answer)
    correctAns.push(quz.correct_answer)
    quz.incorrect_answers.forEach(element => { option.push(element) });
    // to shuffle the options to diplay in the web
    shuffleOpt =[];
    while (shuffleOpt.length < 4) {
        var r = Math.floor(Math.random() * 4);
        if (shuffleOpt.indexOf(option[r]) == '-1') {
            shuffleOpt.push(option[r])
        }
    }
    createQuiz()
}


    // //code for the DOM
function createQuiz(){
    var divmin3 = document.createElement("div");
    var divmain3 = document.createElement("div");
    divmain3.className = 'container-fluid'
    divmain3.id = 'divamin3'
    var head1 = document.createElement("h2");
    head1.style = 'margin-top: 5%;'
    var div5 = document.createElement("div");
    div5.id = 'div5'
    var divQ = document.createElement("div");
    divQ.id ='divQ'
    var div6 = document.createElement("div");
    div6.id = 'div6'

    head1.innerHTML = 'Question'+ ' ' + num +':';
    divQ.innerHTML = quest;
    //  to display options 
    var form = document.createElement("form");
    shuffleOpt.forEach((element,i) => {
        var div61 = document.createElement("div");
        div61.id ='div61'
        var label = document.createElement('lable');
        label.style = 'margin-left: 2%;'
        label.for = element;
        label.innerHTML = element;
        var input = document.createElement('input');
        input.type = 'radio';
        input.id = element;
        input.value = element;
        input.name ='ans'
        var val = i
        input.setAttribute("onclick", "selectedAns(" + val + ")");
        div61.appendChild(input);
        div61.appendChild(label);
        form.appendChild(div61)
    });
    div6.appendChild(form)
    // count1 += 1;
    var div7 = document.createElement("div");
    div7.id = 'div7'
    var div71 = document.createElement("div");
    div71.id = 'div71'
    var record = document.createElement('button')
    record.id ='record'
    record.style = 'border-radius: 12px;background-color:red;height: 40px; width :100px'
    record.innerHTML = 'RECORD'
    record.setAttribute("onclick", "recordAns()");
    div71.appendChild(record)
    var div72 = document.createElement("div");
    div72.id = 'div72'
    var submit = document.createElement('button')
    submit.id ='sub1'
    submit.style = 'border-radius: 12px;background-color: rgb(7, 228, 92);height: 40px; width :100px'
    submit.innerHTML = 'SUBMIT'
    submit.setAttribute("onclick", "submitAns()");
    div72.appendChild(submit)
    div7.appendChild(div71)
    div7.appendChild(div72)
    div5.appendChild(divQ)
    divmain3.appendChild(head1)
    divmain3.appendChild(div5)
    divmain3.appendChild(div6)
    divmain3.appendChild(div7)
    divmin3.appendChild(divmain3)
    document.getElementById('divmain').innerHTML = divmain3.innerHTML
 
//  if no option is selected disable the submit button
    if(ansSelected.length == count1){
        document.getElementById("sub1").disabled = true;
    }
}
 
  // function for selected answer
  function selectedAns(id){
    document.getElementById("sub1").disabled = false;
   ansSelectedtemp.push(shuffleOpt[id])
 }
// function to load next question
function submitAns(){
    count1 += 1;
    num += 1;
    var y = ansSelectedtemp.length
    var m = y -1
    ansSelected.push(ansSelectedtemp[m])
    if(count1<10){loadquiz()}
    else {
        // end the timer 
    endTime = performance.now();
        result()}  
}
// fuction to display result

function result(){
    var score = 0;
    var time = endTime - startTime
    var timeSec = time/60000
    var n = timeSec.toFixed(2);
    var answer = correctAns;
    var chosen = ansSelected
    for (i = 0; i <= 9; i++) {
        if(answer[i]==chosen[i]){
            score +=1;
        }
    }
// creating DOM for result
var divmin5 = document.createElement("div");
    var divmain5 = document.createElement("div");
    // divmain5.className = 'container-fluid'
    divmain5.id = 'divamin5'
    var tim = document.createElement("div");
    tim.id ='tim';
    tim.innerHTML = 'The Time taken to complete Quiz :' + ' '+ n + 'min'
    divmain5.appendChild(tim)
    var div9 = document.createElement("div");
    div9.id ='div9';
    div9.innerHTML = 'Total correct answers :' + ' '+ score
    var div10 = document.createElement("div");
    div10.id ='div10';
    if(score< 4){
        div10.innerHTML = "FAIL" 
        div10.style ='color:red' 
    }
    else{div10.innerHTML = "PASS" 
    div10.style ='color:green'}
    divmain5.appendChild(tim)
    divmain5.appendChild(div9)
    divmain5.appendChild(div10)
   divmin5.appendChild(divmain5)
   document.getElementById('divmain').innerHTML = divmin5.innerHTML
}
function recordAns(){
    document.getElementById("record").disabled = true;
}
