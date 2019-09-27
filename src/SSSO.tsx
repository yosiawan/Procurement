import React, { useEffect, cloneElement } from 'react'

import { usePersistedState } from "./helpers";
import { CircularProgress } from '@material-ui/core';

import './App.css'

type userInfo = {
  sid: string
  sub: string
}

const EMAIL = "EMAIL"
export default function SSSO(props: any) {

  const [email, setEmail] = usePersistedState(EMAIL, "")

  function onLogout() {
    window.location.replace("https://hail.sirclo.com.dmmy.me/oauth2/sessions/logout");
    setEmail("")
  }

  async function getEmailFromRaden(accessToken: string) {
    const url = "https://hail.sirclo.com.dmmy.me/userinfo"
    try {
      let resultFromRaden = await fetch(url, { headers: {"Authorization": `Bearer ${accessToken}`}})
      let resultJSON: userInfo = await resultFromRaden.json()
      
      return resultJSON.sub
    } catch {
      return ""
    }
  }

  useEffect(() => {
    // request token 
    if(!email) {
      if ((new URL(window.location.href)).href.includes("access_token")) {
        let hrefData = window.location.href.split("#")[1].split("&");
        let access_token = hrefData[0].split("=")[1];

        getEmailFromRaden(access_token)
          .then(emailFromRaden => setEmail(emailFromRaden))
          .then(() => setTimeout(() => window.history.replaceState({}, document.title, "/"), 100))
      } else {
        const state = "RANDOMSTRING"; // SHOULD BE RANDOM
        var url = `https://hail.sirclo.com.dmmy.me/oauth2/auth?client_id=Rumatata_3001&redirect_uri=http://192.168.1.31:3001&response_type=token&scope=open&state=${state}`;

        window.location.replace(url);
      }
    }
  })

  // show children when token is available
  if (email && email !== "") {
    return cloneElement(props.children, { onLogout, email })
  }

  return (
    <div style={{ height: 700 }} className="main-container__loading">
      <CircularProgress size={50}/>
      <div>Please wait . . .</div>
    </div>
  )
}