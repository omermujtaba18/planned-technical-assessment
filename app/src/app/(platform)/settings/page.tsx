import { ProfileSettingCard } from "@/components/settings/profile-settings-card";

export default function Settings() {
  return (
    <>
      <div id="settings-header" className="mb-8 flex gap-1 flex-col">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your profile and security settings
        </p>
      </div>

      <ProfileSettingCard />
    </>
  );
}
