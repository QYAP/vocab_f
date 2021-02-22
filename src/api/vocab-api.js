import http from "@/libs/HttpRequest.js";

export const getVocabBookPageList = p => http.get("/vocab-book", p);
export const NewVocabBook = p => http.post("/vocab-book", p);
export const DelVocabBook = p => http.delete("/vocab-book", p);
export const getVocabWordPageList = p => http.get("/vocab-word", p);
export const NewVocabWord = p => http.post("/vocab-word", p);
export const DelVocabWord = p => http.delete("/vocab-word", p);