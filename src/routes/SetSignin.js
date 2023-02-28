import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from 'axios'

function SetSignin () {
    axios.defaults.withCredentials = true;

    const navigate = useNavigate();
    const params = useParams().access;
    const [loading, SetLoading] = useState(false);


    useEffect(() => {
        var config = {
            method: 'get',
        maxBodyLength: Infinity,
            url: 'http://3.35.187.107:8080/auth/createrefreshforoauth2',
            headers: { 
                'Authorization': params
            }
        };
        
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            SetLoading(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [params])

    useEffect(() => {
        navigate("/");
    }, [loading, navigate])

}

export default SetSignin;
