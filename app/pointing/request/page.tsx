"use client";

import { title } from "@/components/primitives";
import axios from "axios";
import { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  addToast,
  Button,
} from "@heroui/react";

export default function HistoryPage() {
  const [password, setPassword] = useState("");
  const [history, setHistory] = useState([]);

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(history.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return history.slice(start, end);
  }, [page, history]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.get("/api/point/request/get/" + password);

      setHistory(response.data.pointingRequestData.reverse());
      addToast({
        title: "Lấy thông tin thành công",
        color: "success",
      });
    } catch (err) {
      // console.log(err);
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

  const handleDone = async (e: any) => {
    e.preventDefault();
    const email = e.target.getAttribute("data-email");

    try {
      const response = await axios.get(
        "/api/point/request/delete/" + password + "/" + email,
      );

      setHistory(response.data.pointingRequestData.reverse());
    } catch (err) {
      // console.log(err);
      if (err.status == 501) {
        addToast({
          title: "Không thể xác thực",
          color: "danger",
        });
      } else {
        addToast({
          title: "Xóa thất bại",
          color: "danger",
        });
      }
    }
  };

  const BottomContent = () => {
    return (
      <div className="flex w-full justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="secondary"
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
        />
      </div>
    );
  };

  return (
    <div className="w-fit flex flex-col justify-center items-center">
      <h1 className={title()}>Pointing Request</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={password}
          onInput={(e) => {
            setPassword(e.target.value);
          }}
          type="text"
          required
        />
      </form>

      <Table
        isHeaderSticky
        isStriped
        aria-label="History Table"
        className="w-fit"
        bottomContent={BottomContent()}
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn key={"who"}>Who</TableColumn>
          <TableColumn key={"number"}>Number</TableColumn>
          <TableColumn key={"time"}>Time</TableColumn>
          <TableColumn key={"action"}>Action</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No rows to display."}>
          {items.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.who}</TableCell>
              <TableCell>{item.number}</TableCell>
              <TableCell>{item.time}</TableCell>
              <TableCell>
                <Button size="sm" data-email={item.who} onClick={handleDone}>
                  Done
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
