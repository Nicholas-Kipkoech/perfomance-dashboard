"use client";
import { useContextApi } from "@/app/context/Context";
import CustomCard from "@/app/UI/reusableComponents/CustomCard";
import React from "react";

const Claims = () => {
  const {
    totalClaimPaid,
    totalClaims,
    totalRegisteredClaims,
    totalOutstanding,
    totalCount: totalOutstandingCount,
    totalSalvages,
    totalRecovery,
    fromDate,
    branchCode,
    toDate,
  }: any = useContextApi();
  const salvagesReport = `http://192.168.1.112:8001/icon/reports?p_module_name=CM_PAID_CLMS&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=CM.MGR&p_org_code=50&p_menu_code=CM000032&p_grp_code=CM.MGR&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=CLAIMS%20PAID%20REPORT&P_ORG_CODE=50&P_CLASS=&P_SUBCLASS=&P_BRANCH=${branchCode}&P_CATEGORY=&P_INTERMEDIARY=&P_SCATEGORY=&P_SENTITY=&P_CLIENT=&P_PAYMENT_MODE=&P_SOURCE=&P_FM_DT=${fromDate}&P_TO_DT=${toDate}&P_RESERVE_TYPE=`;
  const registeredClaimsReports = `http://192.168.1.112:8001/icon/reports?p_module_name=CM_CLMS_REGISTERED&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=CM.MGR&p_org_code=50&p_menu_code=CM000031&p_grp_code=CM.MGR&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=REGISTERED%20CLAIMS%20REPORT&P_ORG_CODE=50&P_BRANCH=${branchCode}&P_CURRENCY=&P_CLASS=&P_SUBCLASS=&P_CATEGORY=&P_AGENT=&P_CLIENT=&P_LOSS_CAUSE=&P_RESERVE_TYPE=&P_FM_DT=${fromDate}&P_TO_DT=${toDate}`;
  const outstandingReport = `http://192.168.1.112:8001/icon/reports?p_module_name=CM_OUTS_CLMS_COMBINED&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=CM.MGR&p_org_code=50&p_menu_code=CM000030&p_grp_code=CM.MGR&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=CLAIMS%20OUTSTANDING%20COMBINED%20RESERVES%20REPORT&P_ORG_CODE=50&P_BRANCH_GROUP=&P_BRANCH=${branchCode}&P_CLASS=&P_SUBCLASS=&P_CATEGORY=&P_AGENT=&P_CLIENT=&P_LOSS_CAUSE=&P_RESERVE_TYPE=&P_ASATDATE=${toDate}&P_AMOUNT=0&P_SHOW_TOTS=N`;
  const paidClaimsLink = `http://192.168.1.112:8001/icon/reports?p_module_name=CM_PAID_CLMS_SUMMARY&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=CM.MGR&p_org_code=50&p_menu_code=CM000032&p_grp_code=CM.MGR&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=CLAIMS%20PAID%20SUMMARY&P_ORG_CODE=50&P_BRANCH_GROUP=${branchCode}&P_FM_DT=${fromDate}&P_TO_DT=${toDate}`;
  const riReportLink = `http://192.168.1.112:8001/icon/reports?p_module_name=RI_PAID_CESSIONS_SUM&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=RI.MGR&p_org_code=50&p_menu_code=RI000013&p_grp_code=RI.MGR&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=PAID%20CESSION%20SUMMARY%20CLASSWISE&P_ORG_CODE=50&P_FM_DT=${fromDate}&P_TO_DT=${toDate}`;
  return (
    <div>
      <div className="flex flex-wrap gap-3 h-auto  overflow-auto  border-b-slate-800 p-2">
        <CustomCard
          name={"Registered  Claims"}
          total={totalRegisteredClaims}
          currency
          link={registeredClaimsReports}
          color={"#E178C5"}
        />
        <CustomCard
          link={paidClaimsLink}
          name={"Paid  Claims"}
          totalNumber={totalClaims}
          total={totalClaimPaid}
          currency
          color={"#E178C5"}
        />
        <CustomCard
          name={"Outstanding Claims"}
          totalNumber={totalOutstandingCount}
          total={totalOutstanding}
          currency
          color={"#E178C5"}
          link={outstandingReport}
        />
        <CustomCard
          link={salvagesReport}
          name={"Salvages"}
          totalNumber={0}
          total={totalSalvages}
          currency
          color={"#FF8080"}
        />
        <CustomCard
          name={"RI Recovery"}
          totalNumber={0}
          total={totalRecovery}
          currency
          color={"#FF8080"}
          link={riReportLink}
        />
      </div>
    </div>
  );
};

export default Claims;
