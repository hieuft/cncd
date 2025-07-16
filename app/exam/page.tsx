"use client";

import { title } from "@/components/primitives";
import { InputOtp, Button, Input, CircularProgress } from "@heroui/react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function ExamPage() {
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="h-full w-full flex items-center justify-center bg-blue-50">
      <div className="flex flex-col gap-10 items-center p-12 rounded-lg bg-white shadow">
        <div
          className={
            "fixed top-0 left-0 ring-0 bottom-0 w-full h-full z-40 flex justify-center items-center" +
            (loading ? "" : " hidden")
          }
        >
          <div className="relative w-full h-full bg-black opacity-40"></div>
          <div className="absolute bg-white p-8 rounded-lg flex justify-center items-center flex-col gap-4">
            <CircularProgress aria-label="Loading..." size="lg" />
            Đang lấy dữ liệu
          </div>
        </div>

        <div className="text-3xl">Mã dự thi</div>
        <div className="[&>*]:items-center">
          <InputOtp
            classNames={{
              segmentWrapper: "gap-x-3",
              segment: [
                "relative",
                "h-10",
                "w-10",
                "border-y",
                "border-x",
                "border-default-200",
                "data-[active=true]:border",
                "data-[active=true]:z-20",
                "data-[active=true]:ring-2",
                "data-[active=true]:ring-offset-2",
                "data-[active=true]:ring-offset-background",
                "data-[active=true]:ring-foreground",
              ],
            }}
            length={6}
            value={value}
            onInput={(e) => {
              setValue(e.target.value.toUpperCase());
            }}
            allowedKeys="^[a-zA-Z0-9]*$"
            size="lg"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <span>
            Email để tích điểm và đổi thưởng (<b>Không bắt buộc</b>)
          </span>
          <Input
            label="Email"
            type="email"
            value={email}
            onInput={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="">
          <Button
            color="primary"
            variant="shadow"
            size="lg"
            onPress={(e) => {
              if (value.length == 6) {
                setLoading(true);
                if (
                  confirm(
                    "Bạn có chắc muốn vào thi không?\n" +
                      "Nếu vào thi mã của bạn sẽ mất một lần sử dụng, " +
                      "nên hãy cân nhắc sử dụng thật hợp lý",
                  )
                ) {
                  setTimeout(() => {
                    if (email) {
                      redirect("/exam/" + value + "?email=" + email);
                    } else {
                      redirect("/exam/" + value);
                    }
                  }, 7000);
                } else {
                  setLoading(false);
                }
              }
            }}
          >
            Tiếp theo
          </Button>
        </div>
      </div>
    </div>
  );
}
