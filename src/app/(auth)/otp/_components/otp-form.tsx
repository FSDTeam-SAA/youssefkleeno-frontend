"use client";

import {
  useState,
  useRef,
  useEffect,
  type KeyboardEvent,
  type ClipboardEvent,
} from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

export default function OtpForm() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const decodedEmail = decodeURIComponent(email || "");
  const router = useRouter();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: (values: { otp: string; email: string }) =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-code`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => res.json()),
    onSuccess: (data) => {
      if (!data?.status) {
        toast.error(data?.message || "Something went wrong");
        return;
      }
      toast.success(data?.message || "Email verified successfully!");
      router.push("/");
    },
  });

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);
      if (inputRefs.current[5]) {
        inputRefs.current[5].focus();
      }
    }
  };

  const handleVerify = () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter all 6 digits of the OTP.");
      return;
    }
    mutate({ otp: otpValue, email: decodedEmail });
  };

  return (
    <div className="w-full md:w-[480px] lg:w-[520px] p-6 md:p-8 rounded-2xl bg-white shadow-lg border border-gray-100">
      <h3 className="text-2xl md:text-3xl mb-9 font-semibold text-[#499FC0] text-center leading-tight">
        Enter OTP
      </h3>

      <div className="pt-6 flex flex-col gap-6">
        {/* OTP Input Fields */}
         
        <div className="flex gap-3 md:gap-4 justify-center">
          {otp.map((digit, index) => (
            <Input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              className={`w-12 h-14 md:w-14 md:h-16 text-center text-xl font-semibold rounded-lg border ${
                digit
                  ? "border-[#499FC0] text-[#499FC0]"
                  : "border-gray-300 text-gray-600"
              } focus:ring-2 focus:ring-[#499FC0] focus:border-[#499FC0] transition-all`}
              aria-label={`OTP digit ${index + 1}`}
            />
          ))}
        </div>

        {/* Verify Button */}
        <Button
          disabled={isPending}
          onClick={handleVerify}
          className="text-base font-medium w-full h-12 md:h-14 rounded-lg bg-[#499FC0] hover:bg-[#499FC0]/90 text-white transition"
        >
          {isPending ? "Continue..." : "Continue"}
        </Button>

        {/* Resend option */}
        {/* <p className="text-sm text-gray-500 text-center">
          Didn’t receive the code?{" "}
          <button className="text-[#499FC0] font-medium hover:underline">
            Resend OTP
          </button>
        </p> */}
      </div>
    </div>
  );
}
