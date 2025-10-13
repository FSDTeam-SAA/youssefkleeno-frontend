"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "sonner";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

// ---------- Zod Schema ----------
const formSchema = z.object({
  code: z.string().min(2, {
    message: "Promo code must be at least 2 characters.",
  }),
});

interface MonthlyPaymentDiscountProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNext: () => void;
  bookingId: string;
  totalPrice: number;
}

const OneTimePaymentDiscount = ({
  open,
  onOpenChange,
  onNext,
  bookingId,
  totalPrice,
}: MonthlyPaymentDiscountProps) => {
  const [paymentIntentClientSecret, setPaymentIntentClientSecret] =
    useState("");
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(totalPrice);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { code: "" },
  });

  // console.log(totalPrice)

  const total = discountPrice ? discountPrice : totalPrice;

  // ---------- Apply Promo Code ----------
  const { mutate: applyPromo, isPending } = useMutation({
    mutationKey: ["apply-discount"],
    mutationFn: (values: z.infer<typeof formSchema>) =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/promo-code/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }).then((res) => res.json()),
    onSuccess: (data) => {
      setDiscountPrice(data?.data?.price);
      if (data.success) {
        toast.success("Promo code applied successfully!");
        form.reset();
      } else {
        toast.error(data.message || "Invalid promo code");
      }
    },
  });

  // ---------- Create Payment Intent ----------
  const { mutate: createPayment, isPending: paymentPending } = useMutation({
    mutationKey: ["payment"],
    mutationFn: ({
      bookingId,
      amount,
      userId,
    }: {
      bookingId: string;
      amount: number;
      userId: string;
    }) =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/create-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, amount, userId }),
      }).then((res) => res.json()),
    onSuccess: (data) => {
      if (data?.success) {
        const fullId = data.data.transactionId;
        // example: "pi_3SHbkKCctG7Qj84q0GBGJtpa_secret_mnUWe6VInJxoX248Sd4odGQRh"
        setPaymentIntentClientSecret(fullId);
        setShowStripeModal(true);
        // toast.success("Payment intent created!");
      } else {
        toast.error(data.message || "Failed to create payment intent");
      }
    },
  });

  // ---------- Confirm Payment API ----------
  const confirmPaymentMutation = useMutation({
    mutationKey: ["confirm-payment"],
    mutationFn: (paymentIntentId: string) =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/confirm-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentIntentId }),
      }).then((res) => res.json()),
    onSuccess: (data) => {
      if (data.success) {
        // toast.success("Payment confirmed!");
        setShowStripeModal(false);
        onNext();
      } else {
        toast.error(data.message || "Payment confirmation failed");
      }
    },
  });

  // ---------- Handle Promo Submit ----------
  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = { code: values.code, bookingId };
    applyPromo(payload);
  }

  // ---------- Handle Pay Button ----------
  const handlePay = () => {
    createPayment({
      bookingId,
      amount: total,
      userId: "68a9310b60a8cc4db5a8b6cf",
    });
  };

  return (
    <>
      {/* ---------- Payment Details Modal ---------- */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="space-y-0 gap-0">
          <h4 className="text-2xl md:text-[28px] font-semibold text-black text-center">
            Payment Details
          </h4>

          <div className="pt-5 md:pt-6 lg:pt-8">
            <h3 className="text-lg font-medium text-[#2F2F2F]">
              Order Summary
            </h3>
            <div className="flex items-center justify-between pt-3 md:pt-4">
              <span className="text-base font-normal text-[#3E3E3E]">
               One-time wash by car
              </span>
              <span className="text-base font-semibold text-black">$ {totalPrice}</span>
            </div>

            <p className="text-base font-normal text-[#505050] py-3">
              Includes 1 wash
            </p>

            {/* Promo Code */}
            <div className="border-b border-[#0000001A] pb-5">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="w-full flex items-center border border-gray-300 rounded-[6px] overflow-hidden">
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              {...field}
                              className="w-full h-[65px] border border-[#499FC066] bg-[#499FC01A] rounded-l-[6px] py-3 px-4 text-base font-medium text-[#333333]"
                              placeholder="Enter Promo Code"
                            />
                          </FormControl>
                          <FormMessage className="text-sm text-red-500 mt-1" />
                        </FormItem>
                      )}
                    />
                    <button
                      disabled={isPending}
                      type="submit"
                      className="h-[65px] bg-[#499FC0] rounded-r-[6px] px-7 text-base font-medium text-white"
                    >
                      {isPending ? "Applying..." : "Apply"}
                    </button>
                  </div>
                </form>
              </Form>
            </div>

            <div className="flex justify-between text-lg font-semibold mt-4 pb-6">
              <span>Total</span>
              <span className="text-[#499FC0]">${discountPrice}</span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={paymentPending}
            className="w-full h-[55px] text-white text-lg font-semibold"
            style={{ backgroundColor: "#499FC0" }}
            onClick={handlePay}
          >
            {paymentPending ? "Processing..." : `Pay $${discountPrice}`}
          </Button>
        </DialogContent>
      </Dialog>

      {/* ---------- Stripe Modal ---------- */}
      {showStripeModal && paymentIntentClientSecret && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: paymentIntentClientSecret }}
        >
          <StripePaymentModal
            open={showStripeModal}
            onClose={() => setShowStripeModal(false)}
            clientSecret={paymentIntentClientSecret}
            onConfirm={confirmPaymentMutation.mutate}
            amount={total}
          />
        </Elements>
      )}
    </>
  );
};

export default OneTimePaymentDiscount;

// ---------- Stripe Modal Component ----------
interface StripePaymentModalProps {
  open: boolean;
  onClose: () => void;
  clientSecret: string;
  onConfirm: (paymentIntentId: string) => void;
  amount: number;
}

const StripePaymentModal = ({
  open,
  onClose,
  // clientSecret,
  onConfirm,
  amount,
}: StripePaymentModalProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleConfirm = async () => {
    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (result.error) {
      toast.error(result.error.message || "Payment failed");
    } else if (result.paymentIntent) {
      toast.success("Payment successful!");
      const paymentIntentId = result.paymentIntent.id;
      onConfirm(paymentIntentId);
      // onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] mx-auto">
        <p className="text-2xl md:text-[28px] lg:text-[32px] font-semibold text-black leading-[150%] text-center">
          Payment Details
        </p>
        <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-black leading-[150%] text-center -mt-2">
          Total Amount : ${amount}
        </p>
        <div className="max-h-[500px] overflow-y-auto p-4 rounded-lg ">
          <PaymentElement />
        </div>
        <Button
          className="w-full mt-6 bg-[#499FC0] text-white font-semibold"
          onClick={handleConfirm}
        >
          Confirm Payment
        </Button>
      </DialogContent>
    </Dialog>
  );
};















// "use client";
// import { Dialog, DialogContent } from "@/components/ui/dialog";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useMutation } from "@tanstack/react-query";

// const formSchema = z.object({
//   code: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// });

// interface MonthlyPaymentDiscountProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onNext: () => void;
//   bookingId: string;
// }

// const OneTimePaymentDiscount = ({
//   open,
//   onOpenChange,
//   onNext,
//   bookingId,
// }: MonthlyPaymentDiscountProps) => {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       code: "",
//     },
//   });
//   const total = 29;


// // apply promo code 
//   const {mutate, isPending} = useMutation({
//     mutationKey : ["apply-discount"],
//     mutationFn: (values: z.infer<typeof formSchema>)=>fetch(`${process.env.NEXT_PUBLIC_API_URL}/promo-code/validate`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(values),
//     }).then((res)=>res.json())
//   })


// //   payment api call 
//  const {mutate: paymentApi, isPending: paymentPending} = useMutation({
//     mutationKey : ["payment"],
//     mutationFn: ({bookingId, amount, userId}:{bookingId: string, amount: number, userId: string})=>fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/create-payment`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({bookingId, amount, userId}),
//     }).then((res)=>res.json())
//   })

//   // 2. Define a submit handler.
//   function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log(values);
//     const payload = {
//       code: values?.code,
//       bookingId: bookingId,
//     }
//     mutate(payload)
//   }

//   const handlePay = () => {
//     onNext();
//     onOpenChange(false);
//     paymentApi({
//       bookingId: bookingId,
//       amount: total,
//       userId : "68a9310b60a8cc4db5a8b6cf"
//     })
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="space-y-0 gap-0">
//         <h4 className="text-2xl md:text-[28px] lg:text-[32px] font-semibold text-black leading-[150%] text-center">
//           Payment Details
//         </h4>

//         <div className="pt-5 md:pt-6 lg:pt-8">
//           <h3 className="text-lg md:text-xl font-medium text-[#2F2F2F] leading-[120%]">
//             Order Summary
//           </h3>
//           <div className="flex items-center justify-between pt-3 md:pt-4 lg:pt-6">
//             <span className="text-base md:text-lg font-normal text-[#3E3E3E] leading-[120%]">
//               One-time wash by car
//             </span>
//             <span className="text-base md:text-lg font-semibold text-black leading-[120%]">
//               $29
//             </span>
//           </div>
//           <p className="text-base font-normal text-[#505050] leading-[120%] py-2 md:py-3 lg:py-4">
//             Includes 1 wash
//           </p>
//           <div className="border-b border-[#0000001A] pb-4 md:pb-5 lg:pb-6">
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-8"
//               >
//                 <div className="w-full flex items-center border border-gray-300 rounded-[6px] overflow-hidden">
//                   <FormField
//                     control={form.control}
//                     name="code"
//                     render={({ field }) => (
//                       <FormItem className="flex-1">
//                         <FormControl>
//                           <Input
//                             {...field}
//                            className="w-full h-[65px] border border-[#499FC066] bg-[#499FC01A] rounded-l-[6px] py-3 md:py-4 px-3 md:px-4 text-base font-medium text-[#333333] leading-[120%] focus:outline-none focus:ring-0"
//                             placeholder="Enter Promo Code"
//                           />
//                         </FormControl>
//                         <FormMessage className="text-sm text-red-500 mt-1" />
//                       </FormItem>
//                     )}
//                   />
//                   <button
//                     disabled={isPending}
//                     type="submit"
//                     className="h-[65px] bg-[#499FC0] rounded-r-[6px]  px-5 md:px-7 lg:px-[49px] text-base font-medium text-white leading-[120%]" 
//                   >
//                     Apply
//                   </button>
//                 </div>
//               </form>
//             </Form>
//           </div>

//           <div className="flex justify-between text-lg font-semibold mt-4 pb-4 md:pb-6 lg:pb-8">
//             <span className="text-lg md:text-xl font-semibold text-black leading-[120%]">Total</span>
//             <span className="text-lg md:text-xl font-semibold text-[#499FC0] leading-[120%]">${total}</span>
//           </div>
//         </div>

//         <Button
//           type="submit"
//           disabled={paymentPending}
//           className="w-full h-[55px] text-white text-lg font-semibold"
//           style={{ backgroundColor: "#499FC0" }}
//           onClick={handlePay}
//         >
//           Pay ${total}
//         </Button>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default OneTimePaymentDiscount;