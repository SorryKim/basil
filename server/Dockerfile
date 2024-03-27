# 베이스 이미지 선택
FROM node:14

# 앱 디렉토리 생성
WORKDIR /usr/src/app

# 패키지 파일 복사
COPY package*.json ./

# 종속성 설치
RUN npm install

# 소스 코드 복사
COPY . .


# 포트 노출
EXPOSE 8088

# 앱 실행 명령
CMD [ "node", "server.js" ]