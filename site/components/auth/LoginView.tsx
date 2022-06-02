import { useEffect, useState, useCallback } from 'react'
import { Logo, Button, Input } from '@components/ui'
import useLogin from '@framework/auth/use-login'
import useGoogleLogin from '@framework/auth/use-google-login'
import { useUI } from '@components/ui/context'
import { validate } from 'email-validator'
import {useGoogleLogin as useGoogleLoginHook} from 'react-google-login';
import FacebookLogin, { LoginResponse } from '@greatsumini/react-facebook-login';
import useFacebookLogin from '@framework/auth/use-facebook-login'

const LoginView: React.FC = () => {
  // Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const { setModalView, closeModal } = useUI()

  const login = useLogin()
  const googleLogin = useGoogleLogin()
  const facebookLogin = useFacebookLogin()

  const handleLogin = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    try {
      setLoading(true)
      setMessage('')
      await login({
        email,
        password,
      })
      setLoading(false)
      closeModal()
    } catch (e: any) {
      //setMessage(e.errors[0].message) DOES NOT WORK
      console.log("Error: ", e)
      setLoading(false)
      setDisabled(false)
    }
  }

  const handleValidation = useCallback(() => {
    // Test for Alphanumeric password
    const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)

    // Unable to send form unless fields are valid.
    if (dirty) {
      setDisabled(!validate(email) || password.length < 7 || !validPassword)
    }
  }, [email, password, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])
  
  const onSuccessGoogleLogin = async (response: any) => {
    await googleLogin({
      google: response.tokenId,
    })
    closeModal()
  }

  const onFailureGoogleLogin = async (response: any) => {
  }

  const {signIn} = useGoogleLoginHook({
    clientId: "544188497430-sqn1tr00nd4uvthmbqo95trcjjibp8j2.apps.googleusercontent.com",
    onSuccess: onSuccessGoogleLogin,
    onFailure: onFailureGoogleLogin,
    accessType: 'offline',
    autoLoad: false,
  })


  const handleOnSuccessFacebook = async (response: LoginResponse['authResponse']) => {
    if (!!response) {
      await facebookLogin({
          token: response.accessToken,
        })
        closeModal()
    } else {
      console.log("Facebook authentication failed!")
    }
  }

  return (
    <>
      <form
        onSubmit={handleLogin}
        className="w-80 flex flex-col justify-between p-3"
      >
        <div className="flex justify-center pb-12 ">
          <Logo width="64px" height="64px" />
        </div>
        <div className="flex flex-col space-y-3">
          {message && (
            <div className="text-red border border-red p-3">
              {message}. Did you {` `}
              <a
                className="text-accent-9 inline font-bold hover:underline cursor-pointer"
                onClick={() => setModalView('FORGOT_VIEW')}
              >
                forgot your password?
              </a>
            </div>
          )}
          <Input type="email" placeholder="Email" onChange={setEmail} />
          <Input type="password" placeholder="Password" onChange={setPassword} />

          <Button
            variant="slim"
            type="submit"
            loading={loading}
            disabled={disabled}
          >
            Log In
          </Button>
          <div className="pt-1 text-center text-sm">
            <span className="text-accent-7">Don't have an account?</span>
            {` `}
            <a
              className="text-accent-9 font-bold hover:underline cursor-pointer"
              onClick={() => setModalView('SIGNUP_VIEW')}
            >
              Sign Up
            </a>
          </div>
        </div>
      </form>
      <div className="w-80 flex flex-col justify-between p-3">
        <Button
          variant="slim"
          type="submit"
          loading={loading}
          disabled={disabled}
          onClick={signIn}
          className="flex justify-center p-3"
        >
          Log In with Google
        </Button>
      </div>
      <div className="flex justify-center p-3">
        <FacebookLogin
          appId="733157791465173"
          fields="name,email,picture"
          scope="public_profile,email,user_friends"
          onSuccess={handleOnSuccessFacebook}
          onFail={(e: {status: string}) => console.log("FB login failed:", e.status)}
          style={{
            backgroundColor: '#4267b2',
            color: '#fff',
            fontSize: '16px',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
            //backgroundImage: "" if we want the fb icon in the button... how do we make work this out?
          }}
        />
      </div>
    </>
  )
}

export default LoginView
