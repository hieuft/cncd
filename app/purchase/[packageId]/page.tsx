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

export default function UploadPage({
  params,
}: {
  params: Promise<{ packageId: string }>;
}) {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [describe, setDescribe] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [color, setColor] = useState("defaul");

  const getPackage = async () => {
    const { packageId } = await params;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (name.includes("DELETE")) {
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
      } else {
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
            title: "Đăng thành công!",
            color: "success",
          });
        }
      }
    } catch (err) {
      // console.log(err);
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
      } else if (err.status == 503) {
        addToast({
          title: 'Hãy nhập "Name"',
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

  useEffect(() => {
    getPackage();
  }, []);

  return (
    <>
      <div className="text-left">
        <form id="upload-form" onSubmit={handleSubmit}>
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

          <Button
            className="w-full"
            type="submit"
            color="primary"
            variant="shadow"
          >
            Đăng
          </Button>
        </form>
      </div>
    </>
  );
}
