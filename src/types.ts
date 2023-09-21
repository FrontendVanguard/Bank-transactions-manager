export type TransactionFilterType = 'all' | 'incoming' | 'outgoing'

export interface UserType {
  id: string
  name: string
}

export interface TransactionType {
  sourceId: string
  targetId: string
  amount: string
}

export interface TaskDataType {
  users: UserType[]
  transactions: TransactionType[]
}

export interface DataResponseType {
  total: number
  transactions: TransactionType[] | null
  balance: number
}

export type UseQueryReturnType = {
  data: DataResponseType | undefined
  isError: boolean
  isLoading: boolean
}

export interface QueryParams {
  pageSize?: number
  pageNumber?: number
  userId?: string
  search?: string
  transactionFilter?: TransactionFilterType
  sortedColumn?: 'amount' | 'targetId' | 'sourceId'
  sortDirection?: 'asc' | 'desc'
}
