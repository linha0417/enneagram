// 출생연도 셀릭트 박스 옵션목록 동적 생성
// id가 birth_year인 select 태그를 불러온다(선택한다).
const birthYearEl = document.querySelector('#birth_year');

/* option 목록이 이미 생성되었는지를 확인하는 역할 -> 초기값이 false인 이유는 출생연도 옵션이 아직 생성되지 않았다는 의미.
만약 isYearOptionExisted 변수가 없다면, 사용자가 셀렉트 박스를 클릭할때 마다 1910부터 2024까지의 옵션이 계속 추가 된다.
동적생성: 처음 셀렉트 박스에 포커스를 맞출 때만 옵션이 생성됨. 이는 페이지 로딩 시 초기화를 지연시키고 필요할 때만 옵션을 생성하여 초기 로딩 시간을 줄이는 장점이 있다.*/
let isYearOptionExisted = false;
let isMonthOptionExisted = false;
let isDateOptionExisted = false;

// 불러온 select 요소에 포커스 이벤트리스너 추가 -> select 박스를 클릭하거나 탭으로 이동할 때 함수가 실행됨
birthYearEl.addEventListener('focus', function() {
  /* 현재 isYearOptionExisted가 false 이고, !isYearOptionExisted 이면 true가 된다. 그래서 isYearOptionExisted가 false 일 때만 조건문 안의 코드가 실행되고,
  isYearOptionExisted가 true 이면 조건문이 반대로 되니까 실행 되지 않는다.
  결론, 초기에 한번 실행 되게 만드려고 false로 만듦. */
  if (!isYearOptionExisted) {
    console.log(isYearOptionExisted); // false
    // true로 설정해서 옵션이 생성되었음을 표시하고
    isYearOptionExisted = true;
    // 옵션 생성하는 반복문 만듦.
    for (let i = 1940; i <= 2024; i++) {
      // option 태그 만들어서 이름 붙이고
      const yearOption = document.createElement('option');
      /* option 태그에 속성을 만들고 속성값을 i 로 전달하고 2024까지 출력시킴. */
      yearOption.setAttribute('value', i);
      // <option value="1910">1910</option> 내용으로 i가 있어야 옵션으로 표시됨.
      yearOption.innerText = i;
      // this는 이벤트가 발생한 요소, birthYearEl임 
      this.appendChild(yearOption);
      // console.log(this);
    }
  }
  console.log(isYearOptionExisted); // true
});



// select 태그의 id값 가져오기
const birthMonthEl = document.querySelector('#birth_month');
// 초기값 설정. option이 생성 되기 전 출생연도, 월, 일 이렇게만 되어있는 상태를 의미
isMonthOptionExisted = false;
// 사용자가 select 박스 선택하거나 탭으로 이동할 때 이벤트 발생하게 만듦.
birthMonthEl.addEventListener('focus', function() {
  /*false에서 true로 변경시켜서 아래 조건을 진행하기 위한 체크하기.
  (단순히 참값 만들기?) */
  if (!isMonthOptionExisted) {
    // 조건이 맞으면 여기서 실제로 true로 값을 변환시켜주고 (option이 생성되었다는 것을 표시)
    isMonthOptionExisted = true;
    for (let i = 1; i <= 12; i++) {
      const monthOption = document.createElement('option');
      monthOption.setAttribute('value', i);
      monthOption.innerText = i;
      this.appendChild(monthOption);
    }
  }
});



const birthDate = document.querySelector('#birth_date');
isDateOptionExisted = false;

birthDate.addEventListener('focus', function() {
  // if (조건문)이 관문 통과하듯이 체크하는(제한) 기능인가?
  if (!isDateOptionExisted) {
    isDateOptionExisted = true;
    for (let i = 1; i <= 31; i++) {
      const dateOption = document.createElement('option');
      // 폼을 제출할 때 사용자가 선택값이 서버에 전달시키기 위한 코드
      dateOption.setAttribute('value', i);
      dateOption.innerText = i; 
      this.appendChild(dateOption);
    }
  }
});



/* 다음버튼 누르면 페이지 넘어가지 않고, 입력되지 않은 항목들 체크해서 알림 */
const nextButton = document.getElementById('next_button').addEventListener('click', function(event) {
  // 기본 이벤트를 막기 위한 코드(예: 폼 제출)
  event.preventDefault();
  // 각 태그들 불러오기
  const nameInput = document.querySelector('.input[placeholder="이름을 입력하세요"]');
  const selectYear = document.getElementById('birth_year');
  const selectMonth = document.getElementById('birth_month');
  const selectDate = document.getElementById('birth_date');
  const manInput = document.getElementById('man');
  const womanInput = document.getElementById('woman');
  // const addrInput = document.getElementById('address');

  const nameRegex = /^[가-힣]+$/; // 한글 정규식

  // 이름의 입력 값이 한글 정규식에 맞지 않는지 체크하고, 한글 정규식에 맞지 않으면 true 인 조건 --> 정규식에 맞지 않을 때마다 알림창 생성
  if (!nameRegex.test(nameInput.value.trim())) {
    // 아래 함수를 실행한다.
    alert('이름을 입력하세요');
    nameInput.focus();
    return;
  }

  // 옵션값이 '출생연도'라고 되어있으면 출생연도 입력하라는 알림창 나옴
  if (selectYear.value === '출생연도') {
    alert('출생연도를 입력해 주세요.')
    selectYear.focus();
    // 조건이 만족되지 않으면 함수 실행을 중단 한다. -> '출생연도'라고 되어 있지 않으면 함수 중단.
    return;
  }

  // 옵션값이 '월'이랑 같으면 월 입력하라는 알림창 나옴
  if (selectMonth.value === '월') {
    alert('출생월을 입력해 주세요.')
    selectMonth.focus();
    return;
  }

  if (selectDate.value === '일') {
    alert('출생일을 입력해주세요.')
    selectDate.focus();
    return;
  }
  // 체크되어 있지 않으면 ture인 조건이므로 성별이 선택되지 않았을 때가 ture니까 알림창 나옴
  if (!manInput.checked && !womanInput.checked) {
    alert('성별을 선택해 주세요.')
    return;
  }
  
  // 남자야? 남자면 남자값 : 아니면 여기는 여자 값 -> 둘중하나를 선택하면 자동으로 값 저장되어서 사용가능
  const gender = manInput.checked ? manInput.value : womanInput.value;

  // const tellRegex = /^[0-9]{10,11}$/; // 숫자 정규식
  // if (!tellRegex.test(tellInput.value.trim())) {
  //   alert('전화번호를 입력해 주세요.')
  //   tellInput.focus();
  //   return;
  // }

  // if (addrInput.value.trim() === '') {
  //   alert('주소를 입력해 주세요')
  //   addrInput.focus();
  //   return;
  // }
  
  // 쿠기에 값 저장
  document.cookie = `name=${nameInput.value.trim()}; path=/; SameSite=Lax; Secure`;
  document.cookie = `birthYear=${selectYear.value}; path=/; SameSite=Lax; Secure`;
  document.cookie = `birthMonth=${selectMonth.value}; path=/; SameSite=Lax; Secure`;
  document.cookie = `birthDate=${selectDate.value}; path=/; SameSite=Lax; Secure`;
  document.cookie = `gender=${gender}; paht=/; SameSite=Lax; Secure`;

  
  // 다음 버튼 누르면 fill.html페이지로 이동
  location.href = 'fill.html';
});


/* trim() 메서드 : 문자열 양 끝의 공백 문자를 제거하는 역할
이를 통해 사용자가 실수로 입력한 불필요한 공백을 제거하여 정확한 값으로 유효성 검사를 수행한다.
공백이 있더라도 정상적으로 유효성 검사를 통과할 수 있게 한다. */