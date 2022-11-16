import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'GLTFLoader';
import gsap from 'https://cdn.skypack.dev/@recly/gsap';

import {
  MeshBasicMaterial,
  DoubleSide,
  Mesh,
} from 'https://cdn.skypack.dev/three';

export class ImagePanel {
  constructor(info) {
    const texture = info.textureLoader.load(info.imageSrc);
    const material = new MeshBasicMaterial({
      map: texture,
      side: DoubleSide,
    });

    this.mesh = new Mesh(info.geometry, material);
    this.mesh.position.set(info.x, info.y, info.z);
    this.mesh.lookAt(0, 0, 0);

    // Sphere 상태의 회전각을 저장
    this.sphereRotationX = this.mesh.rotation.x;
    this.sphereRotationY = this.mesh.rotation.y;
    this.sphereRotationZ = this.mesh.rotation.z;

    //this.id = info.id;  // imagepanel 생성시 key값으로 id값 설정 // id값은 imageurl 반복문에서 넣어줌. 그곳에서 imagepanels 배열 생성
    info.scene.add(this.mesh);
  }
}

// Renderer
const textureLoader = new THREE.TextureLoader();
const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

// Scene
const scene = new THREE.Scene();

const bgTexture = textureLoader.load('/static/img/space_metabackground.jpg');
scene.background = bgTexture;

// Camera
const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 4;
scene.add(camera);

// Light
const ambientLight = new THREE.AmbientLight("white", 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("white", 1);
directionalLight.position.x = 1;
directionalLight.position.z = 2;
scene.add(directionalLight);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// gltf loader
const gltfloader = new GLTFLoader();
let mixer;

gltfloader.load(
	'static/model/metamong.glb',
	gltf => {
		const metamongMesh = gltf.scene.children[0];
        metamongMesh.scale.set(0.2, 0.2, 0.2);
        metamongMesh.rotation.y = -2;
        scene.add(metamongMesh);

        // 애니메이션
        mixer = new THREE.AnimationMixer(metamongMesh);
        const actions = [];
        console.log(gltf.animations);
        actions[0] = mixer.clipAction(gltf.animations[0]);
        // actions[1] = mixer.clipAction(gltf.animations[1]);
        actions[0].repetitions = 1;
        actions[0].clampWhenFinished = true;
        actions[0].play();
	}
)

// Mesh
const planeGeometry = new THREE.PlaneGeometry(0.3, 0.3);

// Points
const sphereGeometry = new THREE.SphereGeometry(1, 8, 8);
const spherePositionArray = sphereGeometry.attributes.position.array;

const randomPositionArray = [];
for (let i = 0; i < spherePositionArray.length; i++) {
  randomPositionArray.push((Math.random() - 0.5) * 10);
}

// sphereMesh의 x,y,z값을 다 찍어 본 결과 중복값이 존재 했음
// postionArraySet은 [[x1,y1,z1], [x2,y2,z2], ..] 이렇게 x, y, z값을 2차원 배열로 만들어 준 것
const postionArraySet = [];
for(let i=0; i<spherePositionArray.length; i+=3) {
  const cells = [];
  for(let j=i; j<i+3; j++) {
    cells.push(spherePositionArray[j]);
  }
  postionArraySet.push(cells);
}

// 2차원 배열 중복 제거
// 위에 만든 배열에서 이제 중복값을 찾음
// [[0,1,0], [0,1,0], [1,1,1]..] 이런 배열이 있다고 가정하면 함수를 돌면서 중복값을 삭제함
function removeDup(arr) {
  return [...new Set(arr.join("|").split("|"))]
    .map((v) => v.split(","))
    .map((v) => v.map((a) => +a));
}
// 중복값이 다 삭제된 배열
let uniqueArr = removeDup(postionArraySet);
// console.log(uniqueArr);

// 2차원으로 바꾼 배열을 다시 1차원 배열로 풀어줌
const arr2 = uniqueArr.reduce(function (acc, cur) {
  return acc.concat(cur);
});
// console.log(arr2);

// 여러 개의 Plane Mesh 생성
const imagePanels = [];
let imagePanel;
const dup = [];

// dup 배열은 겹치는 한 줄(메타몽 우리 기준 왼팔)의 resultImg를 가짐
// ex) i가 3, 27일 때 처음 겹치는데 3이 가진 이미지를 27 이미지 패널로 넣는 것
for(let i = 0; i < 195; i += 3) {
  const num = i / 3;
  const bigNum = num % imageurl.length;
  if(i % 27 == 3) {
    dup.push(bigNum);
  }
}
dup.length = dup.length -1;
console.log(dup);

for (let i = 0; i < 195; i += 3) {
  // const randnum = Math.ceil(Math.random() * imageurl.length) - 1;
  
  // num: i가 3씩 증가하고 있는 반복문이라 0, 1, 2, 3, .. 으로 바꾸는 것
  const num = i / 3;

  // bigNum: resultImg에 있는 이미지 개수만큼만 구에 뜨도록 계산
  // 이게 없으면 검정 패널이 뜸 (이미지 not found)
  const bigNum = num % imageurl.length;

  console.log("num: "+num + " bigNum: "+bigNum);

  // i가 27의 배수(27, 54, 81,..)일 때 겹치는 현상 발생
  if(i != 0 && i % 27 == 0) {
    // mock: 겹치는 7장(한 줄은 이미지 7장) 중 몇 번째인지
    const mock = (i / 27)-1;

    // dup: 겹치는 이미지가 resultImg에서 몇 번째인지 출력하는 배열. [1,0,3,9,4] => 겹치는 첫 줄은 resultImg 폴더 내 1번째 이미지. 두 번째 줄은 resultImg 폴더 내 0번째 이미지. 이런 뜻
    // specNum: resultImg내 몇 번째 이미지를 불러올 건지
    let specNum = dup[mock];
    console.log("specNum: "+specNum+imageurl[specNum]);
    
    imagePanel = new ImagePanel({
      textureLoader,
      geometry: planeGeometry,
      scene,
      imageSrc: imageurl[specNum],
      x: arr2[i],
      y: arr2[i + 1],
      z: arr2[i + 2],
    });
    imagePanels.push(imagePanel);
  }

  else {
    imagePanel = new ImagePanel({
      textureLoader,
      scene,
      geometry: planeGeometry,
      imageSrc: imageurl[bigNum],
      x: arr2[i],
      y: arr2[i + 1],
      z: arr2[i + 2],
    });
    imagePanels.push(imagePanel);
  }

  // console.log("나는 "+i +"번째 " +"x: " + spherePositionArray[i] + " y: "+spherePositionArray[i+1]+" z: "+spherePositionArray[i+2]);
}
console.log(imagePanels[10]);

// Raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// 그리기
const clock = new THREE.Clock();

function draw() {
  const delta = clock.getDelta();

  // if (mixer) mixer.update(delta);

  controls.update();

  renderer.render(scene, camera);
  renderer.setAnimationLoop(draw);
  // renderer.setAnimationLoop( animation );
}

function checkIntersects() {
  if (mouseMoved) return;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  for (const item of intersects) {
    //클릭하는 그림에 따라 해당하는 id값 반환
    for(let i = 0; i < imageurl.length; i++){
      const panel = imagePanels[i].mesh.material.map.source.data.attributes.src.value;
      const it = item.object.material.map.source.data.attributes.src.value;
      console.log(i+1 +"번째 "+panel + " 랑 " + it);
      // console.log(i +"번째 ");

      if (panel == it){
        // console.log(i);
        showPopup(i);
      }
    }
    break;
  }
}


// 팝업 띄우기
function showPopup(i) {

  document.getElementById("popup_layer").style.display = "block";
  //for(let i = 0; i < imageurl.length; i++) {
  document.getElementById("userid").innerHTML = templ3[i] + "님이 만든 작품입니다.";
  let temp_textarea = templ1[i]
  let flower = temp_textarea.replaceAll(/[0-9]/g, "");
  flower = flower.replaceAll(/(?:\\r\\n|\\r|\\n|\\)/g , "&#10;");
  flower = flower.replaceAll('&lt;unk&gt;', "");

  flower = flower.replaceAll(/[a-z]/g, '');
  flower = flower.replaceAll(/[A-Z]/g, '');
  
  document.getElementById("lyrics2").innerHTML = flower;
  document.getElementById("midiplayer").src = '/static/'+ templ2[i];
  //}
  //document.getElementById("lyrics2").innerHTML = templ1[Math.floor(Math.random() * templ1.length)];

}

//팝업 닫기
const btnPopClose = document.getElementById("btnPopClose");
btnPopClose.addEventListener("click", function () {
  document.getElementById("popup_layer").style.display = "none";
});

function setSize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}

function setShape(e) {
  const type = e.target.dataset.type;
  let array;

  switch (type) {
      case 'random':
          array = randomPositionArray;
          break;
      case 'sphere':
          array = arr2;
          break;
  }

  for (let i = 0; i < imagePanels.length; i++) {
      // 위치 이동 
      gsap.to(
          imagePanels[i].mesh.position,
          {
              duration: 2,
              x: array[i * 3],
              y: array[i * 3 + 1],
              z: array[i * 3 + 2],
          }
      );

      // 회전
      if (type === 'random') {
          gsap.to(
              imagePanels[i].mesh.rotation,
              {
                  duration: 2,
                  x: 0,
                  y: 0,
                  z: 0
              }
          );
      } else if (type === 'sphere') {
          gsap.to(
              imagePanels[i].mesh.rotation,
              {
                  duration: 2,
                  x: imagePanels[i].sphereRotationX,
                  y: imagePanels[i].sphereRotationY,
                  z: imagePanels[i].sphereRotationZ
              } 
          )
      }
  }
}

// Animation
// function animation( time ) {
//     for (let i = 0; i < imagePanels.length; i++) {
//         imagePanels[i].position.x = time / 2000;
//         imagePanels[i].position.y = time / 1000;
//     }

//     renderer.render( scene, camera );

// }

// 버튼
const btnWrapper = document.createElement("div");
btnWrapper.classList.add("btns");

const randomBtn = document.createElement("button");
randomBtn.dataset.type = "random";
randomBtn.style.cssText =
  "position: absolute; left: 30px; top: 30px; color: #F45866;";
randomBtn.innerHTML = "Random";
btnWrapper.append(randomBtn);

const sphereBtn = document.createElement("button");
sphereBtn.dataset.type = "sphere";
sphereBtn.style.cssText =
  "position: absolute; left: 30px; top: 70px; color: #F45866;";
sphereBtn.innerHTML = "Sphere";
btnWrapper.append(sphereBtn);

document.body.append(btnWrapper);

randomBtn.style.backgroundColor = "white";
randomBtn.style.border = "2px #F45866";
randomBtn.style.borderRadius = "5px";
randomBtn.style.padding = "5px";
sphereBtn.style.backgroundColor = "white";
sphereBtn.style.border = "2px #F45866";
sphereBtn.style.borderRadius = "5px";
sphereBtn.style.padding = "5px";

// 이벤트
btnWrapper.addEventListener("click", setShape);
randomBtn.addEventListener("mouseover", function () {
  randomBtn.style.cssText =
    "position: absolute; left: 30px; top: 30px; color: white;";
  randomBtn.style.backgroundColor = "#F45866";
  randomBtn.style.border = "2px #F45866";
  randomBtn.style.borderRadius = "5px";
  randomBtn.style.padding = "5px";
});
randomBtn.addEventListener("mouseout", function () {
  randomBtn.style.cssText =
    "position: absolute; left: 30px; top: 30px; color: #F45866;";
  randomBtn.style.backgroundColor = "white";
  randomBtn.style.border = "2px #F45866";
  randomBtn.style.borderRadius = "5px";
  randomBtn.style.padding = "5px";
});
sphereBtn.addEventListener("mouseover", function () {
  sphereBtn.style.cssText =
    "position: absolute; left: 30px; top: 70px; color: white;";
  sphereBtn.style.backgroundColor = "#F45866";
  sphereBtn.style.border = "2px #F45866";
  sphereBtn.style.borderRadius = "5px";
  sphereBtn.style.padding = "5px";
});
sphereBtn.addEventListener("mouseout", function () {
  sphereBtn.style.cssText =
    "position: absolute; left: 30px; top: 70px; color: #F45866;";
  sphereBtn.style.backgroundColor = "white";
  sphereBtn.style.border = "2px #F45866";
  sphereBtn.style.borderRadius = "5px";
  sphereBtn.style.padding = "5px";
});
window.addEventListener("resize", setSize);
canvas.addEventListener("click", (e) => {
  // raycaster를 사용하려면 -1 ~ 1 로 좌표를 바꿔 줘야 함. 가운데가 0.
  mouse.x = (e.clientX / canvas.clientWidth) * 2 - 1;
  mouse.y = -((e.clientY / canvas.clientHeight) * 2 - 1);
  // console.log(mouse);
  checkIntersects();
});

// Drag 클릭 방지
let mouseMoved; // 마우스를 드래그 했는지 true false
let clickStartX;
let clickStartY;
let clickStartTime;
canvas.addEventListener('mousedown', e => {
  clickStartX = e.clientX;
  clickStartY = e.clientY;
  clickStartTime = Date.now();
});
canvas.addEventListener('mouseup', e => {
  const xGap = Math.abs(e.clientX - clickStartX);
  const yGap = Math.abs(e.clientY - clickStartY);
  const timeGap = Date.now() - clickStartTime;

  if (
      xGap > 5 ||
      yGap > 5 ||
      timeGap > 500
  ) {
      this.mouseMoved = true;
  } else {
      this.mouseMoved = false;
  }
});

draw();