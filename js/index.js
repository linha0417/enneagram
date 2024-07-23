// 페이지를 로드했을 때
document.addEventListener('DOMContentLoaded', function() {

  // sessionStorage객체를 사용하여 세션 스토리지에서 isLoggedIn 이라는 키에 저장된 값을 가져온다.
  // 세선 스토리지는 브라우저가 열려있는 동안 데이터를 저장하며, 브라우저를 닫으면 데이터가 사라진다.
  // 세션스토리지에 저장된 키 값을 가져와서 true와 비교한다. 만약 isLoggedIn 키에 저장된 값이 true 라면 이미 로그인된 상태임을 의미한다. 
  if (sessionStorage.getItem('isLoggedIn') === 'true') { // 이미 밑에서 로그인 상태를저장함
    // 이미 로그인된 상태이면 로그아웃 페이지로 이동을 해서 로그아웃 을 별도로 만드려고함
    window.location.href = 'logout.html'; 
  }

  document.getElementById('login_form').addEventListener('submit', function(event) {
    event.preventDefault();
    // 아이디 입력 값 가져오기
    const userId = document.querySelector('.user_id').value;
    // 비밀번호 입력 값 가져오기
    const password = document.querySelector('.user_password').value;
    // 지정된 아이디와 비밀번호만 사용 가능하게 설정
    const correctUsername = 'cksp75';
    const correctPassword = '12321';

    // 유효성 검사를 통해 로그인 정보가 아닐 경우 오류 메시지 출력하기 위함
    const messageElement = document.getElementById('message');

    // 간단한 유효성 검사
    // 아이디와 비빌번호의 입력값과 설정된 아이디와 비밀번호가 일치하면(둘다 일치해야함.)
    if (userId === correctUsername && password === correctPassword) {
      // 로그인 성공 문자를 넣어주고, 색깔을 초록색으로 바꾼다.
      // messageElement.textContent = 'Login successful!';
      // messageElement.style.color = 'green';
      alert('로그인이 되었습니다.');
      sessionStorage.setItem('isLoggedIn', 'true'); // "로그인 했음" 상태를 저장 setItem(키, 값) => 단순히 로그인 했다는거를 키와 값으로 표시를 남김.
      // 로그인 성공 시  main 페이지로 이동
      window.location.href = 'main.html';

      // 일치하지 않으면 메시지 요소에 오류 메시지 출력
    } else {
      messageElement.textContent = 'Invalid userId, password';
      messageElement.style.color = 'red';
    }
  });
});




/* document: 현재 웹 페이지의 문서를 나타내는 객체. html 문서 전테를 가리키며, DOM(document object model)의 최상위 객체.

DOMContentLoaded:  이벤트 유형 중 하나로, html 문서의 구조가 완전히 로드되고 DOM이 완전히 구축되었을 때 발생하는 이벤트. 이미지, 스타일시트 등 외부 리소스의 로드가 완료되지 않았더라도 이 이벤트는 발생함.*/


// sessionStorage는 웹 브라우저에서 제공하는 웹 스토리지 API의 일종으로, 세선 동안 데이터를 저장하는데 사용됨. sessionStorage는 각 탭이나 창별로 독립적으로 데이터를 저장하며, 브라우러 탭이나 창이 닫힐 때 데이터가 삭제 된다.

// sessionStorage.setItem(key, value), getItem(key), removeItem(key), clear()