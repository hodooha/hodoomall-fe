<div align="center">

# 반려견 용품 쇼핑몰 - 호두몰2 Frontend 
###### ※React와 NodeJS 기반의 호두몰1을 React와 Spring Boot로 마이그레이션 <br><br><br>

</div>
<div align="center">

<img src="https://github.com/user-attachments/assets/a2afa5e9-4c6e-4a31-a5d8-37c6bd96c4f3" width=300 alt="호두몰 로고">


</div>

<div align="center"><strong>React와 Spring Boot를 사용하여 RESTful API를 구현한 반려견 용품 쇼핑몰 프로젝트입니다.</strong></div>

<div align="center"><strong><a href="https://github.com/hodooha/hodoomall-be" target="_blank">Backend로 이동</a></strong></div>

<br>

## &#128161; Overview<br>

<img src="https://github.com/user-attachments/assets/e9ffd768-1a4b-4163-b626-99e1ddfcbd35" alt="호두몰 메인">


<br>**📆 프로젝트 기간 : 2024.09 ~ 2024.11 / 1인**
<br><br>
## :page_with_curl: 주요기능

|**기능**|**내용**|
|:---:|:---:|
|**회원가입/로그인**|우동 소식, 우동 모임, 채팅, 메인 디자인 담당|
|**상품**|소셜 로그인 API, 회원가입, 마이페이지, 알림, 쪽지, 고객센터 담당|
|**쿠폰**|카카오 지도 API, 땡처리, 관리자 페이지 담당|
|**Admin**|추천 알고리즘, 나눔 당첨자 래플, 대여/나눔 담당|

<br><br>
## 💻 개발환경
### 개발
**언어 : Java version 17**

**Frame work : Spring Boot(Backend), React(Frontend)**

**Security & Auth : Spring Security, JWT Authentication, Google OAuth**

**Tools : IntelliJ, Visual Studio Code, Docker**

### DB
**DB : MongoDB, Redis, RabbitMQ(Messaging)**

[![stackticon](https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1732073018693?alt=media&token=099c896a-0267-4249-b9e3-0fcd17890cac)](https://github.com/msdio/stackticon) <br><br>

## &#128187; 적용 기술 및 주요 구현 기능  <br>
- [X] **Spring Security, JWT, OAuth2, Redis - 인증 및 권한 관리**<br>
<ul>
<li>Spring Security, JWT를 사용하여 인증 및 인가를 구현했고, OAuth2로 구글 로그인을 추가했습니다.</li>
<li>Redis 기반 Refresh Token 관리와 HttpOnly 쿠키를 활용하여 Replay Attack을 방지하고 인증 시스템의 보안을 강화했습니다.</li>
<li>TTL을 설정하여 Redis에 저장된 만료된 토큰을 자동으로 삭제하고, Access Token 갱신 속도를 최적화하여 성능을 개선했습니다.</li>
<li>Refresh Token Rotation(RTR)기법을 적용하여 탈취된 Refresh Token의 재사용을 차단하여 보안성을 강화했습니다.</li>
<br><br>
</ul>

- [x] **Redis, RabbitMQ - 선착순 쿠폰 발급**<br>
<ul>
<li>쿠폰 수량 관리를 Redis 캐시로 구현하고 Spring Scheduler로 DB와 동기화하여 응답시간을 단축하고 성능을 개선했습니다.</li>
<li>쿠폰 발행을 RabbitMQ 메시지큐를 사용하여 비동기 처리함으로써 동시성 충돌을 피하고 안정성을 높였습니다.</li>
</ul>

 <h5>[구현결과]</h5>
                    <h5>
                      쿠폰 발급 부하테스트 (Thread: 100, Ramp-up: 1, Loop: 10)
                    </h5>
                    <div class="table-wrapper">
                      <table>
                        <thead>
                          <tr>
                            <th rowspan="2">구분</th>
                            <th colspan="4">응답시간(m/s)</th>
                            <th rowspan="2">처리량<br />(req/sec)</th>
                          </tr>
                          <tr>
                            <th>평균</th>
                            <th>최소</th>
                            <th>최대</th>
                            <th>표준편차</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>기존</td>
                            <td>501</td>
                            <td>10</td>
                            <td>4,973</td>
                            <td>784.56</td>
                            <td>125.3</td>
                          </tr>
                          <tr>
                            <td>Redis</td>
                            <td>125</td>
                            <td>8</td>
                            <td>355</td>
                            <td>73.15</td>
                            <td>430.7</td>
                          </tr>
                          <tr>
                            <td>RabbitMQ</td>
                            <td>210</td>
                            <td>10</td>
                            <td>560</td>
                            <td>121.13</td>
                            <td>315.3</td>
                          </tr>
                          <tr style="background-color: yellow">
                            <td>Redis + RabbitMQ</td>
                            <td>181</td>
                            <td>8</td>
                            <td>712</td>
                            <td>126.06</td>
                            <td>340.8</td>
                          </tr>
                        </tbody>
                      </table>
                      <ul>
                        <li>
                          Redis 캐싱 적용으로 평균 응답 시간을 501ms에서 125ms로
                          감소
                        </li>
                        <li>
                          RabbitMQ를 통한 비동기 처리로 처리량을
                          125.3req/sec에서 340.8req/sec로 개선
                        </li>
                        <li>
                          캐싱만 적용했을 때 성능 수치는 가장 좋았지만, 메시지
                          큐를 함께 사용하여 동시성 문제를 해결하고 안정성을
                          높이기 위해
                          <span style="font-weight: bold"
                            >최종적으로 캐싱과 메시지 큐를 함께 적용</span
                          >
                        </li>
                      </ul>
<br><br>

- [x] **하지은 : 대여/나눔 담당**<br>
• 대여/나눔 : 페이지당 물건 8개 출력<br>
• 추천 물건 목록: 추천 물건 캐러셀 출력(아이템 기반 협업 필터링 알고리즘 사용)<br>
• 카테고리, 상태 필터링 및 키워드 검색<br>
<img src="https://github.com/user-attachments/assets/a82bbb36-aee5-4e88-b9af-cc080b9fe70f" style="width: 100%">
<br><br>

## &#128204; 우리팀 깃 작업 규칙
**메인 : main**<br>
**브랜치 : member/ share/ sale/ club/ news**<br> 

**커밋 메세지 작성법**<br> 
제목은 태그와 이모지, 작업자 이름과 커밋 번호, 요약을 작성<br> 
내용은 작업에 대한 상세 설명을 작성<br> 
제목과 내용 사이에 Enter 공백<br> 
ex) 🧩feat :: (성현 #1) 채팅 기능 추가<br> 
      (공백)<br> 
      모임회원들끼리 채팅 기능 추가<br> 

**이모지 태그 설명**<br>
🗂️ project :: 프로젝트를 세팅한다.<br> 
⚙️ build :: 시스템 또는 외부 종속 파일에 영향을 미치는 설정을 변경<br> 
📑 docs :: 프로젝트 관련 문서 등을 추가/수정 (README.md 등)<br> 
🧩 feat :: 새로운 기능 추가<br> 
💦 chore :: build 관련, 패키지 설정 등 자잘한 작업 수행<br> 
🛠️ fix :: 기존 프로젝트의 버그 수정<br> 
❌ delete :: 파일 등을 삭제<br> 
🔙 revert :: 커밋을 롤백<br> 
🔗 merge :: 브랜치를 main 브랜치에 병합<br> 


<br><br>

## &#128546;  힘들었던 점
저희 프로젝트는 위치 기반 지역 커뮤니티 플랫폼을 개발하는 것이었고, 여기서 핵심은 사용자 위치 정보를 활용해 지역 커뮤니티를 효과적으로 연결하는 것이었습니다. 이 플랫폼에서 가장 중요한 부분은 위치 정보 데이터를 정확하고 효율적으로 처리하는 것이었습니다.

#### 데이터 활용 및 처리 과정<br>
저희는 국토교통부에서 제공하는 전국 법정동 오픈 API 데이터를 활용했습니다. 이 데이터에는 전국의 법정동 정보가 담겨 있었고, 총 49,874개의 행으로 구성되어 있었습니다. 이렇게 방대한 데이터를 다루는 것은 처음이라, 데이터 처리 과정에서 여러 가지 어려움이 있었습니다.

#### 가장 어려웠던 점: 데이터 가공<br>
특히 데이터 가공 과정이 가장 어려웠습니다.  API로부터 받은 데이터를 저희 플랫폼의 LOCATION 테이블 구조에 맞게 변환하는 작업이 필요했는데, 이 과정에서 데이터의 중복 제거와 데이터 형식 통일에 많은 시간이 들었습니다. 예상보다 까다로운 작업이었지만, 여러 번의 시도 끝에 데이터를 정리할 수 있었습니다. 이를 통해 저희 팀은 대규모 데이터를 효율적으로 처리하는 방법을 배웠고, 이러한 경험은 앞으로도 큰 도움이 될 것이라고 생각합니다.&#128563;&#128522;
<br><br><br>



## &#128173; 회고
<pre>🧡 강성현 : 배려 넘치고 팀워크도 좋고 일도 잘하는 팀원분들과 파이널 프로젝트를 함께할 수 있어 행운이었습니다! 
	    덕분에 좋은 경험을 얻고 갑니다. 감사합니다!</pre>

<pre>💚 김재식 : 훌륭한 팀원들과 팀 분위기 덕분에 프로젝트에만 집중할 수 있었습니다. 다양한 기능을 구현하면서 많은 것을
            배울 수 있었고, 나에게 부족한 부분을 보완할 수 있어서 뜻깊은 경험이었습니다. 모두 고생하셨습니다! </pre>

<pre>🩵 윤정해 : 정말 좋은 팀원분들과 마지막 프로젝트를 같이 할 수 있어서 행복하게 작업했습니다.
            프로젝트 과정에서 많이 배웠고, 잊지 못할 소중한 경험을 한 것 같습니다. 팀원분들 정말 감사합니다.&#128557; </pre>

<pre>&#128156; 하지은 : 훌륭한 팀을 만난 덕분에 많이 배웠고 멋지게 프로젝트를 마칠 수 있었습니다.
	    이슈나 에러에 대해 같이 토론하고 해결해가는 과정 속에서 협업의 의미와 가치를 다시 한번 느꼈습니다. 
            모두들 정말 고생 많으셨고 감사합니다!😍</pre> 

<br>

## &#127881; 수상내역
<img src="https://github.com/user-attachments/assets/a635f1ad-b497-41a4-904e-3078a2692f4a" style="width: 100%">
<br><br>
