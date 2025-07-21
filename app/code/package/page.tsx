"use client";

import { hashing } from "@/utils/hashing";
import {
  addToast,
  Button,
  Input,
  Select,
  SelectItem,
  Snippet,
} from "@heroui/react";
import axios from "axios";
import { useState } from "react";

export default function UploadPage() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState(0);
  const [remain, setRemain] = useState(0);

  const [retCode, setRetCode] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/code/package/create", {
        password,
        email,
        number,
        remain,
      });
      // console.log(response);
      setRetCode(response.data.passcodeListData.join(", "));

      addToast({
        title: "Tạo thành công!",
        color: "success",
      });
    } catch (err) {
      // console.log(err);
      if (err.status == 502) {
        addToast({
          title: "Không đủ đề để tạo",
          color: "danger",
        });
      } else if (err.status == 501) {
        addToast({
          title: "Không thể xác thực",
          color: "danger",
        });
      } else {
        addToast({
          title: "Tạo thất bại",
          color: "danger",
        });
      }
    }
  };

  return (
    <>
      <div>
        <form id="upload-form" onSubmit={() => {}}>
          <div>
            <Input
              label="Mật khẩu"
              type="text"
              labelPlacement="outside"
              placeholder="Nhập mật khẩu của bạn"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isRequired
            />
          </div>

          <br />

          <div>
            <Input
              label="Email của người mua"
              labelPlacement="outside"
              placeholder="Nhập email của người mua"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isRequired
            />
          </div>

          <br />

          <div>
            <Input
              label="Số lượng mã cần tạo"
              labelPlacement="outside"
              placeholder="Nhập số mã cần tạo"
              type="number"
              value={number.toString()}
              onChange={(e) => setNumber(Number(e.target.value))}
              isRequired
            />
          </div>

          <br />

          <div>
            <Input
              label="Số lần sử dụng"
              labelPlacement="outside"
              placeholder="Nhập số lần sử dụng của mã"
              type="number"
              value={remain.toString()}
              onChange={(e) => setRemain(Number(e.target.value))}
              isRequired
            />
          </div>

          <br />

          <div className="flex gap-4">
            <Button
              onPress={handleSubmit}
              color="primary"
              variant="shadow"
              className="flex-1"
            >
              Tạo mã
            </Button>
          </div>
        </form>

        <div className="mt-4">
          {retCode ? (
            <Snippet variant="bordered" symbol="#">
              {retCode}
            </Snippet>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
