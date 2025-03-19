"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { getMe } from "@/services/AuthService";
import ChangePasswordModal from "@/components/modules/auth/profile/ChangePasswordModal";
import { IUserDetails } from "@/types";
import EditProfileModal from "@/components/modules/auth/profile/EditProfileModal";

export default function UserProfile() {
  const [myProfile, setMyProfile] = useState<IUserDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const { user, isLoading } = useUser();

  useEffect(() => {
    const fetchMe = async () => {
      setLoading(true);
      const me = await getMe();
      setLoading(false);
      setMyProfile(me?.data);
    };

    fetchMe();
  }, [user?.userId]);

  console.log(myProfile);

  if (isLoading || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="w-24 h-24 border-2 border-gray-300">
            <AvatarImage
              src={myProfile?.image || "/default-avatar.png"}
              alt="User Avatar"
            />
            <AvatarFallback>{myProfile?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl font-semibold mt-3">
            {myProfile?.name}
          </CardTitle>
          <Badge
            variant={myProfile?.isBlocked ? "destructive" : "default"}
            className="mt-2"
          >
            {myProfile?.isBlocked ? "Blocked" : "Active"}
          </Badge>
        </CardHeader>
        <Separator />
        <CardContent className="mt-4 space-y-3 text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{myProfile?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Phone:</span>
            <span>{myProfile?.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Role:</span>
            <Badge variant="outline">{myProfile?.role}</Badge>
          </div>
        </CardContent>

        <Separator />

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <EditProfileModal />
          <ChangePasswordModal />
        </div>
      </Card>
    </div>
  );
}
