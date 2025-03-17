import ClaimsContextProvider from "@/app/context/ClaimsContext";
import ContextProvider from "@/app/context/Context";
import FinanceContextProvider from "@/app/context/FinanceContext";
import InvestmentContextProvider from "@/app/context/InvestmentContext";
import ReinsuranceContextProvider from "@/app/context/ReinsuranceContext";
import StatisticalProvider from "@/app/context/StatisticalContext";

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ContextProvider>
      <InvestmentContextProvider>
        <ClaimsContextProvider>
          <ReinsuranceContextProvider>
            <FinanceContextProvider>
              <StatisticalProvider>{children}</StatisticalProvider>
            </FinanceContextProvider>
          </ReinsuranceContextProvider>
        </ClaimsContextProvider>
      </InvestmentContextProvider>
    </ContextProvider>
  );
};

export default AppContextProvider;
