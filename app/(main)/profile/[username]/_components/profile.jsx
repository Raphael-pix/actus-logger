import Image from "next/image";
import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";

const ProfileTab = ({profile}) => {
  const lastActive = formatDistanceToNow(new Date(profile.updatedAt), { addSuffix: true });
  const [userData, setUserData] = useState({
    username: profile.username,
    password: profile.password,
    avatar: "/assets/images/profile.jpg",
    lastActive: lastActive,
  });
  // Form state
  const [username, setUsername] = useState(userData.username);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user data
    setUserData({
      ...userData,
      username,
    });
    // Here you would typically make an API call to update the user information
    alert("Profile updated successfully!");
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* User Info */}
      <div className="md:col-span-1">
        <div className="bg-primary shadow rounded-lg p-6">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              <Image
                src={userData.avatar}
                alt="User avatar"
                width={128}
                height={128}
                priority
                className="w-full h-full rounded-full object-cover border-4 shadow"
              />
            </div>
            <h3 className="text-lg font-medium text-neutral-white mb-2">
              {userData.username}
            </h3>
            
            <p className="text-sm text-neutral-white mb-4">
              Last active: {userData.lastActive}
            </p>
            <button className="w-full bg-neutral-white text-neutral-black font-semibold px-4 py-2 rounded-md transition-colors">
              Change Profile Picture
            </button>
          </div>
        </div>
      </div>

      {/* forms */}
      <div className="md:col-span-2">
        <div>
          <div className="p-6 shadow rounded-lg">
            <h2 className="text-lg font-medium mb-4">
              Account Information
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-foreground"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="mt-1 block w-full rounded-md border border-input shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                    value={profile.username}
                    disabled
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="email"
                    className="mt-1 text-neutral-black block w-full rounded-md border border-input shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary bg-gray-100"
                    value={userData.password}
                    disabled
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="my-2 p-6 shadow rounded-lg">
            <h2 className="text-lg font-medium mb-4">
              Change Account Details
            </h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="new-username"
                  className="block text-sm font-medium text-foreground"
                >
                  New Username
                </label>
                <input
                    type="text"
                    id="new-username"
                    className="mt-1 block w-full rounded-md border border-input shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
              </div>

              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-foreground"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="new-password"
                  className="mt-1 block w-full rounded-md border border-input shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-foreground"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  className="mt-1 block w-full rounded-md border border-input shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-primary-purple-dark hover:bg-primary text-white px-4 py-2 rounded-md transition-colors"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
