import ClaimsContextProvider from '@/app/context/ClaimsContext'
import ContextProvider from '@/app/context/Context'
import StatisticalProvider from '@/app/context/StatisticalContext'

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ContextProvider>
      <ClaimsContextProvider>
        <StatisticalProvider>{children}</StatisticalProvider>
      </ClaimsContextProvider>
    </ContextProvider>
  )
}

export default AppContextProvider
