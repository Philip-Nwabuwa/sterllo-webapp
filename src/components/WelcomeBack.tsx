import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

// Zod schema for form validation
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email or username is required")
    .refine(
      (value) => {
        // Allow either email format or username (no @ symbol)
        return value.includes("@")
          ? z.string().email().safeParse(value).success
          : value.length >= 3;
      },
      {
        message: "Please enter a valid email or username (min 3 characters)",
      }
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

// Reusable Components
import Logo from "./common/Logo";

// SVG Assets - Local imports
import bgImage from "../assets/images/bg-image.svg";
import securityIcon from "../assets/icons/security-icon.svg";
import emailIcon from "../assets/icons/email-icon.svg";
import passwordIcon from "../assets/icons/password-icon.svg";

export default function WelcomeBack() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log("Login data:", data);
      // TODO: Implement actual login logic
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      // Navigate to dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
    // TODO: Implement forgot password logic
  };

  const handleCreateAccount = () => {
    console.log("Create account clicked");
    // TODO: Navigate to signup page
  };

  return (
    <div
      className="bg-white grid grid-cols-[538px_1fr] h-screen"
      data-name="WelcomeBack"
    >
      {/* Left Panel - Branding */}
      <div
        className="relative box-border content-stretch flex flex-col h-full items-center justify-between overflow-hidden px-0 py-12"
        data-name="LeftPanel"
      >
        {/* Background Image */}
        <div
          className="absolute h-[1092px] left-[-355px] top-0 w-[1456px]"
          data-name="BackgroundImage"
        >
          <img alt="" className="block max-w-none size-full" src={bgImage} />
        </div>

        {/* Logo */}
        <Logo className="h-6 overflow-hidden relative shrink-0 w-[102px] z-10" />

        {/* Copyright */}
        <div className="flex flex-col font-['Nunito',sans-serif] font-normal justify-end leading-none relative shrink-0 text-[#a2a2a2] text-base text-nowrap tracking-[0.024px] z-10">
          <p className="leading-[25.6px] whitespace-pre">
            © 2025 Redbiller. All rights reserved
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div
        className="bg-[#181A0E] box-border content-stretch flex flex-col gap-12 h-full items-center justify-center overflow-hidden p-[72px]"
        data-name="RightPanel"
      >
        {/* Welcome Message */}
        <div
          className="content-stretch flex flex-col gap-8 items-center relative shrink-0 w-[400px]"
          data-name="WelcomeMessage"
        >
          <div className="flex flex-col font-['Nunito',sans-serif] font-bold justify-end leading-none relative shrink-0 text-5xl text-nowrap text-white tracking-[0.12px]">
            <h1 className="leading-[57.6px] whitespace-pre">Welcome back 👋</h1>
          </div>

          {/* URL Confirmation */}
          <div
            className="content-stretch flex flex-col gap-4 items-center justify-center relative shrink-0 w-full"
            data-name="URLConfirmation"
          >
            <div className="flex flex-col font-['Nunito',sans-serif] font-normal justify-end leading-none min-w-full relative shrink-0 text-sm text-[#c0c0c0] text-center tracking-[-0.28px] w-[min-content]">
              <p className="leading-[22.4px]">
                Kindly confirm that you you're on
              </p>
            </div>
            <div
              className="bg-[#252a09] border-[#97ab27] border-[0.5px] border-solid box-border content-stretch flex gap-2 items-center justify-center px-8 py-2 relative rounded-full shrink-0"
              data-name="URLContainer"
            >
              <div
                className="relative shrink-0 size-6"
                data-name="SecurityIcon"
              >
                <img
                  alt="Security"
                  className="block max-w-none size-full"
                  src={securityIcon}
                />
              </div>
              <div className="flex flex-col font-['Nunito',sans-serif] font-normal justify-end leading-none relative shrink-0 text-base text-nowrap text-white tracking-[0.024px]">
                <p className="leading-[25.6px] whitespace-pre">
                  https://app.sterllo.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="content-stretch flex flex-col gap-8 items-center relative shrink-0 w-[400px]"
          data-name="FormContainer"
        >
          {/* Input Fields */}
          <div
            className="content-stretch flex flex-col gap-4 items-start relative shrink-0 w-full"
            data-name="InputFields"
          >
            {/* Email/Username Field */}
            <div
              className="content-stretch flex flex-col items-start relative shrink-0 w-full"
              data-name="EmailField"
            >
              <div
                className="box-border content-stretch flex gap-1 items-center p-1 relative shrink-0 w-full"
                data-name="Label"
              >
                <label className="font-['Nunito',sans-serif] font-normal leading-[22.4px] relative shrink-0 text-[#a2a2a2] text-sm text-nowrap tracking-[-0.28px] whitespace-pre">
                  Username / Email
                </label>
              </div>
              <div
                className="bg-[#181818] border-[#313131] border-[0.5px] border-solid box-border content-stretch flex gap-2 items-center p-4 relative rounded-2xl shrink-0 w-full"
                data-name="EmailInput"
              >
                <div className="relative shrink-0 size-5" data-name="EmailIcon">
                  <img
                    alt="Email"
                    className="block max-w-none size-full"
                    src={emailIcon}
                  />
                </div>
                <input
                  {...register("email")}
                  type="text"
                  placeholder="johndoe@youremail.com"
                  className="basis-0 bg-transparent grow h-[23px] min-h-px min-w-px relative shrink-0 font-['Nunito',sans-serif] font-normal leading-[22.4px] text-sm tracking-[-0.28px] text-white placeholder:text-[#494949] border-none outline-none"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1 font-['Nunito',sans-serif]">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div
              className="content-stretch flex flex-col items-start relative shrink-0 w-full"
              data-name="PasswordField"
            >
              <div
                className="box-border content-stretch flex gap-1 items-center p-1 relative shrink-0 w-full"
                data-name="Label"
              >
                <label className="font-['Nunito',sans-serif] font-normal leading-[22.4px] relative shrink-0 text-[#a2a2a2] text-sm text-nowrap tracking-[-0.28px] whitespace-pre">
                  Password
                </label>
              </div>
              <div
                className="bg-[#181818] border-[#313131] border-[0.5px] border-solid box-border content-stretch flex gap-2 items-center p-4 relative rounded-2xl shrink-0 w-full"
                data-name="PasswordInput"
              >
                <div
                  className="relative shrink-0 size-5"
                  data-name="PasswordIcon"
                >
                  <img
                    alt="Password"
                    className="block max-w-none size-full"
                    src={passwordIcon}
                  />
                </div>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className="basis-0 bg-transparent grow h-[23px] min-h-px min-w-px relative shrink-0 font-['Nunito',sans-serif] font-normal leading-[22.4px] text-sm tracking-[-0.28px] text-white placeholder:text-[#494949] border-none outline-none"
                />
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1 font-['Nunito',sans-serif]">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <button
              type="button"
              onClick={handleForgotPassword}
              className="box-border content-stretch flex gap-2 items-center justify-center overflow-hidden px-5 py-2.5 relative rounded-full shrink-0 w-full hover:bg-[#1a1a1a] transition-colors"
              data-name="ForgotPasswordButton"
            >
              <div
                className="box-border content-stretch flex gap-1 items-center justify-center px-1 py-0 relative shrink-0"
                data-name="TextContainer"
              >
                <p className="font-['Nunito',sans-serif] leading-[16.8px] relative shrink-0 text-[#bad133] text-sm text-nowrap tracking-[0.14px] whitespace-pre">
                  Forgot Password?
                </p>
              </div>
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#D3F60B] border-[#97ab27] border-[0.5px] border-solid relative rounded-full shrink-0 w-full hover:bg-[#a5bc2e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            data-name="LoginButton"
          >
            <div className="box-border content-stretch flex gap-2 items-center justify-center overflow-hidden px-10 py-5 relative rounded-[inherit] w-full">
              <div
                className="box-border content-stretch flex gap-1 items-center justify-center px-1 py-0 relative shrink-0"
                data-name="TextContainer"
              >
                <p className="font-['Nunito',sans-serif] font-semibold leading-[21.6px] relative shrink-0 text-[#262b0a] text-lg text-nowrap tracking-[0.18px] whitespace-pre">
                  {isSubmitting ? "Logging in..." : "Login"}
                </p>
              </div>
            </div>
          </button>

          {/* Create Account Link */}
          <button
            type="button"
            onClick={handleCreateAccount}
            className="box-border content-stretch flex gap-2 items-center justify-center overflow-hidden px-6 py-3 relative rounded-full shrink-0 w-full hover:bg-[#1a1a1a] transition-colors"
            data-name="CreateAccountButton"
          >
            <div
              className="box-border content-stretch flex gap-1 items-center justify-center px-1 py-0 relative shrink-0"
              data-name="TextContainer"
            >
              <p className="font-['Nunito',sans-serif] font-semibold leading-[21.6px] relative shrink-0 text-[#717171] text-lg text-nowrap tracking-[0.18px] whitespace-pre">
                <span>Don't have an account? </span>
                <span className="text-[#bad133]">Create Account</span>
              </p>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
