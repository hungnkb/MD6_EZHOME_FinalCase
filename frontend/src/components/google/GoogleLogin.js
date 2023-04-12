import { GoogleLogin } from 'react-google-login';

const GoogleButton = () => {
    const responseGoogle = (response) => {
        console.log(response);
        // Lấy mã truy cập từ response.accessToken
    };

    return (
        <GoogleLogin
            clientId="1079258411381-d7dle0hglsh47e6icqdetrtqh3jj6e47.apps.googleusercontent.com"
            buttonText="Đăng nhập bằng Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    );
};

export default GoogleButton;