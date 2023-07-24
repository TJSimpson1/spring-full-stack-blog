import jwt_decode from "jwt-decode";

const decodeToken = (token: any) => {
    if(token === null) {return null;}
    if(token.length === 2) {return null;}
    try {
        const decoded = jwt_decode(token); // Checks token is in valid JWT format - NOT if the JWT is valid with respect to the secret key. This must be done server side
        return decoded;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
};

export default decodeToken;
