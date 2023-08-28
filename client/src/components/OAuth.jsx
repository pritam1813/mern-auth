import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  const navgate = useNavigate();
  const SITE_KEY = import.meta.env.VITE_SITE_KEY;

  const handleGoogleClick = async () => {
    let recaptchaToken;
    await new Promise((resolve) => {
      grecaptcha.enterprise.ready(async () => {
        recaptchaToken = await grecaptcha.enterprise.execute(SITE_KEY, {
          action: "GOOGLE_SIGN_IN",
        });
        resolve();
      });
    });

    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
          recaptchaToken,
        }),
      });
      const data = await res.json();
      dispatch(loginSuccess(data));
      navgate("/");
    } catch (error) {
      console.log("Couldn't Procced With Google", error);
    }
  };
  return (
    <button
      type="button"
      data-sitekey={SITE_KEY}
      data-callback="onSubmit"
      data-action="GOOGLE_SIGN_IN"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white uppercase rounded-lg p-3 hover:opacity-95 g-recaptcha"
    >
      continue with google
    </button>
  );
}
