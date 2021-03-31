# build environment
FROM node:current-alpine3.13 as builder
WORKDIR /usr/6CCS3PRJ/client/
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm ci --only=prod

# Bundle app source
COPY . ./

# Create prodution build
RUN npm run build

# Server from port 80
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/6CCS3PRJ/client/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]    
