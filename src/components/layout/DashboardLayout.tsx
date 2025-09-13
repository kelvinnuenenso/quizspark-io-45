import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarHeader, 
  SidebarFooter,
  SidebarTrigger,
  useSidebar 
} from '@/components/ui/sidebar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  LayoutDashboard, 
  HelpCircle, 
  Palette, 
  Edit, 
  Target, 
  Code, 
  BarChart3, 
  Heart, 
  Webhook, 
  Settings, 
  Zap, 
  LogOut, 
  User 
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Perguntas', url: '/dashboard/questions', icon: HelpCircle },
  { title: 'Tema', url: '/dashboard/theme', icon: Palette },
  { title: 'Editor', url: '/dashboard/editor', icon: Edit },
  { title: 'Resultados', url: '/dashboard/results', icon: Target },
  { title: 'Pixels', url: '/dashboard/pixels', icon: Code },
  { title: 'Analytics', url: '/dashboard/analytics', icon: BarChart3 },
  { title: 'Engajamento', url: '/dashboard/engagement', icon: Heart },
  { title: 'Webhooks', url: '/dashboard/webhooks', icon: Webhook },
  { title: 'Config', url: '/dashboard/config', icon: Settings },
];

function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'bg-primary text-primary-foreground font-medium' : 'hover:bg-muted/50';

  return (
    <Sidebar className={open ? 'w-64' : 'w-16'} collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-primary rounded-xl">
            <Zap className="h-5 w-5 text-white" />
          </div>
          {open && (
            <span className="text-lg font-bold text-foreground">QUIZZ Elevado</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {open && (
          <div className="text-xs text-muted-foreground">
            v1.0.0 • Desenvolvido com ❤️
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center justify-between px-4 lg:px-6">
              <SidebarTrigger />
              
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback className="text-xs">
                          {user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:inline-block">{user?.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem>
                      <User className="h-4 w-4 mr-2" />
                      Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      Configurações
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}