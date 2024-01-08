import { GoogleLogin } from "@react-oauth/google";
// eslint-disable-next-line camelcase
import { jwtDecode } from "jwt-decode";

const GoogleButton = () => {
  return (
    <div className=" flex items-center justify-center">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          console.log(credentialResponse);
          const decodeding = jwtDecode(credentialResponse.credential!);
          console.log(decodeding);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default GoogleButton;
