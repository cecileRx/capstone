import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }
  return (
     <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Log in with Google Popup</button>
      < SignUpForm />
     </div>
  )
}

export default SignIn;
