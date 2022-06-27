import { useUI } from '@components/ui/context'
import FacebookLoginButton, {
  LoginResponse,
} from '@greatsumini/react-facebook-login'
import useFacebookLogin from '@framework/auth/use-facebook-login'

const FacebookLogin: React.FC = () => {
  const { closeModal } = useUI()

  const facebookLogin = useFacebookLogin()

  const handleOnSuccessFacebook = async (
    response: LoginResponse['authResponse']
  ) => {
    if (!!response) {
      await facebookLogin({
        token: response.accessToken,
      })
      closeModal()
    } else {
      console.log('Facebook authentication failed!')
    }
  }

  return (
    <div className="w-80 flex flex-col justify-between p-3">
      <FacebookLoginButton
        appId="733157791465173"
        fields="name,email,picture"
        scope="public_profile,email,user_friends"
        onSuccess={handleOnSuccessFacebook}
        onFail={(e: { status: string }) =>
          console.log('FB login failed:', e.status)
        }
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
  )
}

export default FacebookLogin
