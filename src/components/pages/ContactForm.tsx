"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

const fieldClass =
  "h-12 w-full border-b border-paper/30 bg-transparent px-0 text-base font-light text-paper placeholder:text-paper/35 focus:border-paper focus:outline-none";
const labelClass = "flex flex-col gap-2 text-[12px] uppercase tracking-[0.14em] text-paper/60";

export function ContactForm({ appointment = false }: { appointment?: boolean }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <form className="grid gap-8 md:grid-cols-2" onSubmit={handleSubmit}>
      <label className={labelClass}>
        Họ và tên
        <input name="name" autoComplete="name" required className={fieldClass} />
      </label>
      <label className={labelClass}>
        Số điện thoại
        <input name="phone" type="tel" autoComplete="tel" required className={fieldClass} />
      </label>
      <label className={cn(labelClass, !appointment && "md:col-span-2")}>
        Email
        <input name="email" type="email" autoComplete="email" required className={fieldClass} />
      </label>
      {appointment ? (
        <label className={labelClass}>
          Ngày mong muốn
          <input name="date" type="date" required className={cn(fieldClass, "[color-scheme:dark]")} />
        </label>
      ) : null}
      <label className={cn(labelClass, "md:col-span-2")}>
        Nội dung
        <textarea name="message" rows={5} required className={cn(fieldClass, "h-auto resize-y py-3")} />
      </label>
      <div className="flex flex-col items-start gap-4 md:col-span-2">
        <button
          type="submit"
          className="inline-flex min-h-[51px] items-center justify-center rounded-full border border-bronze bg-bronze px-8 text-sm font-medium text-paper transition-colors hover:border-bronze-deep hover:bg-bronze-deep"
        >
          {appointment ? "Gửi yêu cầu đặt lịch" : "Gửi yêu cầu"}
        </button>
        {sent ? (
          <p role="status" className="m-0 text-sm text-bronze">
            Yêu cầu đã được ghi nhận. Alexander Ferros sẽ liên hệ với bạn sớm nhất.
          </p>
        ) : null}
      </div>
    </form>
  );
}
