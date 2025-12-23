FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Production Phase
FROM nginx:stable-alpine
# Copy the built files from Vite's 'dist' folder to Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Copy a custom Nginx config (we will create this next)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]