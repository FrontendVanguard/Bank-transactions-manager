import { UserType } from '@/types'

export const getUserById = (users: UserType[], id: string) => {
  const user = users.find(user => user.id === id)
  return user ? user : undefined
}
