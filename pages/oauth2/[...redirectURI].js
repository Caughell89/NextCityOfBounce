import { useRouter } from "next/router";
import { ACCESS_TOKEN } from "../../util/constants";
import LoadingIndicator from "../../components/LoadingIndicator";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Auth() {
  const { status } = useContext(UserContext);

  const router = useRouter();
  const token = router.query.token;
  if (token) {
    localStorage.setItem(ACCESS_TOKEN, token);
    router.push("/");
    status.loadUser();
  }
  return (
    <div>
      <LoadingIndicator />
    </div>
  );
}
