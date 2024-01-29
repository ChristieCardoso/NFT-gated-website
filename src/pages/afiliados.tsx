import {
  useAddress,
  useMetamask,
  useLogin,
  useLogout,
  useUser,
} from "@thirdweb-dev/react";

export default function Home() {
  const address = useAddress();
  const connect = useMetamask();
  const { login } = useLogin();
  const { logout } = useLogout();
  const { user, isLoggedIn } = useUser();

  return (
    <div>
      {isLoggedIn ? (
        <button onClick={() => logout()}>Logout</button>
      ) : address ? (
        <button onClick={() => login()}>Login</button>
      ) : (
        <button onClick={() => connect()}>Connect</button>
      )}

      <pre>Connected Wallet: {address}</pre>
      <pre>User: {user?.address || "N/A"}</pre>
    </div>
  );
}
