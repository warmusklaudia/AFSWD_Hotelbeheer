import { reactive, ref, watch } from 'vue'
import {
  getDownloadURL,
  getStorage,
  ref as refFirebase,
  uploadBytes,
} from 'firebase/storage'
import useAuthentication from './useAuthentication'
import useCustomUser from './useCustomUser'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { UPDATE_USER } from '../graphql/mutation.user'
import { GET_CURRENT_USER } from '../graphql/query.user'

const { customUser, loadCustomUser } = useCustomUser()
const { user } = useAuthentication()
const userInput = reactive({
  id: customUser.value?.id,
  imgUrl: '',
  firstName: customUser.value?.firstName,
  lastName: customUser.value?.lastName,
  role: {
    name: customUser.value?.role.name,
  },
})

export default () => {
  const storage = getStorage()

  const storageRef = refFirebase(storage, user.value?.uid)
  const {
    result: resultUser,
    loading: loadingUser,
    error: errUser,
  } = useQuery(GET_CURRENT_USER)
  const { mutate: updateUser } = useMutation(UPDATE_USER, () => ({
    variables: {
      updateUserInput: userInput,
    },
    update(cache, { data: { updateUser } }) {
      let data: any = cache.readQuery({ query: GET_CURRENT_USER })
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: {
          findByCurrentUserUid: updateUser,
        },
      })
    },
  }))

  const uploadPic = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]

    await uploadBytes(storageRef, file as Blob)
      .then(async () => {
        await Promise.all([await getImg(), updateUser()])
        loadCustomUser()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getImg = async () => {
    await getDownloadURL(storageRef).then((link) => {
      userInput.imgUrl = link
    })
  }

  watch(userInput, () => {
    getImg()
  })

  return {
    uploadPic,
  }
}
