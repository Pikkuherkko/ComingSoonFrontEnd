import { useState } from "react";

// most of this is NOT on the front page

export default function EmailsPage() {
  const [emails, setEmails] = useState([]);
  const [email, setEmail] = useState("");

  const fetchEmails = async () => {
    const response = await fetch("/api/emails");
    const data = await response.json();
    setEmails(data);
  };

  const submitEmail = async () => {
    const response = await fetch("api/emails", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  const deleteComment = async (emailId) => {
    const response = await fetch(`api/emails/${emailId}`, { method: "DELETE" });
    const data = await response.json();
    console.log(data);
    fetchEmails();
  };

  return (
    <>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-solid border-black border-2"
      />
      <button onClick={submitEmail}>Submit email</button>
      <button onClick={fetchEmails}>Load Emails</button>
      {emails.map((email) => {
        return (
          <div key={email.id}>
            {email.id} {email.text}
            <button onClick={() => deleteComment(email.id)}> Delete</button>
          </div>
        );
      })}
    </>
  );
}
