import { DataResponseType } from '@/types'

export const fetchPaginatedTransactions = async (
  options = {},
): Promise<DataResponseType> => {
  const queryParams = new URLSearchParams(options)

  const response = await fetch(`/api/transactions?${queryParams.toString()}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}
