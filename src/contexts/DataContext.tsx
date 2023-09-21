import { task_data } from '@/constants/data'
import { TransactionType, UserType } from '@/types'
import React, { createContext, useEffect, useMemo, useState } from 'react'

export const DataContext = createContext<{
  users: UserType[] | null
  selectedUser: UserType | null

  setSelectedUser: React.Dispatch<React.SetStateAction<UserType | null>>
}>({
  selectedUser: null,
  users: null,
  setSelectedUser: () => {},
})

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedUser, setSelectedUser] = useState<null | UserType>(null)

  const [users, setUsers] = useState<null | UserType[]>(null)

  React.useEffect(() => {
    setUsers(JSON.parse(task_data).users)
    const initUser = localStorage.getItem('user')
    if (initUser) setSelectedUser(JSON.parse(initUser))
  }, [])

  React.useEffect(() => {
    if (selectedUser) localStorage.setItem('user', JSON.stringify(selectedUser))
  }, [selectedUser])

  return (
    <DataContext.Provider
      value={{
        users,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
