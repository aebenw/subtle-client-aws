

export const token = localStorage.getItem("jwt");
// export const URL = "http://localhost:3000/api/v1/"
export const NGROK = "e95a9378.ngrok.io"
export const URL = "http://" + NGROK + "/api/v1/"
export const HEADERS = {"Content-Type": "application/json",
Accept: "application/json"}

export const NO_PROFILE = "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.freepik.com%2Ffree-icon%2Fuser-image-with-black-background_318-34564.jpg&f=1"

////////////////////////////////////////////////////////////
//CHANGE URL/"HOST" IN ACTIONCABLE PROVIDER/BLOCK SERIALIZER
