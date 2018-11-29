

export const token = localStorage.getItem("jwt");
// export const URL = "http://localhost:80/api/v1/"
// export const NGROK = "murmuring-oasis-50773.herokuapp.com"
export const NGROK = "23aec97e.ngrok.io"

export const URL = "https://" + NGROK + "/api/v1/"
export const HEADERS = {"Content-Type": "application/json",
Accept: "application/json"}

export const NO_PROFILE = "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.freepik.com%2Ffree-icon%2Fuser-image-with-black-background_318-34564.jpg&f=1"
