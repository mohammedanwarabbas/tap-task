import React from 'react';
import { Users, Settings, ListCheck, Tag, WandSparkles, CreditCard, IdCard, SlidersHorizontal, TableOfContents, ChevronRight, X } from 'lucide-react';
import { RiHome5Line, RiExpandUpDownLine, RiVerifiedBadgeFill } from '@remixicon/react';
import ThreeUsersIcon from '../ui/ThreeUsersIcon';
import synergyLogo from './../../assets/images/synergy-logo.png';
import sophiaAvatar1 from './../../assets/images/sophia-avatar-1.png';
import teamMember1 from './../../assets/images/team-member-avatar-1.png';
import teamMember2 from './../../assets/images/team-member-avatar-2.png';
import teamMember3 from './../../assets/images/team-member-avatar-3.png';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const menuItems = [
    { icon: RiHome5Line, label: 'Home', active: true, category: 'none' },
    { icon: Users, label: 'Members', active: false, category: 'Team Management' },
    { icon: ThreeUsersIcon, label: 'Departments', active: false, category: 'Team Management' },
    { icon: ListCheck, label: 'Bulk Adjustments', active: false, category: 'Team Management' },
    { icon: IdCard, label: 'Leads', active: false, category: 'Leads Management' },
    { icon: Tag, label: 'Tags', active: false, category: 'Leads Management' },
    { icon: WandSparkles, label: 'Customization', active: false, category: 'Brand & Products' },
    { icon: CreditCard, label: 'Products', active: false, category: 'Brand & Products' },
    { icon: SlidersHorizontal, label: 'Integrations', active: false, category: 'Configuration' },
    { icon: Settings, label: 'Settings', active: false, category: 'Configuration' },
    { icon: TableOfContents, label: 'FAQs', active: false, category: 'Support' }
  ];

  const categories = ['Team Management', 'Leads Management', 'Brand & Products', 'Configuration', 'Support'];

  return (
    <>
      {/* Mobile & Tablet overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 xl:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed xl:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out flex flex-col overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="p-4 flex-shrink-0">
          <div className="flex items-center justify-between mt-2 pb-1">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 bg-brand-purple rounded-full flex items-center justify-center">
                <img src={synergyLogo} alt="Synergy" className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-900">Synergy</h2>
                <p className="text-xs text-gray-500">HR Management</p>
              </div>
            </div>
            <button className="p-1.5 border border-border-light rounded-md bg-transparent hover:bg-gray-100">
              <RiExpandUpDownLine className="w-4 h-4 text-expand-icon" />
            </button>
          </div>
          {/* Sidebar Header Divider */}
          <div className="mx-1 mt-4 border-b border-border-light"></div>
        </div>

        {/* Navigation */}
        <nav className="px-4 pb-2 space-y-1 flex-1 overflow-y-auto">
          {/* Home  Menu*/}
          <div className="mb-2">
            <button className='w-full flex items-center space-x-3 px-3 rounded-lg text-left transition-colors bg-purple-100 text-active-purple py-2.5'>
              <div className='text-active-purple'>
                {(() => {
                  const IconComponent = menuItems[0].icon;
                  return <IconComponent className="w-5 h-5" />;
                })()}
              </div>
              <span className='text-sm font-medium text-active-purple'>
                {menuItems[0].label}
              </span>
            </button>
          </div>

          {/* non active menus */}
          {categories.map((category) => (
            <div key={category} className="pt-4">
              <h3 className="text-xs font-medium text-category-text uppercase tracking-wide mb-1">
                {category}
              </h3>
              {menuItems
                .filter(item => item.category === category)
                .map((item, index) => (
                  <button key={index}
                    className='w-full flex items-center space-x-3 px-3 rounded-lg text-left transition-colors text-tertiary-text hover:bg-gray-100 py-1.5'>
                    <div className='text-tertiary-text'>
                      {<item.icon className="w-5 h-5" />}
                    </div>
                    <span className='text-sm font-medium text-tertiary-text'>
                      {item.label}
                    </span>
                  </button>
                ))}
            </div>
          ))}

          {/* Spacer div */}
          <div className="h-4"></div>

          {/* Team Upgrade Section */}
          <div className="border border-border-light rounded-xl p-3">
            <div className="flex items-center justify-between mb-3">
              {/* Avatar bar with 3 overlapping team members */}
              <div className="flex items-center space-x-1 border border-border-lighter rounded-full px-2 py-1 bg-transparent">
                <div className="flex -space-x-1.5">
                  <img src={teamMember1} alt="Team member 1" className="w-7 h-7 rounded-full border-2 border-white z-10" />
                  <img src={teamMember2} alt="Team member 2" className="w-7 h-7 rounded-full border-2 border-white z-20" />
                  <img src={teamMember3} alt="Team member 3" className="w-7 h-7 rounded-full border-2 border-white z-30" />
                </div>
                <span className="text-xs text-tertiary-text ml-1">+4</span>
              </div>
              {/* Close button */}
              <button className="text-tertiary-text hover:bg-gray-100 p-1 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main text */}
            <p className="text-sm font-medium text-tertiary-text mb-2">Onboard your team members</p>

            {/* Progress bar */}
            <div className="w-full bg-border-light rounded-full h-2 mb-2">
              <div className="bg-success-green h-2 rounded-full" style={{ width: '35%' }}></div>
            </div>

            {/* CSV text */}
            <p className="text-xs text-tertiary-text mb-2">Upload your team via CSV</p>

            {/* Onboard link */}
            <button className="flex items-center w-full text-sm font-medium text-tertiary-text underline hover:no-underline">
              <span>Onboard your team</span>
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </nav>

        {/* Bottom Divider */}
        <div className="mx-4 border-b border-border-light flex-shrink-0"></div>

        {/* Footer - User Profile Card */}
        <div className="footer p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Avatar */}
              <img src={sophiaAvatar1} alt="Sophia Williams" className="w-8 h-8 rounded-full" />
              <div>
                <div className="flex items-center space-x-1">
                  <p className="text-sm font-medium text-tertiary-text">Sophia Williams</p>
                  {/* verification bdadge */}
                  <RiVerifiedBadgeFill className="w-4 h-4 text-verification-blue" />
                </div>
                <p className="text-xs text-tertiary-text">sophia@allgmail.com</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-expand-icon" />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;