

document.addEventListener('DOMContentLoaded', function() {
  // 로컬 스토리지에서 점수 가져오기
  const scores = JSON.parse(localStorage.getItem('personalityScores')) || {}; 
  console.log(scores); // 각 질문별로 합삽된 점수가 키:값으로 들어가 있음.
  // {1: 10, 2: 5, 3: 5, 4: 5, 5: 10, 6: 10, 7: 0, 8: 10, 9: 5}

  /*  personalityTypes.js 의 데이터랑 다름 여기서는 함수내에서 사용하는 변수임
  결과페이지 화면에서 출력될 내용임. */
  const personalityTypes = [
    {number: "1", type: '1번 유형'},
    {number: "2", type: '2번 유형'},
    {number: "3", type: '3번 유형'},
    {number: "4", type: '4번 유형'},
    {number: "5", type: '5번 유형'},
    {number: "6", type: '6번 유형'},
    {number: "7", type: '7번 유형'},
    {number: "8", type: '8번 유형'},
    {number: "9", type: '9번 유형'}
  ];


  // 가장 높은 점수 찾기 : -1 로 초기값 세팅 후 forEach에서 반복하면서 점점 큰 점수 찾게 만들기 위함.
  // let highestScore = -1;
  // // 가장 높은 점수를 가진 유형찾기
  // let highestType = [];

  // // 여기서 포인트는 "scores를 반복(forEach)해서 큰점수를 찾는다"
  // Object.keys(scores).forEach(type => { // 여기서 type은 순회 중인 키를 나타냄. 질문 유형 번호임.
  //   // 만약 타입의 점수가 -1 보다 큰경우
  //   if (scores[type] > highestScore) {
  //     highestScore = scores[type]; // 유형번호에 대한 점수를 의미: 점수[유형번호]
  //     highestType = type; // 질문 유형번호
  //   }
  // });
  // console.log(`highestScore: ${highestScore}`);
  // console.log(`highestType: ${highestType}`);


  // tbody의 id가 result-body임
  const resultBody = document.getElementById('result-body');
  // personalityTypes의 요소(type)를 각각 반복하는 함수
  personalityTypes.forEach(type => {
    // thead에 들어가능 tr 틀 만든것 처럼 똑같이 틀만든다.
    const row = document.createElement('tr');
    row.className ='score_row';
    // 유형 셀 만들고
    const typeCell = document.createElement('td');
    typeCell.className = 'typeCell_td';
    // 점수 셀 만들고
    const scoreCell = document.createElement('td');
    scoreCell.className = 'scoreCell_td';
    /* 앞에 있는 type은 personalityTypes의 객체(personalityTypes.forEach(type)함수 정의 했으니까)
    뒤에있는 type은  personalityTypes의 type객체 안에 있는 type*/
    typeCell.textContent = type.type;
    /* 점수를 표시할건데, 어떤점수임? => personalityTypes의 객체안에 있는 유형 번호(number)
    없으면 0으로 할당 */
    scoreCell.textContent = scores[type.number] || 0;
    // row(tr)에 typeCell 추가
    row.appendChild(typeCell);
    // row(tr)에 scoreCell 추가
    row.appendChild(scoreCell);
    // 최종적으로 html tbody태그에 추가 
    resultBody.appendChild(row);
  });

  // 가장 높은 성격 유형 강조 표시
  // if (highestType) {
  //   const highestRow = document.createElement('tr');
  //   highestRow.classList.add('highest');
  //   const highestTypeCell = document.createElement('td');
  //   highestTypeCell.className = 'highest_type_cell';
  //   const highestScoreCell = document.createElement('td');
  //   highestScoreCell.className = `highest_score_cell`;

  //   const highestPersonalityType = personalityTypes.find(type => type.number === highestType);

  //   highestTypeCell.textContent = `${highestPersonalityType ? highestPersonalityType.type : highestType}`;
  //   highestScoreCell.textContent = `${highestScore}`;

  //   highestRow.appendChild(highestTypeCell);
  //   highestRow.appendChild(highestScoreCell);
  //   resultBody.appendChild(highestRow);
  // }
});


// 쿠기에서 값 불러오기
document.getElementById('name').innerText = getCookie('name');
document.getElementById('birth_year').innerText = getCookie('birthYear');
document.getElementById('birth_month').innerText = getCookie('birthMonth');
document.getElementById('birth_date').innerText = getCookie('birthDate');
document.getElementById('gender').innerText = getCookie('gender');


// 쿠기에서 값 불러오는 함수
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

console.log(getCookie('gender'));

//쿠기 접근이 제대로 되는데 테스트. 
document.addEventListener('DOMContentLoaded', function () {
  console.log(document.cookie);
})



// 다시 검사하는 버튼
// const startButton = document.createElement('button');
//   startButton.className = 'start_button';
//   startButton.innerText = '다시하기';
//   startButton.addEventListener('click', () => {
//     window.location.href = 'index.html'; // 설문 시작 페이지로 리디렉션
//   });

//   const printButtonWrap = document.getElementById('print_button_wrap');
//   printButtonWrap.appendChild(startButton);


