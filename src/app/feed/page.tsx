"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function FeedPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.replace("/auth");
        return;
      }
      setUser(currentUser);
      setChecking(false);
    });
  }, [router]);

  async function logout() {
    await signOut(auth);
    router.replace("/auth");
  }

  if (checking) {
    return <main className="feed-shell"><p>Checking your session...</p></main>;
  }

  return (
    <main className="feed-shell">
      <div className="feed-card">
        <div className="brand-mark small" aria-hidden="true"><div className="brand-mark-inner" /></div>
        <h1>Successfully signed in 🎉</h1>
        <p>Firebase user:</p>
        <strong>{user?.displayName || user?.email}</strong>
        <p className="feed-note">This page is intentionally simple. The full Instagram-style feed will be built next.</p>
        <button className="primary-button" onClick={logout}>Sign out</button>
      </div>
    </main>
  );
}
