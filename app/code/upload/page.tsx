"use client";

import { hashing } from "@/utils/hashing";
import { addToast, Button, Input, Select, SelectItem } from "@heroui/react";
import axios from "axios";
import { useState } from "react";

const acts = [
  {
    key: "post",
    name: "Đăng",
  },
  {
    key: "update",
    name: "Cập nhật",
  },
  {
    key: "delete",
    name: "Xóa",
  },
];

export default function UploadPage() {
  const [password, setPassword] = useState("");
  const [passcode, setPasscode] = useState("");
  const [dist, setDist] = useState("");
  const [remain, setRemain] = useState(0);
  const [action, setAction] = useState("post");

  const handleSubmit = async () => {
    try {
      if (action == "post") {
        const response = await axios.post("/api/code/upload", {
          password,
          passcode,
          dist,
          remain,
        });
        // console.log(response);

        addToast({
          title: "Đăng thành công!",
          color: "success",
        });
      } else if (action == "update") {
        const response = await axios.post("/api/code/update", {
          password,
          passcode,
          dist,
          remain,
        });
        // console.log(response);

        addToast({
          title: "Cập nhật thành công!",
          color: "success",
        });
      } else if (action == "delete") {
        const response = await axios.post("/api/code/delete", {
          password,
          passcode,
          dist,
          remain,
        });
        // console.log(response);

        addToast({
          title: "Xóa thành công!",
          color: "success",
        });
      }
    } catch (err) {
      console.log(err);
      if (err.status == 502) {
        addToast({
          title: "Code đã tồn tại",
          color: "danger",
        });
      } else if (err.status == 501) {
        addToast({
          title: "Không thể xác thực",
          color: "danger",
        });
      } else {
        addToast({
          title: "Đăng thất bại",
          color: "danger",
        });
      }
    }
  };

  const handleGet = async () => {
    try {
      const response = await axios.post("/api/code/get", {
        password,
        passcode,
      });

      const retPasscode = response.data.retPasscodeData;

      setDist(retPasscode.dist);
      setRemain(retPasscode.remain);

      addToast({
        title: "Lấy thông tin thành công",
        color: "success",
      });
    } catch (err) {
      if (err.status == 501) {
        addToast({
          title: "Không thể xác thực",
          color: "danger",
        });
      } else if (err.status == 502) {
        addToast({
          title: "Không tìm thấy",
          color: "danger",
        });
      }
    }
  };

  return (
    <>
      <div>
        <form id="upload-form" onSubmit={() => {}}>
          <Select
            className=""
            label="Thao tác"
            labelPlacement="outside"
            placeholder="Chọn thao tác"
            defaultSelectedKeys={["post"]}
            onChange={(e) => {
              setAction(e.target.value);
            }}
          >
            {acts.map((act) => (
              <SelectItem key={act.key}>{act.name}</SelectItem>
            ))}
          </Select>

          <br />

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
              label="Code"
              labelPlacement="outside"
              placeholder="Nhập mã vào phòng thi"
              type="text"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              isRequired
            />
          </div>

          <br />

          <div>
            <Input
              label="Mã của đề thi"
              labelPlacement="outside"
              placeholder="Nhập mã của đề"
              type="text"
              value={dist}
              onChange={(e) => setDist(e.target.value)}
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
              onPress={handleGet}
              color="default"
              variant="shadow"
              className="flex-1"
            >
              Lấy thông tin
            </Button>
            <Button
              onPress={handleSubmit}
              color="primary"
              variant="shadow"
              className="flex-1"
            >
              Đăng
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
