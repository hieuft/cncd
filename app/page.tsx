import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { FacebookIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Luyện thi&nbsp;</span>
        <span className={title({ color: "violet" })}>TSA&nbsp;</span>
        <br />
        <span className={title()}>Chưa bao giờ dễ đến thế.</span>
        <div className={subtitle({ class: "mt-4" })}>
          Đơn giản, tiện lợi và dễ tiếp cận.
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.facebookFanpage}
        >
          Facebook hỗ trợ
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.facebookGroup}
        >
          <FacebookIcon size={20} />
          Nhóm Facebook
        </Link>
      </div>

      {/* <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Thi thử miễn phí bằng mã{" "}
            <Code color="primary" size="md">
              CNCDFR
            </Code>
          </span>
        </Snippet>
      </div> */}
    </section>
  );
}
