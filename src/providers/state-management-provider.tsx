import { jotaiStore } from "@/stores/jotai-store";
import { Provider } from "jotai";

const StateManagementProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Provider store={jotaiStore}>{children}</Provider>;
};

export default StateManagementProvider;
