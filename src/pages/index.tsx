import { TransactionsTable } from '@/components/TransactionsTable/TransactionsTable'
import { UserSelect } from '@/components/UserSelect/UserSelect'
import { task_data } from '@/constants/data'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  return (
    <div className='home'>
      <UserSelect />
      <TransactionsTable />
    </div>
  )
}

export default Home
