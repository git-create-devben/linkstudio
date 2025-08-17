import CouponManager from '@/components/admin/CouponManager';
import { getUser } from '@/actions/authActions';
import { redirect } from 'next/navigation';

const AdminCouponsPage = async () => {
  const user = await getUser();
  
  // Simple admin check - you can make this more sophisticated
  const adminEmails = ['your-admin-email@example.com']; // Replace with your email
  
  if (!user || !adminEmails.includes(user.email)) {
    redirect('/dashboard');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Coupon Management</h1>
      <CouponManager />
    </div>
  );
};

export default AdminCouponsPage;