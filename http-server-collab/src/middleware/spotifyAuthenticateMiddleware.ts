import axios from "axios";

let accessToken = null;
let tokenExpiryTime = null;

export const spotifyAuthenticate = async (req, res, next) => {

    if (!accessToken || Date.now() >= tokenExpiryTime) {
        await generateNewAccessToken();
    }
    req.authorization = accessToken;
    next()
}

const generateNewAccessToken = async () => {
    const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
    const accessTokenUrl = process.env.SPOTIFY_ACCESS_TOKEN_URL;
    const data = new URLSearchParams();
    data.append("grant_type", "client_credentials");
    data.append("client_id", CLIENT_ID);
    data.append("client_secret", CLIENT_SECRET);


    try {
        const response = await axios.post(accessTokenUrl, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        accessToken = response.data["access_token"];
        const expiresIn = response.data["expires_in"];
        tokenExpiryTime = Date.now() + expiresIn * 1000;
    } catch (error) {
        console.log(error)
    }
}