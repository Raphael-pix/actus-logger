import { getUserProfile } from "@/lib/services";
import ProfileWrapper from "./_components/wrapper";
import { cookies } from "next/headers";

const ProfilePage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("user_token")?.value;
  const profile = await getUserProfile(token);

  return (
    <div className="min-h-screen">
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Profile Settings</h1>
        </div>
        <ProfileWrapper profile={profile} />
      </main>
    </div>
  );
};

export default ProfilePage;
