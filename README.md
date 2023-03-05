### **🎵\[Meta4\] 그; 그림 (딥러닝 기반 작사 작곡 프로그램)🎼**

-   2022 컴퓨터공학과 졸업 프로젝트
-   더 자세한 내용은 아래 목차 4-2의 _문서_ 에서 확인하실 수 있습니다.

---

**제작 기간**: 2022.01.14~2021.11.07(85일)

-   상세 일정은 2-1 참고

**제작 인원**: 4명

-   20181045 컴퓨터공학과 강태영(PM)
-   20181008 컴퓨터공학과 박지인
-   20181030 컴퓨터공학과 신효정
-   20190119 컴퓨터공학과 김지민

**개발 방법론**: 애자일 - 스크럼

---

### **[목차]**

**1️⃣ 프로젝트 개요**

1.  팀/프로젝트 명
2.  프로젝트 소개/제안 배경
3.  적용 기술
4.  프로젝트 주요 기능/역할 분담

**2️⃣ 프로젝트 수행 내용**

1.  프로젝트 수행 일정
2.  메뉴 구성도/기능 처리도
3.  작품 구성도

**3️⃣ 프로젝트 관리 방법**

1.  개발 방법론
2.  제품 백로그/스프린트 백로그
3.  스크럼보드: freedcamp
4.  스프린트 추적
5.  번다운 차트
6.  스프린트 리뷰 회의
7.  스프린트 회고 회의
8.  기타 회의

**4️⃣ 프로젝트 결과물**

1.  웹페이지
2.  문서

**5️⃣ 느낀 점/아쉬운 점**

---

### **1️⃣ 프로젝트 개요**

**1-1. 팀/프로젝트 이름**

-   **팀 이름**: Meta4
    -  팀원 4명이 단합하여 노력으로 각자의 역량을 '초월(meta)'하는 작품을 만들어보자는 다짐을 담아
       meta4로 이름 지었습니다.
-   **프로젝트 이름**: 그;그림(딥러닝을 이용한 동요 작사 작곡 프로그램)


**1-2. 프로젝트 소개/제안 배경**

-   코로나 장기화로 인해 외부와의 접촉이 줄어들어 장시간 집에서 시간을 보내는 혹은 혼자 시간을 보내야 하는     아동들을 위한 음악 창작 활동 프로그램을 제작하기로 하였습니다. 
-   사용자가 그림을 그리면 그림에서 키워드를 추출해 키워드와 관련된 동요가 작사되고, 이 키워드에 해당하는 
    분위기의 새로운 동요가 작곡될 수 있도록 합니다. 최종적으로 제작된 동요를 메타버스 환경에서 공유하고, 다     른 사용자의 작품을 확인할 수 있습니다.
-   '음악' 중에서도 '동요' 데이터를 기반으로 작사, 작곡을 할 수 있도록 하여  아동의 심리적 안정 및 창의성     발달에 기여하고, 교육자와 교육 컨텐츠 생산/소비자에게 그림, 음악 등 다양한 컨텐츠를 제공하여 질 좋은
    미디어 컨텐츠 산업에 기여합니다. 

**1-3. 적용 기술**

-   UI : html5, css3, js 
-   Server : Django 
-   DB : MySQL
-   작사 : KoGPT2
-   키워드 분류 : quickdraw dataset
-   작곡 : GAN
-   메타버스 : three.js
-   배포 : aws EC2와 S3 이용해 배포



**1-4. 프로젝트 주요 기능**

| 구분 | 기능 | 설명 | 인원수/담당자 |
| --- | --- | --- | --- |
| 1 | 회원가입, 로그인  |  사용자 회원가입, 로그인 | 1/박지인 |
| 2 |  사용자가 그림을 그릴 수 있는 캔버스 기능 | 사용자가 자유롭게 그림을 그릴 수 있도록 캔버스 기능을 구현함. 다시 그림을 그리고 싶을 때에는 새로 그릴 수 있도록 전체 삭제 기능도 추가. | 1/강태영 |
| 3 |  사용자의 그림 인식 및 키워드 분류 | Google Creativelab의 quick draw dataset을 기반으로 ml5.js의 doodlenet api를 이용하여 사용자가 어떤 그림을 그렸는지를 7개의 키워드로 추출함. | 2/강태영, 김지민 |
| 4 | 키워드를 이용한 작사 기능 | 작사는 KoGPT2 모델을 사용하여 200개의 동요 가사 데이터를 파인튜닝한 후 추출된 키워드와 연관된 새로운 가사가 생성되게 함.  | 1/박지인 |
| 5 | 동요 데이터셋을 기반으로 한 작곡 기능 | 작곡은 GAN 알고리즘을 이용해 200개의 동요 가사 데이터를 7개의 카테고리로 분류한 후, 각 카테고리에 해당하는 동요 데이터를 학습시켜 키워드에 맞는 새로운 동요가 생성될 수 있도록 함.  | 1/신효정| 
| 6 | 메타버스 환경 구성 | 메타버스 환경은 three.js를 이용하여 Scene, Geometry, Mesh, Light, Shadow의 값을 직접 렌더링하여 구축함. 또한 Blender에서 3D 입체 캐릭터를 생성해 gltf 로더를 사용하여 화면에 나타나도록 하였으며, 메타버스 내에 떠있는 그림을 클릭하면 팝업창으로 그림에 해당되는 동요를 감상할 수 있다. | 1/김지민|  

---

### **2️⃣ 프로젝트 수행 내용**

**2-1. 프로젝트 수행 일정**
# ![수행일정](https://ifh.cc/g/S6XKtJ.jpg)

**2-2. 메뉴 구성도/기능 처리도**
##### 메뉴 구성도
![메뉴구성도](https://ifh.cc/g/H1Fq41.jpg)

##### 기능 처리도
![기능처리도](https://ifh.cc/g/Akl3pv.png)

**2-3. 작품 구성도**
# ![작품구성도](https://ifh.cc/g/NnrgnX.jpg)

---

### **3️⃣ 프로젝트 관리 방법**

**3-1. 개발 방법론**

-   애자일 모델의 스크럼
-   24일에 걸쳐 총 1번의 스프린트로 진행 

**3-2. 제품 백로그/스프린트 백로그**
- [전체 보기](https://docs.google.com/spreadsheets/d/14ES1psx6KkkMwHEBY1Dvnb17dqddb_smVlrbOsLRGjg/edit?usp=sharing)  
![스프린트_주기_정하기](https://user-images.githubusercontent.com/61674991/146736233-50eb62ad-9ec1-4194-9029-e2fe10104c2a.JPG)
![백로그_스프린트백로그](https://user-images.githubusercontent.com/61674991/146736242-f93f6f3f-c3f8-4f5d-874f-92a84614744e.JPG)


**3-3. 스크럼보드: freedcam**
- ![스크럼_보드](https://user-images.githubusercontent.com/61674991/146736658-b9c48b35-f887-4135-bf7e-13c6b2d6f9ed.png)


**3-4. 스프린트 추적**
- [전체 보기](https://docs.google.com/spreadsheets/d/1HH5JimniXAJBkuMiNddJ1uYC7PEFowd13S3PJkiKeLQ/edit?usp=sharing)
![스프린트_추적](https://user-images.githubusercontent.com/61674991/146736787-150c49c0-300b-4339-b8c7-bc5fa864774f.JPG)


**3-5. 번다운 차트**
- ![번다운차트](https://user-images.githubusercontent.com/61674991/146736921-7fb3a5fc-4658-463f-aec5-6e4256488dea.JPG)


**3-6. 스프린트 리뷰 회의**
- [스프린트 리뷰 회의 보기: 스프레드 시트](https://docs.google.com/spreadsheets/d/1NnA6-j_QBgJbPciR7R26sk20E8wAqijMQrnW8e5lUFM/edit?usp=sharing)
    -   ※ 개발이 끝났기 때문에 다음 스프린트를 위한 프로덕트 백로그는 작성하지 않음.

**3-7. 스프린트 회고 회의**
- [스프린트 회고 회의 보기: 잼보드](https://jamboard.google.com/d/1RLVjMjAgUIQ5BN8QwhFniixicGM5GryR56KQjlVfvOw/edit?usp=sharing)

**3-8. 기타 회의**

-   일일 스크럼회의: 실행하기 어려워 주 2회 회의로 대체
-   주 2회 회의: 매주 화요일 17시(줌 소회의실)/금요일 21시(구글 미트)

---

### **4️⃣ 프로젝트 결과물**

**4-1. 웹페이지**
![결과물_사진1](https://user-images.githubusercontent.com/61674991/146884243-73614ab3-90fb-4603-b1a4-68a4534baa48.png)
![결과물_사진2](https://user-images.githubusercontent.com/61674991/146884250-b7f3c68d-5648-4176-aa25-309fe5488bd4.png)


**4-2. 문서**

1.  [수행계획서](https://docs.google.com/document/d/1AkL9s3A_UnxywnPjAKztkgjIgS64OijKaWDJ1Hi7Ffg/edit?usp=sharing)
2.  [회의록](https://docs.google.com/spreadsheets/d/1efsfv7KjGN_QKApZw-XoXTU3IxGY87p0i-u8KbN0CNs/edit?usp=sharing)
3.  [요구사항 분석서](https://docs.google.com/document/d/1I1g1d20tljeA-jKuOKwjwD1y9Z0XOjxs3nXp4SZVn1Q/edit?usp=sharing)
4.  [SW 설계서](https://docs.google.com/document/d/1PW3zdLUbfdJqbOmY5vjDiCHoh2SDNBWCFft_WrgDOz4/edit?usp=sharing)
5.  [완료 보고서: ppt](https://docs.google.com/presentation/d/1fuGfd2FiFVYRRE6KpK4OjSg4vDu2f4wb/edit?usp=sharing&ouid=115616156054822868753&rtpof=true&sd=true)
6.  [완성된 SW: 구름 컨테이너 링크](https://goor.me/JN5AQ)

---

### **5️⃣ 느낌 점/아쉬운 점**

-   졸업 프로젝트 아이디어를 정하면서, 기존에 만들어지지 않은, 새로운 기획 아이디어를 찾느라 2달에 걸쳐 팀원들과 
    각종 자료조사 및 회의를 진행했는데 덕분에 좋은 주제로 프로젝트를 진행할 수 있어서 좋았고, 한이음에서 아이디어를
    인정받아 작품을 출원할 수 있는 기회를 얻어서 뜻깊은 경험을 할 수 있었다. 
-   1년전에 기획했던 대로 프로젝트가 잘 마무리되어 기쁘고, 여러 시행착오를 팀원들과 겪으면서 스스로 많이 배울 수 있는 
    시간이었다.
-   혼자하면 버거웠을 프로젝트를 팀원들과 같이 고군분투하면서 잘 마무리할 수 있어 다행이고, 지라와 노션을 이용해
    프로젝트 일정 관리를 한 것이 큰 도움이 되었다.
-   되도록 매주 회의를 진행하고, 진행 상황을 보고 하면서 프로젝트를 진행한 것이 지금의 결과를 만들었다고 생각한다.
    1년 동안 고생한 팀원들에게 박수를 보내고 싶다.

