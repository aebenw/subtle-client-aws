

export const token = localStorage.getItem("jwt");
// export const URL = "http://localhost:3000/api/v1/"
export const NGROK = "localhost:80"
export const URL = "http://" + NGROK + "/api/v1/"
export const HEADERS = {"Content-Type": "application/json",
Accept: "application/json"}

////////////////////////////////////////////////////////////
//CHANGE URL/"HOST" IN ACTIONCABLE PROVIDER/BLOCK SERIALIZER
