import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/user/userSlice";

export default function OAuth() {
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(loginSuccess(data));
    } catch (error) {
      console.log("Couldn't Procced With Google", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white uppercase rounded-lg p-3 hover:opacity-95"
    >
      continue with google
    </button>
  );
}
