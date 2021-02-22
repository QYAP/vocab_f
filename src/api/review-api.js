import http from "@/libs/HttpRequest.js";

export const getReviewRecord = p => http.get("/review-record", p);
export const newReviewRecord = p => http.post("/review-record", p);