# Node.js 18 이미지 사용
FROM node:18

# 앱 디렉토리 생성
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 나머지 소스 복사
COPY . .

# 포트 지정 (fly.toml에 맞게)
ENV PORT=3000

# 서버 실행
CMD ["npm", "start"]
