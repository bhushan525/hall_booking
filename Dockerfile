# Stage 1: Build the Angular app with Node.js 20
FROM node:20 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire Angular project into the container
COPY . .

# Build the Angular application (use the correct build command, typically `ng build --prod`)
RUN npm run build --prod

# Stage 2: Serve the built Angular app using Nginx
FROM nginx:alpine

# Copy the build output from the previous stage to the Nginx HTML directory
COPY --from=build /app/dist/convention_hall_booking /usr/share/nginx/html

# Expose port 8088 to access the app through Nginx
EXPOSE 8088

# Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
