const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

const m_host = '172.16.15.150'
const m_user = 'admin'
const m_password = '1qaz2wsx'
const authorization_header = btoa(m_user,m_password)

app.get('/status', async (req,res)=>{
    const response = await fetch(`http://${m_host}/rest/system/resource`,{
        headers: {
            // 'Authorization' : authorization_header
             'Authorization' : 'Basic YWRtaW46MXFhejJ3c3g='

        }
    })
    const json = await response.json()
    res.json(json)
    console.log(json)
})

app.listen(3000,()=>{
    console.log("dziala na porcie")
})