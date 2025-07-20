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
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  addToast,
} from "@heroui/react";

export default function HistoryPage() {
  const [password, setPassword] = useState("");
  const [history, setHistory] = useState([{}]);

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
      const response = await axios.get("/api/history/get/" + password);

      setHistory(response.data.historyData.reverse());
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

  const handleClear = async () => {
    try {
      const response = await axios.get("/api/history/clear/" + password);

      setHistory(response.data.historyData.reverse());

      addToast({
        title: "Xóa thành công",
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
    <div className="w-fit flex justify-center items-center flex-col">
      <h1 className={title()}>History</h1>

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
          <TableColumn key={"type"}>Type</TableColumn>
          <TableColumn key={"body"}>Body</TableColumn>
          <TableColumn key={"time"}>Time</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No rows to display."}>
          {items.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.body}</TableCell>
              <TableCell>{item.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button
        variant="shadow"
        color="danger"
        onPress={handleClear}
        className="mt-4"
      >
        Xóa lịch sử
      </Button>
    </div>
  );
}
