import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Settings() {
  return (
    <>
      <div id="settings-header" className="mb-8 flex gap-1 flex-col">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your profile and security settings
        </p>
      </div>
      <section id="profile-setting" className="mb-4">
        <Card className="flex flex-col gap-4 shadow-none">
          <h2 className="text-lg text-gray-900 font-bold">Profile Settings</h2>
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button variant="outline"> Change Photo</Button>
          </div>
          <div className="gap-1 max-w-sm flex flex-col">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" value="abc@gmail.com" disabled />
          </div>
          <div className="gap-2 max-w-sm flex flex-col">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
            />
          </div>
          <Button className="max-w-fit mt-4" size="lg">
            Save Changes
          </Button>
        </Card>
      </section>
      <section id="password-setting">
        <Card className="flex flex-col gap-4 shadow-none">
          <h2 className="text-lg text-gray-900 font-bold">Password Settings</h2>

          <div className="gap-2 max-w-sm flex flex-col">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              type="password"
              id="currentPassword"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
            />
          </div>

          <div className="gap-2 max-w-sm flex flex-col">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              type="password"
              id="newPassword"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
            />
          </div>
          <Button className="max-w-fit mt-4" size="lg">
            Change Password
          </Button>
        </Card>
      </section>
    </>
  );
}
