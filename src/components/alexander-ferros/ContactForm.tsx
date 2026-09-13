"use client";

import { FormEvent, useState } from "react";
import styles from "./PublicPages.module.css";

export function ContactForm({ appointment = false }: { appointment?: boolean }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <label>
        Họ và tên
        <input name="name" autoComplete="name" required />
      </label>
      <label>
        Số điện thoại
        <input name="phone" type="tel" autoComplete="tel" required />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      {appointment ? (
        <label>
          Ngày mong muốn
          <input name="date" type="date" required />
        </label>
      ) : null}
      <label className={styles.formWide}>
        Nội dung
        <textarea name="message" rows={5} required />
      </label>
      <button type="submit">{appointment ? "Gửi yêu cầu đặt lịch" : "Gửi yêu cầu"}</button>
      {sent ? <p className={styles.formStatus} role="status">Yêu cầu đã được ghi nhận. Alexander Ferros sẽ liên hệ với bạn.</p> : null}
    </form>
  );
}
