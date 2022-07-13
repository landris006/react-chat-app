FROM node:16

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV PORT=5000
ENV CLIENT_ADDRESS=https://react-chat-app-landris006.vercel.app/
ENV CONNECTION_STRING=mongodb+srv://mongodb:mongodb5284921@cluster0.idfvk.mongodb.net/?retryWrites=true&w=majority
ENV JWT_SECRET=U3ppYSBVcmFt

EXPOSE 5000

CMD [ "npm", "run", "start-prod" ]