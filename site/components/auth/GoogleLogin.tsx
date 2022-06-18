import { Button } from '@components/ui'
import useGoogleLogin from '@framework/auth/use-google-login'
import { useUI } from '@components/ui/context'
import {useGoogleLogin as useGoogleLoginHook} from 'react-google-login';

interface GoogleLoginProps {
  disabled: boolean
  loading: boolean
}

const GoogleLogin: React.FC<GoogleLoginProps> = ({disabled, loading}) => {
  const { closeModal } = useUI()

  const googleLogin = useGoogleLogin()

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

  return (
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
  )
}

export default GoogleLogin
