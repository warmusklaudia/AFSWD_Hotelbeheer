import {
  provideApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
} from '@vue/apollo-composable'
import { ref, Ref, watch } from 'vue'
import { ADD_USER } from '../graphql/mutation.user'
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
  const { result, refetch } = useQuery(GET_CURRENT_USER)

  const loadCustomUser = (): Promise<void> => {
    refetch()
    return new Promise((resolve, reject) => {
      watch(result, ({ findByCurrentUserUid }) => {
        console.log(result)
        if (findByCurrentUserUid) {
          setCustomUser(findByCurrentUserUid)
          resolve()
        }
      })
    })
  }

  return {
    customUser: customUser,
    loadCustomUser,
  }
}
