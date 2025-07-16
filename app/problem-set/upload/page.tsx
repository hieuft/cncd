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
  const [id, setId] = useState("");
  const [body, setBody] = useState("");
  const [action, setAction] = useState("post");

  const handleSubmit = async () => {
    try {
      if (action == "post") {
        const response = await axios.post("/api/problem-set/upload", {
          password,
          id,
          body,
        });
        // console.log(response);

        addToast({
          title: "Đăng thành công!",
          color: "success",
        });
      } else if (action == "update") {
        const response = await axios.post("/api/problem-set/update", {
          password,
          id,
          body,
        });
        // console.log(response);

        addToast({
          title: "Cập nhật thành công!",
          color: "success",
        });
      } else if (action == "delete") {
        const response = await axios.post("/api/problem-set/delete", {
          password,
          id,
        });

        addToast({
          title: "Xóa thành công",
          color: "success",
        });
      }
    } catch (err) {
      // console.log(err);
      if (action == "post") {
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
      } else if (action == "update") {
        if (err.status == 502) {
          addToast({
            title: "Không thấy đề",
            color: "danger",
          });
        } else if (err.status == 501) {
          addToast({
            title: "Không thể xác thực",
            color: "danger",
          });
        } else {
          addToast({
            title: "Sửa thất bại",
            color: "danger",
          });
        }
      }
    }
  };

  const handleGet = async () => {
    try {
      const response = await axios.get(
        "/api/problem-set/admin-get/" + id + "/" + password,
      );

      const problemSet = response.data.problemSetData;

      setBody(problemSet.body);

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
            />
          </div>

          <br />

          <div>
            <Input
              label="ID"
              type="text"
              labelPlacement="outside"
              placeholder="Nhập ID của đề"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>

          <br />

          <div className="text-left">
            <Textarea
              label="Content"
              labelPlacement="outside"
              placeholder="Nhập nội dung"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></Textarea>
          </div>

          <br />

          <div className="flex gap-4">
            <Button
              color="default"
              variant="shadow"
              className="flex-1"
              onPress={handleGet}
            >
              Lấy thông tin
            </Button>
            <Button
              color="primary"
              variant="shadow"
              className="flex-1"
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
