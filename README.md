## **🎵\[Meta4\] 그; 그림 (딥러닝 기반 작사 작곡 프로그램)🎼**

-   2022 컴퓨터공학과 졸업 프로젝트🤗
-   더 자세한 내용은 아래 목차 4-2의 _문서_ 에서 확인하실 수 있습니다.😊

---

**제작 기간**: 2022.01.2~2022.11.17

-   상세 일정은 2-1 참고

**제작 인원**: 4명

-   _20181045 컴퓨터공학과 강태영(PM)_
-   _20181008 컴퓨터공학과 박지인_
-   _20181030 컴퓨터공학과 신효정_
-   _20190119 컴퓨터공학과 김지민_

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
3.  스프린트 리뷰 회의
4.  기타 회의

**4️⃣ 프로젝트 결과물**

1.  웹페이지
2.  문서

**5️⃣ 느낀 점/아쉬운 점**

<br/>

---

### **1️⃣ 프로젝트 개요**

<br/>

**1-1. 팀/프로젝트 이름✨**

-   **팀 이름**: Meta4
    -  팀원 4명이 단합하여 노력으로 각자의 역량을 '초월(meta)'하는 작품을 만들어보자는 다짐을 담아
       meta4로 이름 지었습니다.
-   **프로젝트 이름**: 그;그림(딥러닝을 이용한 동요 작사 작곡 프로그램)

<br/>

**1-2. 프로젝트 소개/제안 배경💡**

-   코로나 장기화로 인해 외부와의 접촉이 줄어들어 장시간 집에서 시간을 보내는 혹은 혼자 시간을 보내야 하는 아동들을 위한 음악 창작 활동 프로그램을 제작하기로 하였습니다. 
-   사용자가 그림을 그리면 그림에서 키워드를 추출해 키워드와 관련된 동요가 작사되고, 이 키워드에 해당하는 분위기의 새로운 동요가 작곡될 수 있도록 합니다. 
    최종적으로 제작된 동요를 메타버스 환경에서 공유하고, 다른 사용자의 작품을 확인할 수 있습니다.
-   '음악' 중에서도 '동요' 데이터를 기반으로 작사, 작곡을 할 수 있도록 하여  아동의 심리적 안정 및 창의성 발달에 기여하고, 교육자와 교육 컨텐츠 생산/소비자에게 그림,
    음악 등 다양한 컨텐츠를 제공하여 질 좋은 미디어 컨텐츠 산업에 기여합니다. 

<br/>

**1-3. 적용 기술🛠**

-   UI : html5, css3, js 
-   Server : Django 
-   DB : MySQL
-   작사 : KoGPT2
-   키워드 분류 : quickdraw dataset
-   작곡 : GAN
-   메타버스 : three.js
-   배포 : aws EC2와 S3 이용해 배포

<br/>

**1-4. 프로젝트 주요 기능**

| 구분 | 기능 | 설명 | 인원수/담당자 |
| :-- | :--- | :---- |:--- |
| 1 | 회원가입, 로그인  |  사용자 회원가입, 로그인 | 1/박지인 |
| 2 |  사용자가 그림을 그릴 수 있는 캔버스 기능 | 사용자가 자유롭게 그림을 그릴 수 있도록 캔버스 기능을 구현함.<br>다시 그림을 그리고 싶을 때에는 새로 그릴 수 있도록 전체 삭제 기능도 추가. | 1/강태영 |
| 3 |  사용자의 그림 인식 및 키워드 분류 | Google Creativelab의 quick draw dataset을 기반으로 ml5.js의 doodlenet api를 이용하여 사용자가 어떤 그림을 그렸는지를 7개의 키워드로 추출함. | 2/강태영, 김지민 |
| 4 | 키워드를 이용한 작사 기능 | 작사는 KoGPT2 모델을 사용하여 200개의 동요 가사 데이터를 파인튜닝한 후 추출된 키워드와 연관된 새로운 가사가 생성되게 함.  | 1/박지인 |
| 5 | 동요 데이터셋을 기반으로 한 작곡 기능 | 작곡은 GAN 알고리즘을 이용해 200개의 동요 가사 데이터를 7개의 카테고리로 분류한 후 각 카테고리에 해당하는 동요 데이터를 학습시켜 키워드에 맞는 새로운 동요가 생성될 수 있도록 함.  | 1/신효정| 
| 6 | 메타버스 환경 구성 | 메타버스 환경은 three.js를 이용하여 Scene, Geometry, Mesh, Light, Shadow의 값을 직접 렌더링하여 구축함.<br>또한 Blender에서 3D 입체 캐릭터를 생성해 gltf 로더를 사용하여 화면에 나타나도록 하였으며,메타버스 내에 떠있는 그림을 클릭하면 팝업창으로 그림에 해당되는 동요를 감상할 수 있다. | 1/김지민|  
| 7 | AWS를 이용한 서버 배포 | AWS EC2와 RDS를 활용해 서버 최종 배포를 진행함.   | 1/신효정| 
<br/>

---

### **2️⃣ 프로젝트 수행 내용**

<br/>

**2-1. 프로젝트 수행 일정**
<br/>
![image](https://github.com/duksung-meta4/meta4music_final/assets/49816869/65f9b214-0f2f-4165-b0e0-60b49bad89b9)

**2-2. 메뉴 구성도/기능 처리도**
##### 메뉴 구성도
<br/>

![image](https://github.com/duksung-meta4/meta4music_final/assets/49816869/864d88a7-e079-4bf1-9ab0-5ef26b5ab088)


##### 기능 처리도
<br/>

![image](https://github.com/duksung-meta4/meta4music_final/assets/49816869/c47e7350-e7e8-46df-9d36-72ca50c7f2e8)

**2-3. 작품 구성도**
<br/>

![image](https://github.com/duksung-meta4/meta4music_final/assets/49816869/8a81feb8-65e1-4b88-ab33-d3c703634b58)


---

### **3️⃣ 프로젝트 관리 방법** 

<br/>

**3-1. 개발 방법론**

-   애자일 모델의 스크럼
-   8개월에 걸쳐 총 16번의 스프린트로 진행 

<br/>

**3-2. 제품 백로그/스프린트 백로그**
- [전체 보기](https://duksung-meta4.atlassian.net/jira/software/projects/SYAW/boards/2/roadmap)  
![스프린트_주기_정하기](https://user-images.githubusercontent.com/62791327/222943898-e7f1ce40-eb69-4422-b5a4-a0328f4dcad2.png)
![백로그_스프린트백로그](https://user-images.githubusercontent.com/62791327/222943891-d6fbccf5-f9da-4143-93d3-b49c412f7c28.png)

<br/>

**3-3. 스프린트 리뷰 회의**

<img src="https://user-images.githubusercontent.com/62791327/222944691-ad4c7387-76ee-4d00-a547-5531c19c473d.png" width="400" height="500"/>

<br/>

**3-4. 기타 회의**

-   일일 스크럼회의: 각자의 수업시간과 일정으로 인해 실행하기 어려워 주 1회 회의로 대체
-   주 1회 회의: 매주 수요일 21시(줌 소회의실)
-   필요에 따라 추가 회의를 진행하거나 방학에는 회의 횟수를 늘림.
<!--# ![정기회의](https://user-images.githubusercontent.com/62791327/222944541-8646b304-30c5-4512-893f-afe9aa6f89ab.png)-->
<img src="https://user-images.githubusercontent.com/62791327/222944541-8646b304-30c5-4512-893f-afe9aa6f89ab.png" width="400" height="500"/>

-   교수님 및 멘토님과 정기적인 회의 및 피드백을 진행함

# ![교수님, 멘토님과의 정기회의 및 피드백](https://user-images.githubusercontent.com/62791327/222946555-a54c9758-7e58-4753-90e3-ab7aa3dc2c2c.png)

<br/>

---

### **4️⃣ 프로젝트 결과물💛**

<br/>

**4-1. 웹페이지**

- 메인화면

    ![메인화면](https://user-images.githubusercontent.com/62791327/222946651-f9afb121-ba7d-438d-9d71-4e49025fbb7c.png)

- 그림 + 작사 화면

    ![그림_작사_화면](https://user-images.githubusercontent.com/62791327/222946928-0238429b-7258-4654-992d-228a019f427d.png)

- 작곡화면

    ![작곡화면](https://user-images.githubusercontent.com/62791327/222947104-41140c25-da6f-4104-b797-4d5d8b7f7afb.png)

- 그림+작사+작곡 합본 화면

    ![그림_작사_작곡_합본_화면](https://user-images.githubusercontent.com/62791327/222948429-7f1ea8f6-53c0-4ded-8651-eeaafd849ba3.png)

- 메타버스 화면

    ![메타버스_화면](https://user-images.githubusercontent.com/62791327/222947394-37e7ff0f-3749-4979-ab9e-5d669e2db38e.JPEG)

<br/>

**4-2. 문서📑**

1.  [제안서](https://docs.google.com/document/d/1h4JVXBmmLBH2FCbAOcV8ftNqSrIIc_rAxMoevZ9L8Hg/edit?usp=sharing)
2.  [회의록](https://adaptive-vest-8c5.notion.site/Meeting-Notes-39ac776c462447eba5da2b85041fc10d)
3.  [완료 보고서: ppt](https://docs.google.com/presentation/d/1wbOFrYzECjc4Hu5ss2a82KUVMvNVUfRp/edit#slide=id.p1)
4.  [결과 보고서: pdf](https://drive.google.com/file/d/1Sqt32jIxi0Qay1dHJLrKiAcb8cU4ztzL/view?usp=share_link) 
5.  [완성된 결과물: 유튜브 링크](https://www.youtube.com/watch?v=-0EPXT0xlYw)
6.  출원 정보 :

![image](https://github.com/duksung-meta4/meta4music_final/assets/49816869/21c6eabc-b109-499e-8490-36ca76f5f855)


<br/>

---


### **5️⃣ 느낌 점/회고🙄**

-   졸업 프로젝트 아이디어를 정하면서, 기존에 만들어지지 않은, 새로운 기획 아이디어를 찾느라 2달에 걸쳐 팀원들과 각종 자료조사 및 회의를 진행했는데
    덕분에 좋은 주제로 프로젝트를 진행할 수 있어서 좋았고, 중간에 라이브러리 오류와 함께 작사 모델(GPT3)의 비용문제로 프로젝트 틀과 모델을 교체하는 등의
    어려움도 있었지만 팀원들과 방학동안 잘 해결해서 다행이었다.
-   1년전에 기획했던 대로 프로젝트가 잘 마무리되어 기쁘고, 여러 시행착오를 팀원들과 겪으면서 스스로 많이 배울 수 있는 시간이었다. 
    더불어 한이음에서 작품을 출원할 수 있는 기회를 얻게 되어 기쁘다. 
-   혼자하면 버거웠을 프로젝트를 팀원들과 같이 고군분투하면서 잘 마무리할 수 있어 다행이고, 지라와 노션을 이용해 프로젝트 일정 관리를 한 것이 큰 도움이 되었다.
-   되도록 매주 회의를 진행하고, 진행 상황을 보고 하면서 프로젝트를 진행한 것이 지금의 결과를 만들었다고 생각한다.
    1년 동안 고생한 팀원들에게 박수를 보내고 싶다.

