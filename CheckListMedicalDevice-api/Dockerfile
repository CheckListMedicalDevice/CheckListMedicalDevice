FROM node:20.12.2-alpine3.18 as base

ENV PORT=3000
ENV JWT_SECRET=SDFGHDFHDFHDFGERwerwerfsdfdf
ENV MYSQL_HOST=localhost
ENV MYSQL_USERNAME=root
ENV MYSQL_PASSWORD=password
ENV MYSQL_DATABASE=CheckListMedicalDevice

FROM base as dependeneies
WORKDIR /app
COPY package.json ./
RUN npm install

FROM base as builder
WORKDIR /app
COPY . .
COPY --from=dependeneies /app/node_modules ./node_modules
RUN npm run build

FROM node:20.12.2-alpine3.18 as runner
WORKDIR /app
COPY --from=builder /app/dist/ ./dist/
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/app.js"]
