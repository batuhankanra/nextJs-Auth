
import { getUserCurrent } from '@/lib/action'
import Profile from './page'



const ProfileLayout = async ({children}:{children:React.ReactNode}) => {
    const session =await getUserCurrent()

  return (
    <div>
      <Profile session={session} />
    </div>
  )
}

export default ProfileLayout
