# 构建阶段

# 使用 bun 镜像作为构建基础镜像
FROM oven/bun:alpine AS build

# 设置目录为 /app
WORKDIR /app

# 将 package 文件复制到镜像中
COPY package*.json ./

# 安装依赖
RUN bun install

# 复制所有源代码到镜像中
COPY . .

# 构建 Vue 项目
RUN bun run build

# 运行阶段

# 使用 nginx 镜像作为运行时基础镜像
FROM nginx:alpine

# 从构建阶段的镜像中复制构建好的静态文件到 nginx 的默认静态文件目录中
COPY --from=build /app/dist /usr/share/nginx/html

# 复制自定义的 Nginx 配置文件到 Nginx 的配置目录
COPY ./src/config/nginx.conf /etc/nginx/nginx.conf

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx 并保持在前台运行
CMD [ "nginx", "-g", "daemon off;" ]

