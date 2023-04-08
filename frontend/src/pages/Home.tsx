import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useEffect } from "react"
import { useNavigate } from "react-router"

async function auth(userInfo) {
  return await axios.post('/auth', {
    name: userInfo.given_name,
    email: userInfo.email
  })
}

const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard')
    }
  }, [])
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse: any) => {
    // fetching userinfo can be done on the client or the server
      const userInfo = await axios
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then(res => res.data)

      const res = await auth(userInfo)

      if (res.data.message === 'ok') {
        localStorage.setItem('token', res.data.user.token)
        await navigate("/dashboard")
      }
    },
  })
  return (
    <div>
      <div className="home">
        <h1 className='h2'>Get shit done with Shit Todo!</h1>
        <button className='btn-google' onClick={() => login()}> Sign in with Google {' '}</button>
      </div>
    </div>
  )
}

export default Home