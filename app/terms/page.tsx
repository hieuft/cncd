import { title } from "@/components/primitives";

export default function TermsPage() {
  return (
    <div className="[&_p]:text-left [&_h2]:text-2xl [&_h3]:text-lg [&_h2]:font-bold [&_h3]:font-bold [&_h4]:font-bold [&_h2]:my-4 [&_h3]:my-4 [&_h4]:my-4 [&_p]:my-2 [&>div]:my-4 [&_a]:text-blue-500">
      <h1 className={title()}>Điều khoản</h1>
      <div>
        <h2>I. Điều khoản dịch vụ</h2>
        <div>
          <h3>1. Dịch vụ chúng tôi cung cấp</h3>
          <div>
            <h4>1.1. Phòng luyện thi</h4>
            <p>
              a. Chúng tôi cung cấp dịch vụ bao gồm những phòng luyện thi TSA
              cho bạn, thông qua việc cung cấp{" "}
              <b>các mã phòng thi dưới dạng gói dịch vụ</b>.
            </p>
            <p>
              b. Để sử dụng dịch vụ, bạn cần trả phí cho{" "}
              <b>các gói dịch vụ (mỗi gói sẽ bao gồm nhiều mã phòng thi)</b>.
            </p>
          </div>

          <div>
            <h4>1.2. Tích điểm và đổi thưởng</h4>
            <p>
              a. Chúng tôi cung cấp dịch vụ tích điểm vào email bạn cung cấp và
              đổi thưởng dựa trên số lượng mã phòng thi bạn đã sử dụng.
            </p>
            <p>
              b. Để sử dụng dịch vụ, trong quá trình nhập mã phòng thi để vào
              thi, bạn cần nhập email để chúng tôi tích điểm. Khi đủ điểm tích
              lũy chúng tôi sẽ gửi phần thưởng qua email cho bạn.
            </p>
            <p>
              c. Lưu ý: dịch vụ này <b>hoàn toàn không bắt buộc</b>, bạn có thể
              sử dụng hoặc không sử dụng tùy ý.
            </p>
          </div>
        </div>
      </div>
      <div>
        <h2>II. Chính sách quyền riêng tư</h2>
        <div>
          <h3>1. Những thông tin chúng tôi cần bạn cung cấp</h3>
          <p>
            a. Bạn cần cung cấp cho chúng tôi email để sử dụng các dịch vụ và
            lưu trữ thông tin.
          </p>
        </div>
        <div>
          <h3>2. Những gì chúng tôi cam kết</h3>
          <p>
            a. Đối với dịch vụ <b>tích điểm, đổi thưởng</b>, chúng tôi cam kết
            chỉ sử dụng email của bạn để tích điểm và đối thưởng. Nếu không sử
            dụng dịch vụ này bạn có thể không cung cấp email.
          </p>
          <p>
            b. Đối với việc <b>lưu trữ thông tin</b>, chúng tôi cam kết chỉ sử
            dụng email của bạn để đánh dấu những đề thi mà bạn đã làm rồi, nhằm
            tránh việc cung cấp những phòng thi trùng lặp với trước đây khi bạn
            mua hàng.
          </p>
          <p>
            b. Chúng tôi cam kết không cung cấp email của bạn cho bất kì bên thứ
            3 nào.
          </p>
        </div>
      </div>
      <div>
        <h2>III. Chính sách về tài sản và thông tin trên trang web</h2>
        <p>
          a. Tất cả những đề/bộ đề, những thông tin trên trang web này đều thuộc
          quyền sở hữu của <a href="https://www.facebook.com/cncd.tsa/">CNCD</a>
          . Bạn không được sử dụng cho mục đích riêng khi chưa có sự cho phép
          của chúng tôi.
        </p>
      </div>
      <hr />
      <div>
        <p>
          Bằng cách chấp nhận điều khoản này, bạn đã ký vào một đơn đăng ký hoặc
          sử dụng dịch vụ, xác nhận rằng bạn ở độ tuổi pháp lý và có quyền rằng
          buộc bạn và đơn đăng ký. Điều khoản này gọi chung là{" "}
          <b>"Thỏa thuận"</b>.
        </p>
        <p>
          Nếu có bất kì thắc mắc gì hoặc cần trao đổi thông tin, xin liên hệ với
          chúng tôi qua fanpage Facebook:{" "}
          <a href="https://www.facebook.com/cncd.tsa/">CNCD - Luyện thi TSA</a>
        </p>
      </div>
    </div>
  );
}
