import { task_data } from '@/constants/data'
import {
  DataResponseType,
  QueryParams,
  TransactionType,
  UserType,
} from '@/types'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataResponseType>,
) {
  const transactionsData: TransactionType[] = JSON.parse(task_data).transactions

  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  const {
    pageSize = 10,
    pageNumber = 1,
    userId,
    sortedColumn = null,
    sortDirection = 'asc',
    search,
    transactionFilter = 'all',
  } = req.query as QueryParams

  let userTransactions = transactionsData.filter(
    transaction =>
      transaction.sourceId === userId || transaction.targetId === userId,
  )

  // get user balance
  const userBalance = userTransactions.reduce((balance, transaction) => {
    if (transaction.targetId === transaction.targetId) return balance
    if (transaction.targetId === userId) {
      return balance + Number(transaction.amount)
    } else if (transaction.sourceId === userId) {
      return balance - Number(transaction.amount)
    }
    return balance
  }, 0)

  // filter by transaction type
  if (transactionFilter === 'incoming') {
    userTransactions = userTransactions.filter(
      transaction => transaction.targetId === userId,
    )
  } else if (transactionFilter === 'outgoing') {
    userTransactions = userTransactions.filter(
      transaction => transaction.sourceId === userId,
    )
  }

  // filter by search term
  if (search) {
    userTransactions = userTransactions.filter(transaction => {
      return (
        transaction.targetId.includes(search) ||
        transaction.sourceId.includes(search) ||
        transaction.amount.toString().includes(search)
      )
    })
  }

  // sort
  if (sortedColumn && sortDirection) {
    userTransactions.sort((a, b) => {
      if (
        typeof a[sortedColumn] === 'number' &&
        typeof b[sortedColumn] === 'number'
      ) {
        return sortDirection === 'desc'
          ? Number(b[sortedColumn]) - Number(a[sortedColumn])
          : Number(a[sortedColumn]) - Number(b[sortedColumn])
      }

      if (a[sortedColumn] > b[sortedColumn])
        return sortDirection === 'desc' ? -1 : 1
      if (a[sortedColumn] < b[sortedColumn])
        return sortDirection === 'desc' ? 1 : -1
      return 0
    })
  }

  const startIndex = (Number(pageNumber) - 1) * Number(pageSize)
  const paginatedTransactions = userTransactions.slice(
    startIndex,
    startIndex + Number(pageSize),
  )

  console.log('paginatedTransactions from server', paginatedTransactions)
  res.status(200).json({
    transactions: paginatedTransactions,
    total: userTransactions.length,
    balance: userBalance,
  })
}
