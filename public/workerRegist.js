/* eslint-disable no-restricted-globals */
function regist() {
  if (
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window
  ) {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(async (registration) => {
        console.log("워커 연결");
        console.log("push 가능");
        registration.showNotification("test", {});
        const subscription = await registration.pushManager.getSubscription();
      });
  }
}

function askForNPerm() {
  Notification.requestPermission(function (result) {
    console.log("User choice", result);
    if (result !== "granted") {
      console.log("No notification permission granted!");
    }
  });
}

regist();
askForNPerm();
// const sCacheName = "hello-pwa"; // 캐시 제목 설정
// const aFilesToCache = ["./", "./index.html", "./manifest.json"]; // 캐시 할 파일 선언

// // 서비스 워커 설치하고 캐시 파일 저장
// self.addEventListener("install", (event) => {
//   console.log("서비스 워커 설치");
//   event.waitUntil(
//     // 서비스 워커가 installed 되기 전까지 pre-cache 상태로 대기
//     // 캐시에 파일을 저장하기 위해 사용
//     caches.open(sCacheName).then((cache) => {
//       console.log("파일 캐시 저장");
//       return cache.addAll(aFilesToCache);
//     })
//   );
// });

// // 고유번호 할당받은 서비스 워커 작동
// self.addEventListener("active", (event) => {
//   console.log("서비스 워커 작동 시작");
// });

// // 데이터 요청을 받으면 네트워크 또는 캐시에서 찾아 반환
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     // 결과값을 준비할 때까지 네트워크 요청 일시 중단
//     caches
//       .match(event.request) // 캐시 저장소 검색
//       .then((response) => {
//         if (!response) {
//           console.log("네트워크에서 데이터 요청", event.request);
//           return fetch(event.request);
//         }
//         console.log("캐시에서 데이터 요청", event.request);
//         return response;
//       })
//       .catch((error) => console.log(error))
//   );
// });

// 서비스 워커 생명 주기 : install -> activate -> fetch
// install : 서비스 워커 설치 단계
// install -> installing -> installed

// activate : 서비스 워커 새로운 내용으로 교채

// fetch : 오프라인 전환할 때 동작
// 새로고침할 때가 대표적인 예시, 온라인 상태에서는 서버에서 오프라인 상태에서는 캐시에서 가져옴

// 내가 사용하는 브라우저가 서비스 워커를 지원하는 지 확인하려면 https://mobi
