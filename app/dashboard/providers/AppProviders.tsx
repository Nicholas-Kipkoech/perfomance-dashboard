import ClaimsContextProvider from '@/app/context/ClaimsContext'
import ContextProvider from '@/app/context/Context'
import ReinsuranceContextProvider from '@/app/context/ReinsuranceContext'
import StatisticalProvider from '@/app/context/StatisticalContext'

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ContextProvider>
      <ClaimsContextProvider>
        <ReinsuranceContextProvider>
          <StatisticalProvider>{children}</StatisticalProvider>
        </ReinsuranceContextProvider>
      </ClaimsContextProvider>
    </ContextProvider>
  )
}

export default AppContextProvider
