import {
  provideApolloClient,
  useLazyQuery,
  useQuery,
} from '@vue/apollo-composable'
import { ref, Ref, watch } from 'vue'
import { GET_CURRENT_USER } from '../graphql/query.user'
import { User } from '../interfaces/interface.user'
import useAuthentication from './useAuthentication'
import useGraphQL from './useGraphQL'

const customUser: Ref<User | null> = ref(null)

export default () => {
  const setCustomUser = (u: User) => (customUser.value = u)
  const { apolloClient } = useGraphQL()
  const { user } = useAuthentication()

  provideApolloClient(apolloClient)
  const { result, load, document } = useLazyQuery(GET_CURRENT_USER)

  const loadCustomUser = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      watch(result, ({ findByCurrentUserUid }) => {
        if (findByCurrentUserUid) {
          setCustomUser(findByCurrentUserUid)
          resolve()
        }
      })
      load(document.value)
    })
  }

  return {
    customUser: customUser,
    loadCustomUser,
  }
}
