import axios from "axios";

class AccessToken {

    static async GetAccessToken() {
        if(!localStorage.getItem("Access") || IsExpired()) {
            
            const config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${process.env.REACT_APP_HOST}/auth/get-accesstoken`
            }

            await axios(config)
            .then(function(response) {
                var tDate = new Date();
                if(response.data.data) {
                    console.log(response);
                    console.log("엑세스 토큰 요청 성공 : " + tDate);
                    localStorage.setItem("Access", "Bearer " + response.headers.get("Authorization"));
                    tDate.setMinutes(tDate.getMinutes() + 25)
                    localStorage.setItem("ExpireDate", tDate);
                }
                else {
                    return null;
                }
            })
            .catch(function() {
                return null;
            })
        }
    }

    static IsExpired() {
        
    }
}

function IsExpired() {
    var tokenExpireTime = new Date(localStorage.getItem("ExpireDate"));
    var curTime = new Date()

    var leftTime = tokenExpireTime - curTime;
    if(leftTime > 0) {
        return false;
    }
    else {
        return true;
    }
}

export default AccessToken;