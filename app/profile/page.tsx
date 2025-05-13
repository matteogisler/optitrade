import { UserProfile } from '@/components/user-profile';

export default function ProfilePage() {
  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your profile and application preferences.
        </p>
      </div>
      
      <UserProfile />
    </div>
  );
}