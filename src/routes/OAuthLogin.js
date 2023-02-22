import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Postcode from "@actbase/react-daum-postcode";

import axios from 'axios'

function OAuthLogin () {
    axios.defaults.withCredentials = true;

    const location = useLocation();
    const params = new URLSearchParams(location.search);

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
        console.log(data);
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/auth/oauthlogin',
            headers: {
                "Content-Type": "application/json"
            },
            data : data
        };
        
        axios(config)
        .then(function (response) {
            SetLoading(response.data);
        })
        .catch(function (error) {
        });
    }, [name, role, hash])

    const SetAddress = (address) => {
        var data = JSON.stringify({
            "vectorX": "0",
            "vectorY": "0",
            "address": address
          });
          
          var config = {
            method: 'put',
          maxBodyLength: Infinity,
            url: 'http://localhost:8080/auth/oauthlocation',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
          })
          .catch(function (error) {
          });
    }

    useEffect(() => {
        if(state === "true") navigate("/")
    }, [loading])

    return (
        <div>
            {state === "false" && <Postcode
                style={{ width: 460, height: 320 }}
                jsOptions={{ animation: true, hideMapBtn: true }}
                onSelected={data => {
                    SetAddress(data.address);
                    navigate("/");
                }}
                />}
        </div>
    );
}

export default OAuthLogin;