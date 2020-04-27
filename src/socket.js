import io  from 'socket.io-client';
const serverEndPoint = process.env.REACT_APP_API_URL
const socket = io(serverEndPoint);
export default socket;