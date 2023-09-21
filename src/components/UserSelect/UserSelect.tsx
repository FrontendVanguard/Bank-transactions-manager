import { DataContext } from '@/contexts/DataContext'
import { useContext, useState } from 'react'
import { StyledOption, StyledSelect } from './UserSelect.styles'

export const UserSelect = () => {
  const { selectedUser, setSelectedUser, users } = useContext(DataContext)

  if (!users) return <>no users</>

  const handleChangeUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) {
      setSelectedUser(null)
      return
    }

    setSelectedUser(JSON.parse(e.target.value))
  }
  return (
    <StyledSelect
      value={selectedUser ? JSON.stringify(selectedUser) : ''}
      onChange={handleChangeUser}
    >
      <StyledOption value=''>View this page as</StyledOption>
      {users.map(user => (
        <StyledOption key={user.id} value={JSON.stringify(user)}>
          {user.name}
        </StyledOption>
      ))}
    </StyledSelect>
  )
}
