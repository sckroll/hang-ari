# Hang-ari

항아리 (Hang-ari) - 한기대 동아리를 위한 커뮤니티 사이트

_주의: 토이 프로젝트로 만든 웹 사이트입니다. 실제로 운영되는 커뮤니티가 아닙니다!_

## 개요

2018년에 학부 프로젝트로 만든 웹 사이트를 리메이크한 개인 프로젝트입니다. 이름의 유래는 한국기술교육대학교(한기대, KOREATECH)의 동아리를 위한 커뮤니티라는 의미에서 *한*기대 + *동아리*를 합쳐서 지었습니다.

리메이크를 하게 된 계기는 클라우드 폴더를 정리하던 중 과거에 만든 홈페이지의 보고서와 소스 코드를 보게 되었고, 지금에 비하면 상당히 수준 낮은 코드에 미처 구현하지 못한 부분이 너무 많아 지금 사용하고 있는 기술 스택으로 개발한다면 더 잘 만들 것 같다는 생각이 들었기 때문입니다.

프로젝트를 진행하면서 한기대 뿐만 아니라 전국에 있는 대학교의 동아리가 참여할 수 있는 커뮤니티 사이트로 발전시키면 어떨까 하는 생각이 들었지만, 토이 프로젝트치고는 스케일이 너무 커질 것 같아 그만두었습니다. (물론 만든다고 해도 실제로 운영할 생각은 없습니다...)

## 사용한 기술 스택

기존에는 **Apache + MySQL + PHP**로 웹 사이트를 구축했지만, 별도로 배포하지 않았습니다. 새롭게 리메이크된 사이트는 **Node.js + Express + MongoDB**로 백엔드를 구축하고 프론트엔드는 **Vue**를 사용하였습니다.

## 서버 설치 및 실행 방법

```bash
# 의존성 설치
$ npm install

# development 모드로 서버 실행
$ npm run dev

# production 모드로 서버 실행
$ npm run start
```
