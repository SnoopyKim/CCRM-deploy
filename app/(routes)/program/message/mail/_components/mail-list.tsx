"use client";

import CheckBox from "@/app/_components/CheckBox/default";
import Icon from "@/app/_components/Icon";
import { SearchField } from "@/app/_components/Text";
import { useState } from "react";
import MailDetailView from "./mail-detail";

// Sample data for emails
const emails = [
  {
    id: 1,
    sender: "John Doe",
    subject: "Meeting Tomorrow",
    preview: "Hi, just a reminder about our meeting tomorrow at 10 AM...",
    time: "10:30 AM",
    read: false,
    starred: false,
  },
  {
    id: 2,
    sender: "Jane Smith",
    subject: "Project Update",
    preview:
      "I've finished the first draft of the project report. Please review...",
    time: "Yesterday",
    read: true,
    starred: true,
  },
  {
    id: 3,
    sender: "Marketing Team",
    subject: "New Campaign Ideas",
    preview:
      "We've come up with some exciting ideas for our next marketing campaign...",
    time: "2 days ago",
    read: true,
    starred: false,
  },
  {
    id: 4,
    sender: "Alex Johnson",
    subject: "Vacation Request",
    preview: "I'd like to request time off from July 15th to July 22nd...",
    time: "3 days ago",
    read: false,
    starred: false,
  },
  {
    id: 5,
    sender: "Sarah Williams",
    subject: "Client Feedback",
    preview:
      "I just got off the phone with our client, and they had some feedback...",
    time: "1 week ago",
    read: true,
    starred: true,
  },
];

export default function MailListView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [checkedEmails, setCheckedEmails] = useState<number[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);

  const filteredEmails = emails.filter(
    (email) =>
      email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (emailId: number) => {
    setCheckedEmails((prev) =>
      prev.includes(emailId)
        ? prev.filter((id) => id !== emailId)
        : [...prev, emailId]
    );
  };

  const handleStarClick = (emailId: number) => {
    // In a real application, you would update the starred status in your data source
    console.log(`Toggled star for email ${emailId}`);
  };

  const handleRefresh = () => {
    // In a real application, you would fetch new emails here
    console.log("Refreshing emails");
  };

  const handleDelete = () => {
    // In a real application, you would delete the selected emails from your data source
    console.log(`Deleting emails: ${checkedEmails.join(", ")}`);
    setCheckedEmails([]);
  };

  if (selectedEmail !== null) {
    return <MailDetailView onBack={() => setSelectedEmail(null)} />;
  }

  return (
    <>
      <div className="px-4 border-b border-grayscale-11">
        <SearchField
          type="search"
          placeholder="Search emails..."
          value={searchTerm}
          onSearch={(e) => setSearchTerm(e)}
        />
        <div className="flex items-center px-4 py-4">
          <Icon
            type="refresh"
            className="h-6 w-6 cursor-pointer"
            onClick={handleRefresh}
          />
          {checkedEmails.length > 0 && (
            <Icon
              type="delete"
              className="ml-4 h-6 w-6 cursor-pointer"
              onClick={handleDelete}
            />
          )}
        </div>
      </div>
      <div className="flex-1">
        {filteredEmails.map((email) => (
          <div
            key={email.id}
            className={`flex items-center space-x-4 p-4 border-b border-grayscale-11 hover:bg-grayscale-12 ${
              !email.read ? "bg-grayscale-13" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckBox
                name={email.id.toString()}
                onChecked={(e) => handleCheckboxChange(email.id)}
              />
              <Icon
                type="star"
                className={`h-6 w-6 ${
                  email.starred ? "fill-[#EFD494] stroke-[#EFD494]" : ""
                }`}
                onClick={() => handleStarClick(email.id)}
              />
            </div>
            <div className="flex-1" onClick={() => setSelectedEmail(email.id)}>
              <div className="flex items-center gap-2 cursor-pointer">
                <p className="font-normal truncate w-40">{email.sender}</p>
                <div className="flex-1">
                  <p className="text-sm font-semibold truncate">
                    {email.subject}
                  </p>
                  <p className="text-sm truncate">{email.preview}</p>
                </div>
                <p className="text-sm">{email.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
