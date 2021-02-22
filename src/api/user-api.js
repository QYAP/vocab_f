import http from "@/libs/HttpRequest.js";

export const signInAPI = p => http.get("/user", p);
export const signUpAPI = p => http.post("/user", p); 
