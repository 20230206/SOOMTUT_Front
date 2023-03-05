/*global kakao*/
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from 'axios'

function OAuthLogin () {
    axios.defaults.withCredentials = true;

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    // baseURL / URI ? query string -> 
    const navigate = useNavigate();
    const name = params.get("name");
    const role = params.get("role");
    const hash = params.get("hash");
    const state = params.get("state");
    const [loading, SetLoading] = useState(false);

    useEffect(() => {
        var data = JSON.stringify({
            "email" : name,
            "role" : role,
            "hash" : hash
        });
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST}/auth/oauth-login`,
            headers: {
                "Content-Type": "application/json"
            },
            data : data
        };
        
        axios(config)
        .then(function (response) {
            SetLoading(response.data.data);
        })
        .catch(function (error) {
        });
    }, [name, role, hash])
    
    useEffect(() => {
        if(loading === true) {
            if(state === "ACTIVE") { 
                navigate("/")
                window.location.reload();
            }
            if(state === "INIT") { navigate("/oauthlogin/init") }
            if(state === "SUSPEND") {
                alert("회원 탈퇴 요청된 계정입니다.")
                navigate("/")
            }
        }
    }, [loading])

}

export default OAuthLogin;