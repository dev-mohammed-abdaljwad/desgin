import { Outlet } from 'react-router';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';
import { useLanguage } from '../../context/LanguageContext';

export function AdminLayout() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <AdminSidebar />
      
      <div className={`${isRTL ? 'mr-[280px]' : 'ml-[280px]'} transition-all duration-300`}>
        <AdminTopbar />
        
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
