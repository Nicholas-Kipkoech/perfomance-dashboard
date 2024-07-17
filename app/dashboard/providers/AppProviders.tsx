import ContextProvider from '@/app/context/Context'
import StatisticalProvider from '@/app/context/StatisticalContext'

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ContextProvider>
      <StatisticalProvider>{children}</StatisticalProvider>
    </ContextProvider>
  )
}

export default AppContextProvider
