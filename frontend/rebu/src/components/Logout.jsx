import React from 'react';
import { Redirect } from "react-router-dom";

export default function Logout() {
  // const token = localStorage.getItem("token");
  localStorage.removeItem("token");
  // console.log(token)
  return(
    <Redirect to = "/login" />
  )
}