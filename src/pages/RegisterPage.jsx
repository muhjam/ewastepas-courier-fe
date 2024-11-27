import { useEffect, useState } from "react";
import Logo from '../assets/logo.png';
import Slide2 from '../assets/vertical-slide-2.png';
import InputEmail from '../components/Input/InputEmail';
import InputPassword from '../components/Input/InputPassword';
import InputCheck from '../components/Input/InputCheck';
import FooterBar from '../components/Register/FooterBar';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../constants/regex';
import { registration, sendOtp } from "../services";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        tnc: ""
    });

    useEffect(() => {
        document.title = "E-Wastepas | Register";
    }, []);

    const validateEmail = (value) => {
        if (!value) {
            setErrorMessage((prev) => ({
                ...prev,
                email: "Email tidak boleh kosong"
            }));
        }else if (!EMAIL_REGEX.test(value)) {
            setErrorMessage((prev) => ({
                ...prev,
                email: "Email tidak valid"
            }));
        } else {
            setErrorMessage((prev) => ({
                ...prev,
                email: ""
            }));
        }
    };

    const validatePassword = (value) => {
        if (!value) {
            setErrorMessage((prev) => ({
                ...prev,
                password: "Kata sandi tidak boleh kosong",
            }));
        }else if (!PASSWORD_REGEX.test(value)) {
            setErrorMessage((prev) => ({
                ...prev,
                password: "Kata sandi tidak valid",
            }));
        } else {
            setErrorMessage((prev) => ({
                ...prev,
                password: "",
            }));
        }
    };

    const validateConfrimPassword = (value) => {
        if (!value) {
            setErrorMessage((prev) => ({
                ...prev,
                confirmPassword: "Konfirmasi kata sandi tidak boleh kosong"
            }));
        }else if (password !== value) {
            setErrorMessage((prev) => ({
                ...prev,
                confirmPassword: "Konfirmasi kata sandi tidak valid",
            }));
        } else {
            setErrorMessage((prev) => ({
                ...prev,
                confirmPassword: ""
            }));
        }
    };

    const handleRegister = async () => {
        validateEmail(email)
        validatePassword(password)
        validateConfrimPassword(confirmPassword)
        if (!agreeToTerms) {
            setErrorMessage((prev) => ({
                ...prev,
                tnc: "Anda harus menyetujui syarat dan kebijakan privasi"
            }));
        }

        if(isDisabled){
            return;
        }

        const payload = { email, password, confirm_password: confirmPassword };

        setIsLoading(true);

        try {
            const response = await registration(payload);
            if (response.status === 201 || response.status === 200) {
                const newExpiredOtp = new Date(new Date().getTime() + 60 * 3000);
                sessionStorage.setItem("expiredOtp", newExpiredOtp);

                window.location.href = "/register/verification?email=" + email;
            } else if (response.response.data.error === "Your account has not been verified") {
                await sendOtp({ email });
                sessionStorage.removeItem("expiredOtp");

                window.location.href = "/register/verification?email=" + email;
            } else {
                setError(response.response.data.error);
                setSuccess(null);
                sessionStorage.removeItem("expiredOtp");
            }
        } catch {
            setError("Terjadi kesalahan saat registrasi. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };
    const isDisabled =
        !email ||
        !password ||
        !confirmPassword ||
        !agreeToTerms ||
        isLoading ||
        errorMessage.email ||
        errorMessage.password ||
        errorMessage.confirmPassword;
        
    return (
        <div className="h-[100dvh] p-[8px] md:p-[100px] flex justify-center md:items-center">
            <div className="w-1/2 md:p-[10px] lg:p-[52px] hidden lg:block">
                <img src={Slide2} className="max-h-[90vh]" alt="Slide" />
            </div>
            <div className="text-center w-full lg:w-1/2">
                <div className="flex justify-center">
                    <img src={Logo} className="w-[340px]" alt="Logo" />
                </div>
                <div>
                    <div className="text-start mb-[24px]">
                        <h1 className="text-[40px] font-[600]">Registrasi</h1>
                        <span className="text-[16px] font-[400] text-revamp-neutral-7">Mari siapkan semuanya agar Anda dapat mengakses akun Anda</span>
                    </div>
                    {error && <div className="text-white bg-revamp-error-300 py-[8px] mb-[18px] rounded-[6px]">{error}</div>}
                    {success && <div className="text-white bg-revamp-success-300 py-[8px] mb-[18px] rounded-[6px]">{success}</div>}
                    <div className="mb-[24px]">
                        <InputEmail
                            label={'Email'}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            errorMessage={errorMessage.email}
                        />
                        <InputPassword
                            label={'Kata Sandi'}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                validatePassword(e.target.value);
                            }}
                            errorMessage={errorMessage.password}
                            isValidateCheck={true}
                        />
                        <InputPassword
                            label={'Konfirmasi Kata Sandi'}
                            value={confirmPassword}
                            onChange={(e) => {setConfirmPassword(e.target.value); validateConfrimPassword(e.target.value)}}
                            errorMessage={errorMessage.confirmPassword}
                        />
                        <div>
                            <InputCheck
                                label={<span>Saya menyetujui semua <a href="#" className="text-revamp-red-700 font-[500]">Syarat</a> dan <a href="#" className="text-revamp-red-700 font-[500]">Kebijakan Privasi</a></span>}
                                value={agreeToTerms}
                                onChange={(e) => setAgreeToTerms(e.target.checked)}
                                errorMessage={errorMessage.tnc}
                            />
                        </div>
                    </div>
                    <div className="mb-[24px]">
                        <button
                             className={`${isLoading ? 'bg-revampV2-neutral-400' : 'bg-revamp-secondary-500'} w-full py-[8px] text-white text-[14px] font-[600]`}
                            onClick={handleRegister}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading...' : 'Buat Akun'}
                        </button>
                        <div className="flex justify-center items-center mt-[10px]">
                            <span className="text-revamp-neutral-10 font-[500] text-[14px]">Anda sudah memiliki akun? <a href="/login" className="text-revamp-error-300">Login</a></span>
                        </div>
                    </div>
                    <FooterBar />
                </div>
            </div>
        </div>
    );
}
