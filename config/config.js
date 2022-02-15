const url = "https://aiclothin-b.herokuapp.com"
const urlTest = "http://localhost:8000"
console.log(process.env.ENDTEST == "true")
export default (process.env.ENDTEST == "true")?urlTest:url