import axios from 'axios'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const auth = getAuth()

const googleSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const token = result.credential.accessToken

    const response = await axios.post('http://localhost:3000/auth/google', { token })
    return response.data
  } catch (error) {
    console.error('Erreur d\'authentification Google', error)
    throw error
  }
}

export default googleSignIn
