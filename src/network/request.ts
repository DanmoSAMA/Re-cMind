import axios from "axios";

export default async function request (word: string) {
  const res = await axios.get(`http://110.40.178.201:8001/related?word=${word}`)
  return res.data
}