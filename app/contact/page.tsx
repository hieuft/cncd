import { title } from "@/components/primitives";

export default function ContactPage() {
  return (
    <div>
      <p className="text-left">
        Nếu có bất kì thắc mắc gì hoặc cần trao đổi thông tin, xin liên hệ với
        chúng tôi qua fanpage Facebook:{" "}
        <a href="https://www.facebook.com/cncd.tsa/" className="text-blue-500">
          CNCD - Luyện thi TSA
        </a>
      </p>
      <br />
      <p className="text-left">
        Ngoài ra chúng tôi không sử dụng bất kì phương thức liên hệ nào khác.
      </p>
    </div>
  );
}
