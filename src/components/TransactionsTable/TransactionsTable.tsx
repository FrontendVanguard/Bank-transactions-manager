import React, { useContext, useEffect, useRef, useState } from 'react'

import { DataContext } from '@/contexts/DataContext'
import {
  DataResponseType,
  TransactionFilterType,
  TransactionType,
  UseQueryReturnType,
  UserType,
} from '@/types'
import { getUserById } from '@/utils/functions'
import {
  ButtonsContainer,
  MajorText,
  SelectUserInfo,
  StyledInput,
  StyledOption,
  StyledSelect,
  SubText,
  Transaction,
  TransactionTable,
  TransactionsContainer,
} from './TransactionsTable.styles'
import { useQuery } from 'react-query'
import { fetchPaginatedTransactions } from '../api/userTransactionsApi'

export const TransactionsTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)
  const inputRef = useRef<HTMLInputElement>(null)

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const [sortedColumn, setSortedColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [searchTerm])

  const [transactionFilter, setTransactionFilter] =
    useState<TransactionFilterType>('all')

  const { selectedUser, users } = useContext(DataContext)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
      setPageNumber(1)
    }, 1000)

    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm])

  const handleColumnClick = (columnName: string) => {
    if (sortedColumn === columnName) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortedColumn(columnName)
      setSortDirection('asc')
    }
  }

  const { data, isError, isLoading } = useQuery(
    [
      'paginatedTransactions',
      selectedUser?.id,
      debouncedSearchTerm,
      transactionFilter,
      pageSize,
      pageNumber,
      sortedColumn,
      sortDirection,
    ],
    () => {
      if (!selectedUser?.id) return
      return fetchPaginatedTransactions({
        userId: selectedUser.id,
        search: searchTerm,
        transactionFilter,
        pageSize,
        pageNumber,
        sortedColumn,
        sortDirection,
      })
    },
    {
      enabled: !!selectedUser?.id,
    },
  ) as UseQueryReturnType

  if (isLoading) return <MajorText>Loading...</MajorText>

  if (!selectedUser)
    return (
      <SelectUserInfo>
        <MajorText>First select a user</MajorText>
        <span className='material-symbols-outlined'>east</span>
      </SelectUserInfo>
    )
  if (!data) return <MajorText>No Data</MajorText>

  const { balance = 0, total, transactions } = data
  return (
    <TransactionTable>
      <StyledInput
        type='text'
        ref={inputRef}
        placeholder='Search by SourceId, TargetId, Price'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <StyledSelect
        value={transactionFilter}
        onChange={e => {
          setTransactionFilter(e.target.value as TransactionFilterType)
        }}
      >
        <StyledOption value='all'>All Transactions</StyledOption>
        <StyledOption value='incoming'>Incoming Transactions</StyledOption>
        <StyledOption value='outgoing'>Outgoing Transactions</StyledOption>
      </StyledSelect>

      <MajorText>Hi, {selectedUser?.name}!</MajorText>
      <MajorText>Your Balance: {balance.toFixed(2)} :D</MajorText>

      <MajorText style={{ marginTop: '24px' }}>Page size</MajorText>
      <StyledSelect
        value={pageSize}
        style={{ maxWidth: '76px' }}
        onChange={e => {
          setPageSize(Number(e.target.value))
          setPageNumber(1)
        }}
      >
        <StyledOption value={5}>5</StyledOption>
        <StyledOption value={10}>10</StyledOption>
        <StyledOption value={25}>25</StyledOption>
        <StyledOption value={50}>50</StyledOption>
      </StyledSelect>

      <TransactionsContainer>
        <Transaction>
          <div></div>
          <div></div>
          <div onClick={() => handleColumnClick('amount')}>
            Amount
            {sortedColumn === 'amount' &&
              (sortDirection === 'asc' ? '🔼' : '🔽')}
          </div>
          <div onClick={() => handleColumnClick('sourceId')}>
            sourceId
            {sortedColumn === 'sourceId' &&
              (sortDirection === 'asc' ? '🔼' : '🔽')}
          </div>
          <div onClick={() => handleColumnClick('targetId')}>
            targetId
            {sortedColumn === 'targetId' &&
              (sortDirection === 'asc' ? '🔼' : '🔽')}
          </div>
        </Transaction>

        {transactions &&
          transactions.map((transaction: TransactionType, idx: number) => (
            <Transaction key={idx}>
              <div>
                {transaction.sourceId === selectedUser?.id && (
                  <span className='material-symbols-outlined'>
                    arrow_upward
                  </span>
                )}

                {transaction.targetId === selectedUser?.id && (
                  <span className='material-symbols-outlined'>
                    arrow_downward
                  </span>
                )}
              </div>
              <SubText>Transaction info:</SubText>
              <MajorText>price: {transaction.amount} </MajorText>
              <MajorText>
                from: {users && getUserById(users, transaction.sourceId)?.name}{' '}
                <br />
                sourceId: {transaction.sourceId}
              </MajorText>
              <MajorText>
                to: {users && getUserById(users, transaction.targetId)?.name}{' '}
                <br />
                targetId: {transaction.targetId}
              </MajorText>
            </Transaction>
          ))}

        <ButtonsContainer>
          <button
            onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
            disabled={pageNumber === 1}
          >
            Previous
          </button>
          <span>{pageNumber}</span>
          <button
            onClick={() =>
              setPageNumber(prev =>
                transactions && transactions.length === pageSize
                  ? prev + 1
                  : prev,
              )
            }
            disabled={pageNumber * pageSize >= total}
          >
            Next
          </button>
        </ButtonsContainer>
      </TransactionsContainer>
    </TransactionTable>
  )
}
