From node:14
WORKDIR .
ENV PATH /node_modules/.bin:$PATH
ENV TZ=America/New_York
COPY package.json ./
RUN npm install
RUN ln -fs /usr/share/zoneinfo/$TZ /etc/localtime && dpkg-reconfigure -f noninteractive tzdata
COPY . ./
CMD ["npm", "start"]