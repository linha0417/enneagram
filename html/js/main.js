import questions from './questions_data.js'; // 각 질문 데이터 불러옴
import personalityTypes from './personality_types_data.js'; // 각 유형 데이터
import options from './options_data.js'; // 5가지 답변



const questionsPerPage = 10; // 한 페이지에 10개의 질문
let currentPage = 1; // 현재 페이지 번호
const scores = {}; // 각 유형별 점수를 저장하기 위한 빈 객체
console.log(scores);
const selectedAnswers = {}; // 각 질문의 선택된 답변을 저장을 위한 빈 객체



// 9가지 유형 번호와 유형 이름 type 자리에 아무 이름 상관 없음
personalityTypes.forEach(type => {
  // personalityTypes 의 배열을 순회하면서 각 성격의 유형 점수를 0으로 초기화 시킴
  // 성격 유형별로 점수를 계산하고 저장할 수 있는 세팅을 한다. 9가지 유형 각각 0 만듦
  scores[type.number] = 0;
  // console.log(scores);
  // {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0}
});



// 현재 페이지와 총 페이지 화면에 나타나게 만드는 함수.
function getTotalPages () {
  // question.length = 90 , questionsPerPage = 10
  return Math.ceil(questions.length / questionsPerPage); // 90개 질문길이 나누기 한페이지에 10개 = 90 나누기 10 -> 총 9페이지

  // Math.ceil 소수점 포함 올림하여 가장 가까운 정수로 반환
  // console.log(Math.ceil(4.2)); // 출력: 5
  // console.log(Math.ceil(7.0)); // 출력: 7
  // console.log(Math.ceil(-2.8)); // 출력: -2
}



// 라디오 버튼 그룹 생성 함수 : "질문 인덱스"를 받아서 해당 질문에 대한 라디오 버튼 그룹을 생성
// questionIndex는 1 부터 90번가지 질문을 인자로 받음.
function createCheckboxGroup(questionIndex) {
  // html -> document 에 5개의 체크 박스를 안에다 넣으려고 div 만듦 
  const checkboxWrap = document.createElement('div');
  // div 이름 붙여준 div 태그에 클래스 네임 붙여줌
  checkboxWrap.className = 'checkbox_wrap';

  // options의 5가지 답변 각 요소들을 순회 한다 -> forEach로 반복. option 위치(자리)는 요소임 이름 아무거나 상관없음
  options.forEach(option => {
    // 5가지 답변 요소들을 인풋과 라벨로 만들고 한 세트씩 묶는다.
    const inputWrap = document.createElement('div');
    inputWrap.className = 'input_wrap'; 

    // html 문서에 input 태그 생성 후 이름 붙임
    const input = document.createElement('input');
    input.className = 'input';
    
    

    // input type, name, id, value html input 태그의 속성들을 자바스크립트에서도 설정가능
    // input 태그 타입 설정
    input.type = 'radio';

    /* input 태그 네임 값 -> 네임 값으로 뭘 만드는지 확인
    일단 한 페이지에 10개의 질문이 화면에 출력된다. */
    input.name = `question_${questionIndex}`;
    
    /*  input 태그 아이디 값
    한 페이지에 10개의 질문이 화면에 출력되서 10개의 질문 인덱스(questionIndex)가 표시되고
    옆에 답변(option)요소의 name 값을 이용한다. 1개의 질문에 5개씩 답변이 출력된다. */
    input.id = `question_${questionIndex}_${option.name}`;

    // option.score 를  input.value 값으로 할당해서 질문에 점수를 부여했다.
    input.value = option.score;
    // console.log(`${questionIndex}번 질문 : ${input.value}점`) /* 각 질문별로 1개의 답변 점수를 할당하고 있는 것을 확인 */

    // 이벤트 리스너에서 "변경된" 답변을 반영하도록 수정 -> input 요소에 change 이벤트 리스너 추가
    input.addEventListener('change', (event) => {
      // input 요소를 사용자가 입력한 값을 score 변수에 저장하고 pareInt()는 문자->정수로 변환
      const score = parseInt(event.target.value);
      console.log(`답변 점수 : ${score}`);
      /* 현재 질문의 번호를 가져옴(배열 인덱스는 0부터 시작하므로 questionIndex - 1 사용)  -1 을 안하면 questions 배열의 유형 번호가 앞으로 땡김 현상이 생긴다.*/
      const questionNumber = questions[questionIndex - 1].number;
      console.log(`questions "질문"에 할당된 유형 번호: ${questionNumber}`); //각 해당 질문의 답변 클릭 시 "유형 번호"가 콘솔에 출력됨

      /* personalityTypes의 유형번호와 questionNubmer의 유형번호 같은 요소를 찾는다. */
      const personalityType = personalityTypes.find(type => type.number === questionNumber);
      console.log(personalityType) // 답변 1~5번 전부 {number: '5', type: '관찰자'} 유형이 출력됨
      console.log(`questionIndex(현재(해당) 선택된 질문 번호): ${questionIndex}`);


      // 만약 personalityTypes의 타입의 번호와 questionNumber가 일치(true)하고,
      if (personalityType) {
        /* 이전에 선택한 답변이 있다면 그 점수를 빼려고한다. selectedAnswers 빈 객체에  quetionIndex(현재(해당)번호의 질문)이 있으면(true), */
        if (selectedAnswers[questionIndex]) {
          /* scores 빈 객체에 personalityType.number(유형번호)에 선택된 답변(selectedAnswers)의 현재(해당)번호의 질문을 빼고, scores의 빈 객체에 [personalityType.number]을 할당한다. */
          scores[personalityType.number] -= selectedAnswers[questionIndex];
          console.log(selectedAnswers);
        }
        // 선택된 새로운 점수를 더해줌 (const score = parseInt(evnet.targer.value);)
        scores[personalityType.number] += score; 
        // 선택한 답변 점수를 저장 현재(해당)번호의 질문을 담아둔 selectedAnsers에 점수 할당
        selectedAnswers[questionIndex] = score;
      }
    });

    const label = document.createElement('label');
    // css 로 줄바꿈 제어 시도 하려고 만듦.
    label.className = 'label';
    label.htmlFor = input.id;
    // options 배열의 label에 <br> 추가하고 라벨을 html 문서에 넣는다.(줄 바꿈 하는 방법)
    label.innerHTML = option.label; 

    inputWrap.appendChild(input);
    inputWrap.appendChild(label);
    checkboxWrap.appendChild(inputWrap);
  });

  return checkboxWrap;
}



/* 질문 표시 함수 : 현재 페이지의 질문들을 화면에 표시.
questionContainer 요소의 내용을 초기화한 후, 현재 페이지에 맞는 질문들을 가져와서 각 질문마다 텍스트와 라디오 버튼 그룹을 추가.
page는 현재 페이지를 인자로 받는다 */
function displayQuestions(page) { 
  // fill.html에 있는 question div를 가져와서 이름 붙임
  const questionContainer = document.querySelector('.question');
  // 그리고 초기화 
  questionContainer.innerHTML = '';

  // (1 - 1) * 10 = 0 : 시작 페이지를 지정하는 방법
  const start = (page - 1) * questionsPerPage;

  // start + 10 = 10 : 마지막 페이지를 지정하는 방법
  const end = start + questionsPerPage;

  // questions [0](1) 부터 questions[9](10) 까지의 질문을 포함 (questions : 질문객체임)
  const paginatedQuestions = questions.slice(start, end);
  
  // paginatedQuestions 요소를 각각 반복해서 순회함 첫번째 매개변수 요소, 두번째는 인덱스
  paginatedQuestions.forEach((question, index) => {
    /* start: 현재페이지 첫 번째 질문의 인덱스 
    index: 현재페이지에서의 질문의 인덱스(0부터 시작)
    + 1 : 질문 번호를 1부터 시작하도록 추가. 안하면 현재페이지의 질문 인덱스가 0 부터 시작되서
    질문번호, 유형번호 등 콘솔에서 안 맞는다. */
    const questionIndex = start + index + 1;
    // console.log(questionIndex)

    // question 변수가 객체이므로 질문 객체 안에 text 속성을 사용하여 질문 내용을 가져옵니다.
    const questionText = question.text; 

    // div 생성 후 이름 붙임
    const questionElement = document.createElement('div');
    questionElement.className = 'question_item';

    const questionTextElement = document.createElement('p');
    questionTextElement.className = 'question_text';

    // question.text(questions 배열의 text) 가 할당된 questionText를 p태그 생성된 questionTextElement의 textContent에 할당
    questionTextElement.textContent = questionText; 

    // 위에서 만든 createCheckboxGroup(questionIndex) 함수를 checkboxGroup 변수에 할당
    const checkboxGroup = createCheckboxGroup(questionIndex);
    questionElement.appendChild(questionTextElement); 
    questionElement.appendChild(checkboxGroup);
    questionContainer.appendChild(questionElement);

    /* personalityTypes 배열에서  현재 question객체의 number속성과 일치하는 personalityTypes의 number 속성을 가진 객체를 찾는다. 
    위에 있는 코드랑 다른거임. 각각 다른 함수 내에서 사용 */
    const personalityType = personalityTypes.find(type => type.number === question.number);

    // 콘솔창 확인 해보면 현재페이지의 질문들과 유형들이 연결되어 있는 것을 볼 수 있다.
    // console.log(personalityType); 

    // 질문의 유형번호와 유형이 일치한 것이 ture면
    if (personalityType) {
      /* html 요소로 만들어진다. 일치된 질문과 유형들이 html 요소로 들어가서 화면에 나타남.
      <div class="question_item" data-personality-type="personalitytype.type"></div> */
      questionElement.setAttribute('data-personality-type', personalityType.type);
    }
});


const totalPages = getTotalPages(); // 총 페이지 수 계산. 위에서 정의된 함수 가져와서 할당

// html에서 page-info  id가 span 태그 가져와서 textContent에 페이지 할당해서 페이지 표시
document.getElementById('page-info').textContent = `${page} / ${totalPages}`;

  // questions.length(질문의 총 갯수)보다 page * questionPerPage(10)이 크거나 같으면(true면)
  if (page * questionsPerPage >= questions.length) {
    // next (다음)버튼을 불러와서 textContent 속성을 이용해 다음 텍스트를 제출하기로 바꿈
    document.getElementById('next').textContent = '제출하기'; 
    // 그리고 클릭이벤트 함수를 지우고,
    document.getElementById('next').removeEventListener('click', handleNextClick);
    // 제출하기 함수를 추가를 한다.
    document.getElementById('next').addEventListener('click', submitForm);
  } else {
    // 그게 아니면 반대로 동작 
    document.getElementById('next').textContent = '다음';
    document.getElementById('next').removeEventListener('click', submitForm);
    document.getElementById('next').addEventListener('click', handleNextClick);
  }
  // 시작 페이지는 이전버튼이 보이지 않고, 다음페이지 부터 보임.
  if (page === 1) {
    document.getElementById('prev').style.display = 'none';
  } else {
    // inline-block 안하면 다음 버튼 눌렀을때 이전 버튼이 안나온다.
    document.getElementById('prev').style.display = 'inline-block';
  }
  // 페이지가 변경 된 후 상단으로 스크롤 추가 
  window.scrollTo({top: 0, });  // behavior: 'smooth' -> 페이지 넘어갈때 스크롤 부드럽게 올라감 여기선 별로임
}



// 모달 생성 창 함수
function createModal(message) {
  // div태그 생성 후 modal에 할당
  const modal = document.createElement('div');
  // modal에 클래스 네임 부여
  modal.className = 'modal';
  // div태그 생성 후 modalContent 에 할당
  const modalContent = document.createElement('div');
  // modalContent에 클래스 네임 부여
  modalContent.className = 'modal_content';
  // p태그 생성 후  modalText 에 할당
  const modalText = document.createElement('p');

  const closeButtonWrap = document.createElement('div');
  closeButtonWrap.className = 'close_button_wrap';
  // modalText. 요소의 텍스트 내용을 message 변수에 단긴 값으로 설정
  // 예를 들어 message 가  '안녕하세요'라면, modalText 요소의 텍스트 내용이 '안녕하세요'로 변경됨
  modalText.textContent = message;

  const closeButton = document.createElement('button');
  closeButton.textContent = '닫기';
  closeButton.className = 'close_button';
  closeButton.addEventListener ('click', ()=> {
    modal.style.display = 'none'; // 따옴표 없이 none 이라고 입력하면 동작이 안된다.
  });
  // modalContent에 modalText 의 message 입양
  modalContent.appendChild(modalText);
  modalContent.appendChild(closeButton);
  // 1. 버튼을 감쌀 div태그도 modalContent 안에 넣고
  modalContent.appendChild(closeButtonWrap);
  // 2. 그다음에 button을 wrap안에 넣는다.
  closeButtonWrap.appendChild(closeButton);
  modal.appendChild(modalContent);
  // html 바디 안에 모달창을 넣는다.
  document.body.appendChild(modal);

  // 모달 스타일 css 로 입력 해보기
}



// 체크되지 않은 질문이 있는지 확인(검증)하는 함수
function validateQuestions() {
  // questionElement.className = 'question_item'; 위에서 div를 만든 것을 불러옴
  /* <div class="question_item" data-personality-type="관찰자"></div> 
  이렇게 각 질문에 유형이 부여된 div가 html 요소로 들어가 있다. */ 
  const questionItems = document.querySelectorAll('.question_item');

  // 모든 질문이 답변 되었는지 추척하는 변수. 처음에는 true 로 설정. 모든 질문에 답변했다고 가정함.
  let allAnswered = true;

  /* 답변되지 않은 첫 번째 요소를 저장하는 변수 (그래야 첫번째부터 차근차근 답변 안된 첫번째를 표시함.)
  처음에 null로 설정. 아직 답변되지 않은 질문을 찾지 못했다는 의미. */
  let firstUnanswered = null;

  // questionItems 배열의 각 질문 요소(item)에 대해 반복해서 라디오 버튼의 체크 확인 하는 함수
  questionItems.forEach((item, index) => {
    // 각 질문 요소들(item)에서 반복해서 모든 라디오 버튼 찾는다.
    const radios = item.querySelectorAll('input[type="radio"]');
    // 라디오 버튼 중 하나라도 체크되었는지 확인한다.
    const isChecked = Array.from(radios).some(radio => radio.checked);

    // 현재 질문이 답변되지 않았는지 확인한다. 만약 라디오 버튼 체크 안됬다면(체크안된게 true)
    if(!isChecked) {
      // false로 설정 하면 질문중 하나라도 답변되지 않은 것이 있으므로, 모든 질문에 답변되지 않았다고 표시됨.
      allAnswered = false;

      /* 초기값 firstUnanswered가 null을 !을 하면 null이 아니니까 true (null값 자체를 부정)
      null 값이 없어지게 된다.(지워지게 된다) */
      if(!firstUnanswered) {
        /* firstUnanswered를 현재의 item(질문)으로 설정(할당)한다.  null 자체가 없어지게 되서 아무것도 할당 된게 없는 상태에서 체크 되지 않은 item 할당*/ 
        firstUnanswered = item;
      }
      // questionItems에 안에 item의 p태그를 가져와서 빨간색으로 표시
      item.querySelector('p').style.color = 'red';
    } else {
      // 아니면 표시 안함.
      item.querySelector('p').style.color = '';
    }
  });
  /* allAnswered가 false 이고, firstUnanswered가 존재한다면(firstUnanswered 안에 체크 되지 않는게 있다면) */
  if (!allAnswered && firstUnanswered) {
    // 모든 질문에 답변해 주세요 메시지가 담긴 모달 함수 호출.
    // modalContent.textContent = message 이다
    createModal('모든 질문에 답변해 주세요.'); // 위에 모달 생성함수 createModal(message = '모든 질문에 답변해 주세요')) 모든 질문에 답변해 주세요가 message 자리에 인자로 들어감

    // 답변되지 않은 질문으로 스크롤 한다.
    firstUnanswered.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  // 모든 질문이 답변 되었다면 true, 그렇지 않으면 false를 반환한다.
  return allAnswered;
}



/* 이전 버튼 불러와서 클릭 이벤트리스너 추가한다. */
document.getElementById('prev').addEventListener('click', () => {
  // 만약 현재 페이지가 1보다 크면(true),
  if (currentPage > 1) {
    // 클릭했을 때 현재 페이지에서 감소 시키고
    currentPage--;
    // 질문표시 함수에서 감소된 현재페이지 출력
    displayQuestions(currentPage);
  }
});



// 다음 버튼 클릭 이벤트 핸들러
function handleNextClick() {
  // 만약 현재페이지 * 한페이지 당 10개 질문 갯수보다 총 질문 갯수가 크고,
  if (currentPage * questionsPerPage < questions.length) {
    // 체크되지 않은 질문이 있는지 검증하는 함수가 있다면,
    if (validateQuestions()) {
      // 현재 페이지를 증가시킨다.
      currentPage++;
      // 질문 표시 함수에서 증가된 현제페이지 출력
      displayQuestions(currentPage);
      // '다음' 버튼의 클릭 이벤트 리스너를 다시 추가
      const nextButton = document.getElementById('next');
      nextButton.addEventListener('click', handleNextClick);
    }
  } else {
        // html에서 가져온 next 버튼의 콘텐츠가 '다음'일 경우
        if (document.getElementById('next').textContent === '다음') {
          // button 만들고 이름 붙이고, textContent 를 제출하기로 입력 후 
          const submitButton = document.createElement('button');
          submitButton.textContent = '제출하기';
          // 제출 버튼 아이디도 생성해준다.
          submitButton.id = 'submit';
          // 제출버튼을 클릭하면 폼을 제출하는 이벤트리스너 추가
          submitButton.addEventListener('click', submitForm);
          
          const nextButton = document.getElementById('next');
          // 다음 버튼의 부묘 요소를 가져온다.
          const parentDiv = nextButton.parentElement;
          // 다음 버튼을 제출하기 버튼으로 교체
          parentDiv.replaceChild(submitButton, nextButton);
    
          // 제출하기 버튼 생성 후에는 '다음' 버튼의 클릭 이벤트 리스너를 제거합니다.
          nextButton.removeEventListener('click', handleNextClick);
        }
  }
}


// 자료들을 제출하는 함수
function submitForm() {
  if (validateQuestions()) {
    // Object.keys(scores).forEach(key => {
    //   const td = document.querySelector(`#type_${key}`);
    //   if (td) {
    //     td.textContent = scores[key];
    //   }
    // });
    localStorage.setItem('personalityScores', JSON.stringify(scores)); // 점수 저장 코드 확인 및 유지
    alert('제출 되었습니다.');
    window.location.href = 'result.html'; // 제출 후 result.html로 이동
  }
}
// 초기 페이지 로드
document.addEventListener('DOMContentLoaded', function() {
  currentPage = 1; // 현재 페이지 번호 초기화
  displayQuestions(currentPage); // 초기 질문 페이지 표시
  document.getElementById('next').addEventListener('click', handleNextClick); // 다음 버튼 클릭 이벤트 핸들러 설정
});