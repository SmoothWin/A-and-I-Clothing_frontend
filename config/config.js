const url = "https://aiclothin-b.herokuapp.com"
const urlTest = "http://localhost:8000"

export default (process.env.ENDTEST = "true")?urlTest:url