import { provideApolloClient, useLazyQuery } from '@vue/apollo-composable'
import { ref, Ref, watch } from 'vue'
import { GET_USER_BY_UID } from '../graphql/query.user'
import { User } from '../interfaces/interface.user'
import useAuthentication from './useAuthentication'
import useGraphQL from './useGraphQL'

const customUser: Ref<User | null> = ref(null)

export default () => {
  const setCustomUser = (u: User) => (customUser.value = u)
  const { apolloClient } = useGraphQL()
  const { user } = useAuthentication()

  provideApolloClient(apolloClient)
  const { result, load, document } = useLazyQuery(GET_USER_BY_UID)

  const loadCustomUser = async (uid: string) => {
    load(document.value, { uid })
  }

  watch(result, ({ findByUid }) => {
    if (findByUid) setCustomUser(findByUid)
  })

  return {
    customUser: customUser,
    loadCustomUser,
  }
}
