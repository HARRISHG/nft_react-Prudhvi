import { createContext, useState } from "react";

export const AdminSignInContex = createContext();

export const AdminSignProvider = (props) => {
  const [user_logged_in, set_user_logged_in] = useState(
    JSON.parse(sessionStorage.getItem(["auth"]))
      ? JSON.parse(sessionStorage.getItem(["auth"]))
      : { user: "guest", role: "guest" }
  );
  return (
    <AdminSignInContex.Provider value={[user_logged_in, set_user_logged_in]}>
      {props.children}
    </AdminSignInContex.Provider>
  );
};

export const MetaMaskUserAddressContext = createContext();

export const MetaMaskUserAddressProvider = (props) => {
  const [MetaMaskUserAddress, SetMetaMaskUserAddress] = useState(
    sessionStorage.getItem(["MetaMaskUserAddress"])
      ? sessionStorage.getItem(["MetaMaskUserAddress"])
      : ""
  );
  return (
    <MetaMaskUserAddressContext.Provider
      value={[MetaMaskUserAddress, SetMetaMaskUserAddress]}
    >
      {props.children}
    </MetaMaskUserAddressContext.Provider>
  );
};
