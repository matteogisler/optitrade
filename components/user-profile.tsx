'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';
import { User, HomeIcon as ThemeIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from 'next-themes';

export function UserProfile() {
  const { theme } = useTheme();

  // Mock user data
  const user = {
    name: 'Demo User',
    email: 'demo@optitrade.com',
    avatar: '',
    joinDate: 'January 2025',
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                <User className="size-12" />
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <p className="text-sm text-muted-foreground">Member since {user.joinDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <ThemeIcon className="size-5" />
                <span>Current theme</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground capitalize">
                  {theme === 'system' ? 'System default' : theme}
                </span>
                <ThemeToggle />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className={`border-2 cursor-pointer transition-all ${theme === 'light' ? 'border-primary' : 'border-transparent hover:border-muted'}`}>
                <CardContent className="p-4">
                  <div className="h-32 bg-[#ffffff] rounded-md flex items-center justify-center border">
                    <div className="w-3/4">
                      <div className="h-4 bg-[#e2e8f0] rounded mb-2"></div>
                      <div className="h-4 bg-[#e2e8f0] rounded w-3/4 mb-2"></div>
                      <div className="h-8 bg-[#4F46E5] rounded"></div>
                    </div>
                  </div>
                  <p className="mt-2 text-center font-medium">Light Mode</p>
                </CardContent>
              </Card>

              <Card className={`border-2 cursor-pointer transition-all ${theme === 'dark' ? 'border-primary' : 'border-transparent hover:border-muted'}`}>
                <CardContent className="p-4">
                  <div className="h-32 bg-[#0f172a] rounded-md flex items-center justify-center border">
                    <div className="w-3/4">
                      <div className="h-4 bg-[#334155] rounded mb-2"></div>
                      <div className="h-4 bg-[#334155] rounded w-3/4 mb-2"></div>
                      <div className="h-8 bg-[#6366f1] rounded"></div>
                    </div>
                  </div>
                  <p className="mt-2 text-center font-medium">Dark Mode</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}