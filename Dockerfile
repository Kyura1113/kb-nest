FROM node:14.17.0

# 容器中创建一个目录
RUN mkdir -p /user/src/node/nestjs

# 定位到容器的工作目录
WORKDIR /user/src/node/nestjs

# RUN/COPY分层，package.json提前，只要没有修改就不会重新安装包
COPY package.json /user/src/node/nestjs/package.json

RUN npm i --registry=https://registry.npm.taobao.org

# 拷贝所有源代码到工作目录
COPY . /user/src/node/nestjs

# 暴露容器端口
EXPOSE 3000

# 启动node应用
CMD npm start