"use client";

import { hashing } from "@/utils/hashing";
import {
  addToast,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const colors = [
  { key: "default", name: "Xám" },
  { key: "primary", name: "Xanh dương" },
  { key: "secondary", name: "Tím" },
  { key: "success", name: "Xanh lá" },
  { key: "warning", name: "Vàng cam" },
  { key: "danger", name: "Đỏ" },
];

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
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [describe, setDescribe] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [color, setColor] = useState("default");
  const [action, setAction] = useState("post");

  const handleSubmit = async () => {
    try {
      if (action == "delete") {
        const response = await axios.post("/api/service-package/delete", {
          password,
          id,
        });
        // console.log(response);

        if (response.status == 201) {
          addToast({
            title: "Xóa thành công!",
            color: "success",
          });
        }
      } else if (action == "post") {
        const response = await axios.post("/api/service-package/upload", {
          password,
          name,
          id,
          describe,
          price,
          discount,
          color,
        });
        // console.log(response);

        if (response.status == 201) {
          addToast({
            title: response.data.message,
            color: "success",
          });
        }
      } else if (action == "update") {
        const response = await axios.post("/api/service-package/update", {
          password,
          name,
          id,
          describe,
          price,
          discount,
          color,
        });
        // console.log(response);

        if (response.status == 201) {
          addToast({
            title: response.data.message,
            color: "success",
          });
        }
      }
    } catch (err) {
      if (err.status == 502) {
        addToast({
          title: "ID đã tồn tại",
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
      const response = await axios.get(
        "https://cncd.vercel.app/api/service-package/get/" + id + "/" + password,
      );

      const pack = response.data.servicePackageData;

      setName(pack.name);
      setDescribe(pack.describe);
      setColor(pack.color);
      setPrice(pack.price);
      setDiscount(pack.discount);
    } catch (err) {
      if (err.status == 501) {
        addToast({
          title: "Không thể xác thực",
          color: "danger",
        });
      } else {
        addToast({
          title: "Tìm thất bại",
          color: "danger",
        });
      }
    }
  };

  return (
    <>
      <div className="text-left">
        <form id="upload-form" action={""} onSubmit={() => {}}>
          <Select
            className=""
            label="Thao tác"
            labelPlacement="outside"
            placeholder="Chọn thao tác"
            defaultSelectedKeys={["post"]}
            onChange={(e) => {
              setAction(e.target.value);
            }}
            isRequired
          >
            {acts.map((act) => (
              <SelectItem key={act.key}>{act.name}</SelectItem>
            ))}
          </Select>

          <br />

          <Input
            label="Mật khẩu"
            type="text"
            labelPlacement="outside"
            placeholder="Nhập mật khẩu của bạn"
            isRequired
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <br />

          <Input
            label="Tên của gói"
            type="text"
            labelPlacement="outside"
            placeholder="Nhập tên của gói"
            isRequired
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <br />

          <Input
            label="ID"
            type="text"
            labelPlacement="outside"
            placeholder="Nhập ID của gói"
            isRequired
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <br />

          <Textarea
            isRequired
            labelPlacement="outside"
            label="Mô tả"
            placeholder="Nhập mô tả"
            value={describe}
            onInput={(e) => {
              setDescribe(e.target.value);
            }}
          />

          <br />

          <Select
            className=""
            label="Màu sắc"
            labelPlacement="outside"
            placeholder="Chọn một màu"
            defaultSelectedKeys={["default"]}
            onChange={(e) => {
              setColor(e.target.value);
            }}
            isRequired
          >
            {colors.map((color) => (
              <SelectItem key={color.key}>{color.name}</SelectItem>
            ))}
          </Select>

          <br />

          <Input
            label="Giá"
            type="number"
            labelPlacement="outside"
            placeholder="Nhập giá của gói"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">VND</span>
              </div>
            }
            isRequired
            value={price.toString()}
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          <br />

          <Input
            label="Giảm giá"
            type="number"
            labelPlacement="outside"
            placeholder="Nhập giảm giá của gói"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">%</span>
              </div>
            }
            isRequired
            value={discount.toString()}
            onChange={(e) => setDiscount(Number(e.target.value))}
          />

          <br />

          <div className="flex gap-4">
            <Button
              id="get"
              className="flex-1"
              color="default"
              variant="shadow"
              onPress={handleGet}
            >
              Lấy thông tin
            </Button>
            <Button
              id="submit"
              className="flex-1"
              color="primary"
              variant="shadow"
              onPress={handleSubmit}
            >
              Đăng
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
