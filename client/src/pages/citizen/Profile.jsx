import React, { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { User, Mail, Phone, MapPin, Building, ShieldCheck, Loader2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToastStore } from '../../store/toastStore';
import Button from '../../components/ui/Button';

export default function Profile() {
  const { user, fetchProfile, isLoading, logout } = useAuthStore();
  const { showToast } = useToastStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    showToast("Successfully logged out!", "success");
    navigate('/login');
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (isLoading && !user) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 text-[#9BA8A6]">
        <Loader2 className="animate-spin text-[#E8A33D]" size={32} />
        <p>Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1B1E] text-[#F2EFE9] p-6 md:p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-[#1D3238] pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display text-[#F2EFE9]">Profile</h1>
          <p className="text-sm text-[#9BA8A6] mt-1">Manage your personal information and preferences.</p>
        </div>
        <Button variant="primary">Edit Profile</Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Avatar Card */}
        <div className="col-span-1">
          <div className="bg-[#16262A] border border-[#1D3238] rounded-xl p-6 flex flex-col items-center text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-[#1D3238] border-2 border-[#E8A33D] flex items-center justify-center text-3xl text-[#E8A33D] font-bold shadow-lg">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
            </div>
            <div>
              <h2 className="text-xl font-bold font-display text-[#F2EFE9]">{user?.name || 'Citizen User'}</h2>
              <p className="text-sm text-[#E8A33D] font-mono mt-1 capitalize">{user?.role || 'Citizen'}</p>
            </div>
            
            <div className="w-full pt-4 border-t border-[#1D3238]">
              <div className="flex items-center justify-center gap-2 text-sm text-[#2F9E8F] bg-[#2F9E8F]/10 py-2 rounded-lg">
                <ShieldCheck size={16} />
                <span>Verified Account</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="bg-[#16262A] border border-[#1D3238] rounded-xl p-6">
            <h3 className="text-lg font-bold font-display text-[#F2EFE9] mb-4">Personal Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#1D3238] rounded-lg text-[#9BA8A6]">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-xs text-[#9BA8A6] mb-1">Full Name</p>
                  <p className="text-sm font-medium text-[#F2EFE9]">{user?.name || 'Citizen User'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#1D3238] rounded-lg text-[#9BA8A6]">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-[#9BA8A6] mb-1">Email Address</p>
                  <p className="text-sm font-medium text-[#F2EFE9]">{user?.email || 'citizen@example.com'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#1D3238] rounded-lg text-[#9BA8A6]">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs text-[#9BA8A6] mb-1">Phone Number</p>
                  <p className="text-sm font-medium text-[#F2EFE9]">{user?.phone || '+91 XXXXX XXXXX'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#1D3238] rounded-lg text-[#9BA8A6]">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-[#9BA8A6] mb-1">Address</p>
                  <p className="text-sm font-medium text-[#F2EFE9]">{user?.address || 'Not provided'}</p>
                </div>
              </div>
              
              {user?.role === 'hei' || user?.role === 'industry_csr' ? (
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#1D3238] rounded-lg text-[#9BA8A6]">
                    <Building size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-[#9BA8A6] mb-1">Organization</p>
                    <p className="text-sm font-medium text-[#F2EFE9]">{user?.institutionName || user?.companyName || 'Not provided'}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="bg-[#16262A] border border-[#1D3238] rounded-xl p-6">
            <h3 className="text-lg font-bold font-display text-[#F2EFE9] mb-4">Account Security</h3>
            <div className="flex items-center justify-between border-b border-[#1D3238] pb-4 mb-4">
              <div>
                <p className="text-sm font-medium text-[#F2EFE9]">Password</p>
                <p className="text-xs text-[#9BA8A6] mt-1">Last changed 3 months ago</p>
              </div>
              <Button variant="outline" className="text-xs border-[#1D3238] hover:border-[#E8A33D] hover:text-[#E8A33D]">
                Change Password
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-400">Log Out</p>
                <p className="text-xs text-[#9BA8A6] mt-1">End your current session</p>
              </div>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="text-xs border-red-900/50 text-red-400 hover:bg-red-400/10 hover:border-red-400 transition-colors flex items-center gap-2"
              >
                <LogOut size={14} />
                Logout
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
