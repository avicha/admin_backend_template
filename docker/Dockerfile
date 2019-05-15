FROM node:10.14.1-slim
# Set the working directory to /usr/src/app
WORKDIR /usr/src/app
# Copy the current directory contents into the container at /usr/src/app
COPY . /usr/src/app
# Install any needed packages specified in package.json
#RUN npm install --register=http://192.168.1.206:11001/repository/npm-group/ -d
# Make port 18000 available to the world outside this container
EXPOSE 16000
# Run app.js when the container launches
CMD ["npm", "run", "app"]
