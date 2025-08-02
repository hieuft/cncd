"use client";

import { title } from "@/components/primitives";
import { sleep } from "@/utils/sleep";
import { validateEmail } from "@/utils/valid";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { addToast } from "@heroui/react";
import axios from "axios";
import { set } from "mongoose";
import { useEffect, useState } from "react";

export default function PointingPage() {
  const [email, setEmail] = useState("");
  const [log, setLog] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const input = document.getElementById("email");
      const get = document.getElementById("get");
      const request = document.getElementById("request");

      if (input && get && request) {
        get.addEventListener("click", async (e) => {
          e.preventDefault();
          setLog("Đang kiểm tra...");
          const email = input.value;

          if (!email) {
            setLog("Hãy nhập email");
          } else {
            if (!validateEmail(email)) {
              setLog("Hãy nhập email hợp lệ");
            } else {
              try {
                await sleep(2000);
                const response = await axios.get("/api/point/get/" + email);

                setLog("Bạn đang có " + response.data.point + " điểm");
              } catch (err) {
                addToast({
                  title: "Tìm thất bại",
                  color: "danger",
                });
              }
            }
          }
        });

        request.addEventListener("click", async (e) => {
          e.preventDefault();
          setLog("Đang yêu cầu...");
          const email = input.value;

          if (!email) {
            setLog("Hãy nhập email");
          } else {
            if (!validateEmail(email)) {
              setLog("Hãy nhập email hợp lệ");
            } else {
              try {
                await sleep(2000);
                const response = await axios.post("/api/point/request", {
                  email,
                });

                setLog(response.data.message);
              } catch (err) {
                setLog("Yêu cầu thất bại");
                addToast({
                  title: "Yêu cầu thất bại",
                  color: "danger",
                });
              }
            }
          }
        });
      }
    }
  }, []);

  return (
    <div>
      <h1 className={title()}>Tích điểm</h1>

      <div className="text-left mt-8">
        <div className="my-4">
          <h2 className="text-lg font-bold">
            Hệ thống tích điểm và đổi thưởng
          </h2>
          <div className="[&>*]:my-2 [&>*>span]:font-bold [&>*>span]:text-sm [&>*>span]:mr-1">
            <div>
              <span>1. Tích điểm:</span>
              Điểm sẽ được tích vào email bạn cung cấp mỗi khi sử dụng mã vào
              phòng thi. Mỗi lần sử dụng mã sẽ được cộng{" "}
              <b className="text-xl">1</b> điểm (
              <b>Sử dụng lại mã sẽ không được tính điểm</b>).
            </div>
            <div>
              <span>2. Đổi thưởng:</span>
              Mỗi <b className="text-xl">5</b> điểm sẽ đổi được{" "}
              <b className="text-xl">1</b> gói{" "}
              <b className="text-xl font-mono">"MONO_TSA"</b> bao gồm{" "}
              <b className="text-xl">1</b> mã vào phòng thi có thể sử dụng tối
              đa <b className="text-xl">5</b> lần.
            </div>
            <div>
              <span>3. Lưu ý:</span>
              Khi yêu cầu đổi thưởng chúng tôi sẽ xử lý yêu cầu và gửi phần
              thưởng cho bạn qua email (trong 24h) vì vậy hãy chú ý email để
              không bỏ lỡ phần thưởng.
            </div>
          </div>
        </div>

        <div className="my-4">
          <form action={""}>
            <Input
              id="email"
              label="Email"
              placeholder="Nhập email của bạn"
              type="email"
              value={email}
              onInput={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div className="w-full flex gap-4 mt-4">
              <Button className="flex-1" variant="shadow" size="lg" id="get">
                Tra điểm
              </Button>
              <Button
                className="flex-1"
                variant="shadow"
                size="lg"
                id="request"
              >
                Yêu cầu đổi thưởng
              </Button>
            </div>
          </form>
        </div>

        <div className="my-4">{log}</div>
      </div>
    </div>
  );
}
