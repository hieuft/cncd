"use client";

import { title } from "@/components/primitives";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  CircularProgress,
  Code,
  Divider,
  Link,
} from "@heroui/react";
import { sleep } from "@/utils/sleep";

const PurchasePage = () => {
  async function getData() {
    await sleep(10000);
    const response = await axios.get(
      "http://localhost:3000/api/service-package/get",
    );
    setPackages(response.data.servicePackageData);
    setLoading(false);
  }

  const formatPrice = (x: number) => {
    return x.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
  };

  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="">
      <h1 className={title()}>Mua gói đề</h1>
      <div className="my-8 text-left">
        <div>
          <h2 className="text-lg font-bold">Hướng dẫn đăng ký mua gói đề</h2>
          <div className="[&>*]:my-2 [&>*>span]:font-bold [&>*>span]:text-sm [&>*>span]:mr-1">
            <div>
              <span>Bước 1.</span>
              Click vào gói đề cần mua bên dưới để sao chép ID của gói.
            </div>
            <div>
              <span>Bước 2.</span>
              Nhắn tin cho fanpage{" "}
              <Link
                isBlock
                showAnchorIcon
                target="_blank"
                href="https://www.facebook.com/cncd.tsa/"
                color="primary"
              >
                CNCD
              </Link>{" "}
              theo mẫu sau:
              <div>
                <Code size="md">
                  ID: [ID của gói đã sao chép]
                  <br />
                  QU: [số lượng gói bạn muốn mua]
                  <br />
                  EM: [email của bạn]
                </Code>
              </div>
              <br />
              Ví dụ, bạn muốn mua <Code>3</Code> gói <Code>TSA_PLUS</Code> và
              email của bạn là <Code>admin@cncd.com</Code> thì gửi cho fanpage
              tin nhắn sau:
              <div>
                <Code size="md">
                  ID: TSA_PLUS
                  <br />
                  QU: 3
                  <br />
                  EM: admin@cncd.com
                </Code>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-bold">Lưu ý khi mua</h2>
            <div className="[&>*]:my-2 [&>*>span]:font-bold [&>*>span]:text-sm [&>*>span]:mr-1">
              <div>
                <span>1.</span>
                Chúng tôi sử dụng email của bạn để xác định xem bạn đã làm một
                đề nào đó hay chưa, vì vậy hãy sử dụng 1 email duy nhất giữa
                những lần mua để tránh mua phải đề đã làm rồi.
              </div>
              <div>
                <span>2.</span>
                Không nên mua qua bất kì bên nào khác ngoài <b>CNCD</b> để tránh
                bị lừa đảo hoặc bị mua với giá đắt.
              </div>
              <div>
                <span>3.</span>
                Mỗi gói gồm một số mã vào phòng thi nhất định và mỗi mã đều có
                số lần sử dụng nhất định để bạn có thể làm lại đề nếu muốn.
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <>
          <div className="flex justify-center items-center my-4">
            <CircularProgress aria-label="Loading..." size="lg" />
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
            {packages.map((item) => (
              <Card
                key={item.id}
                shadow="sm"
                isPressable
                onPress={() => {
                  navigator.clipboard.writeText(item.id);
                  addToast({
                    title: "Đã sao chép ID",
                    color: "success",
                  });
                }}
              >
                <CardHeader className="leading-6 h-6 py-6">
                  <span className="font-bold text-sm mr-1">ID:</span>
                  <span className="font-mono">
                    <Code color={item.color || "primary"}>{item.id}</Code>
                  </span>
                </CardHeader>
                <Divider />
                <CardBody className="flex flex-col gap-2">
                  <div>
                    <span className="font-bold text-sm mr-1">Tên:</span>
                    <span>{item.name}</span>
                  </div>
                  <div>
                    <span className="font-bold text-sm mr-1">Mô tả:</span>
                    <span>{item.describe}</span>
                  </div>
                </CardBody>
                <Divider />
                <CardFooter className="leading-6 h-6 py-6 font-medium flex justify-between w-full">
                  {item.discount ? (
                    <>
                      <div className="flex gap-2">
                        <span className="line-through text-gray-400">
                          {formatPrice(item.price)}đ
                        </span>
                        <span>
                          {formatPrice(
                            (item.price * (100 - item.discount)) / 100,
                          )}
                          đ
                        </span>
                      </div>
                      <div>
                        Ưu đãi
                        <span className="text-red-600"> {item.discount}%</span>
                      </div>
                    </>
                  ) : (
                    <div>
                      <span>{formatPrice(item.price)}đ</span>
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PurchasePage;
