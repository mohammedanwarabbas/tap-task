import React, { useEffect, useState } from 'react';
import type { Lead } from '../store/leadStore';
import { useLeadStore } from '../store/leadStore';
import { Search, ListFilter, ArrowUpRight, Menu } from 'lucide-react';
import { RiNotification3Line } from '@remixicon/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import Sidebar from '../components/layout/Sidebar';
import ExportIcon from '../components/ui/ExportIcon';
import ZapierIcon from '../components/ui/ZapierIcon';
import PipedriveIcon from '../components/ui/PipedriveIcon';
import HubspotIcon from '../components/ui/HubspotIcon';
import avatar3 from '../assets/images/avatar-3.png';
import sophiaAvatar from '../assets/images/sophia-avatar-2.png';

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showExportAlert, setShowExportAlert] = useState(false);

  const {
    filteredLeads,
    searchTerm,
    selectedFilter,
    isLoading,
    showSearch,
    showFilterDropdown,
    activeTab,
    allSelected,
    setLeads,
    setSearchTerm,
    setSelectedFilter,
    setIsLoading,
    setShowSearch,
    setShowFilterDropdown,
    setActiveTab,
    toggleSelectAll,
    toggleSelectLead
  } = useLeadStore();

  useEffect(() => {
    fetchLeads();
  }, []);


  // fetch dummy user data from jsonplaceholder
  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await response.json();

      const mockLeads: Lead[] = users.map((user: any, index: number) => {
        // Simple array of possible tags (including empty tags) from which random will be selected
        const possibleTags = ['GITEX DUBAI', 'Team', 'Summit', undefined, undefined];
        const tag = possibleTags[index % possibleTags.length];
        return {
          id: user.id,
          name: user.name,
          email: user.email.toLowerCase(),
          tag,
          connected: Math.random() > 0.5,
          date: 'Aug 04 - 2025',
          day: 'Tuesday',
          selected: false
        };
      });
      setLeads(mockLeads);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // csv export operation of filtered data
  const exportData = async () => {
    setIsExporting(true);

    try {
      const csvData = filteredLeads.map(lead => ({
        Lead: lead.name,
        'Connected With': lead.name,
        Date: `${lead.day} ${lead.date}`
      }));

      if (csvData.length === 0) {
        alert('No data to export!');
        setIsExporting(false);
        return;
      }

      const csvContent = [
        Object.keys(csvData[0]).join(','),
        ...csvData.map(row => Object.values(row).join(','))
      ].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const now = new Date();
      const timestamp = now.toISOString().slice(0, 16).replace('T', '_').replace(':', '');

      link.setAttribute('href', url);
      link.setAttribute('download', `leads_export_${timestamp}_${filteredLeads.length}_records.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Revoke the object URL after a brief delay
      setTimeout(() => URL.revokeObjectURL(url), 100);
      setIsExporting(false);
      setShowExportAlert(true);
      setTimeout(() => setShowExportAlert(false), 3000);
    } catch (error) {
      console.error('Export error:', error);
      setIsExporting(false);
    }
  };

  // for AvatarFallback shadcn/ui component
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // using fixed color for tags
  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Team': return 'bg-team-bg text-team-text';
      case 'Summit': return 'bg-summit-bg text-summit-text';
      case 'GITEX DUBAI': return 'bg-gitex-bg text-gitex-text';
      default: return 'bg-bg-muted text-muted-text';
    }
  };

  // function that decides content of "export" column of leads table
  const renderExportCell = (lead: Lead) => {
    if (lead.tag === 'Team') {
      // display export button for "Team" tag
      return (
        <Button variant="outline" size="sm" className="text-secondary-text border-border-light bg-transparent hover:bg-gray-50 px-1 py-0">
          <ExportIcon className="w-4 h-4 mr-1" />
          <span className="font-medium">Export</span>
        </Button>
      );
    } else if (lead.tag === 'Summit' || lead.tag === undefined) {
      // display zapier icon for "Summit" tag or empty tags
      return (
        <div className="w-8 h-8 rounded-full border border-border-light bg-white flex items-center justify-center">
          <ZapierIcon className="w-6 h-6" />
        </div>
      );
    } else if (lead.tag === 'GITEX DUBAI') {
      // display export button for "GITEX DUBAI" tag
      return (
        <div className="flex items-center -space-x-3">
          <div className="w-8 h-8 rounded-full border border-border-light bg-white flex items-center justify-center z-30">
            <ZapierIcon className="w-6 h-6" />
          </div>
          <div className="w-8 h-8 rounded-full border border-border-light bg-white flex items-center justify-center z-20">
            <PipedriveIcon className="w-7 h-7 ml-1" />
          </div>
          <div className="w-8 h-8 rounded-full border border-border-light bg-white flex items-center justify-center z-10">
            <HubspotIcon className="w-6 h-6 mr-1" />
          </div>
        </div>
      );
    }
    return null;
  };

  // Leads table (main table)
  const renderLeadsTable = () => (
    <div className="space-y-4">
      {/* table header */}
      <div className="table-header bg-bg-light rounded-xl">
        <div className="hidden lg:grid lg:grid-cols-12 gap-4 px-4 py-2.5 text-sm font-medium text-secondary-text">
          <div className="col-span-3 flex items-left space-x-2">
            <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer" />
            <span>Lead</span>
          </div>
          <div className="col-span-2 text-center">Tags</div>
          <div className="col-span-3 text-left">Connected with</div>
          <div className="col-span-2 text-left">Date</div>
          <div className="col-span-2 text-center">Export</div>
        </div>
      </div>

      {/* table body */}
      <div className="table-content bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
        {isLoading ? (
          // sahdcn skeleton (5 rows)
          <div className="p-4 space-y-4">
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-1 lg:grid-cols-5 gap-4 p-4 border-b">
                {/* Desktop sekeleton: single column */}
                <div className="lg:hidden space-y-2">
                  <Skeleton className="h-5 w-3/4 bg-gray-200" />
                  <Skeleton className="h-4 w-1/2 bg-gray-200" />
                </div>
                {/* Desktop sekeleton: 5 columns */}
                {Array.from({ length: 5 }).map((_, colIndex) => (
                  <div key={colIndex} className="hidden lg:block">
                    <Skeleton className="h-5 bg-gray-200" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No leads found</div>
        ) : (
          filteredLeads.map((lead: Lead) => (
            <div key={lead.id} className="p-4 hover:bg-gray-50 transition-colors">

              {/* Non-desktop screen Layout - shown on small screens, hidden on desktop */}
              <div className="lg:hidden space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={lead.selected}
                    onChange={() => toggleSelectLead(lead.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-avatar-bg text-avatar-text text-sm">
                      NA
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-normal text-gray-900">{lead.name}</h3>
                    <p className="text-sm text-gray-500">{lead.email}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  {lead.tag ? (
                    <>
                      <Badge className={getTagColor(lead.tag)} variant="secondary">
                        {lead.tag}
                      </Badge>
                      <Badge className="bg-bg-muted text-muted-text" variant="secondary">
                        +4
                      </Badge>
                    </>
                  ) : (
                    <Badge className="bg-bg-muted text-muted-text border border-gray-300" variant="outline">
                      No tags added
                    </Badge>
                  )}
                </div>

                <div className="text-center">
                  <p className="text-xs font-medium text-secondary-text mb-1">Connected With:</p>
                  <div className="flex items-center justify-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={avatar3} alt="Connected user" />
                      <AvatarFallback className="bg-blue-200 text-blue-600 text-xs">
                        {getInitials(lead.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-normal">{lead.name}</p>
                      <p className="text-xs text-gray-500">{lead.email}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-primary-text font-normal text-sm">{lead.day}</div>
                    <div className="text-xs text-secondary-text">{lead.date}</div>
                  </div>
                  {renderExportCell(lead)}
                </div>
              </div>

              {/* Desktop Layout - hidden on mobile, shown on desktop */}
              <div className="hidden lg:grid lg:grid-cols-12 gap-4 items-center">
                <div className="col-span-3 flex items-center space-x-3 text-left">
                  <input
                    type="checkbox"
                    checked={lead.selected}
                    onChange={() => toggleSelectLead(lead.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-avatar-bg text-avatar-text text-sm">
                      NA
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-normal text-gray-900">{lead.name}</h3>
                    <p className="text-sm text-gray-500">{lead.email}</p>
                  </div>
                </div>

                <div className="col-span-2 flex flex-wrap gap-1 justify-center">
                  {lead.tag ? (
                    <>
                      <Badge className={getTagColor(lead.tag)} variant="secondary">
                        {lead.tag}
                      </Badge>
                      <Badge className="bg-bg-muted text-muted-text" variant="secondary">
                        +4
                      </Badge>
                    </>
                  ) : (
                    <Badge className="bg-bg-muted text-muted-text border border-gray-300" variant="outline">
                      No tags added
                    </Badge>
                  )}
                </div>

                <div className="col-span-3 flex items-center space-x-2 text-left">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={avatar3} alt="Connected user" />
                    <AvatarFallback className="bg-blue-200 text-blue-600 text-xs">
                      {getInitials(lead.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-normal">{lead.name}</p>
                    <p className="text-xs text-gray-500">{lead.email}</p>
                  </div>
                </div>

                <div className="col-span-2 text-sm text-left">
                  <div className="font-normal text-primary-text">{lead.day}</div>
                  <div className="text-xs text-secondary-text">{lead.date}</div>
                </div>

                <div className="col-span-2 flex justify-center">
                  {renderExportCell(lead)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  // lead quality score table
  const renderQualityTable = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-8">
      <h3 className="text-lg font-medium mb-4">Lead Quality Score</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Lead Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Quality Score</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                Under Development
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  // leaderboard table
  const renderLeaderboardTable = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-8">
      <h3 className="text-lg font-medium mb-4">Leaderboard</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Rank</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">User</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Score</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Achievement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                Under Development
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* main dashboard */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Dashboard header */}
        <header className="bg-white px-2 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 lg:space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="xl:hidden p-1"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <img src={sophiaAvatar} alt="SW" className="w-10 h-10 lg:w-12 lg:h-12 rounded-full" />
                  <div className="absolute bottom-0.5 -right-1 w-3.5 h-3.5 bg-success-green border-2 border-white rounded-full"></div>
                </div>
                <div className="min-w-0">
                  <h1 className="text-base lg:text-lg font-normal text-primary-text truncate">Sophia Williams</h1>
                  <p className="text-xs lg:text-sm text-secondary-text truncate">Welcome back to Synergy 👋🏻</p>
                </div>
              </div>
            </div>

            {/* search and notification icons */}
            <div className="flex items-center space-x-1 lg:space-x-2 pr-4">
              <div
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors"
              >
                <Search className="w-5 h-5 lg:w-6 lg:h-6 text-secondary-text hover:text-black" />
              </div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors relative">
                <RiNotification3Line className="w-5 h-5 lg:w-6 lg:h-6 text-secondary-text hover:text-black" />
                <div className="absolute top-[0.55rem] right-[0.55rem] w-1.5 h-1.5 bg-red-500 ring-2 ring-white rounded-full"></div>
              </div>
            </div>
          </div>
          {/* horizontal header divider */}
          <div className="mt-4 border-b border-border-light"></div>
        </header>


        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {/* Horizontal Filter Bar (table type selctor and search & filter buttons) */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
            {/* Table type tab selectors (Large screan: left aligned | Small screan: entire line)*/}
            <div className="bg-bg-light rounded-xl px-1 py-2 flex w-fit mx-auto lg:mx-0">
              <button
                onClick={() => setActiveTab('leads')}
                className={`px-3 lg:px-12 py-1 text-sm font-medium rounded-md transition-colors ${activeTab === 'leads'
                  ? 'bg-white text-primary-text shadow-md'
                  : 'text-light-text bg-transparent hover:text-gray-700'
                  }`}
              >
                Leads
              </button>
              <button
                onClick={() => setActiveTab('quality')}
                className={`px-3 lg:px-12 py-1 text-sm font-medium rounded-md transition-colors ${activeTab === 'quality'
                  ? 'bg-white text-primary-text shadow-md'
                  : 'text-light-text bg-transparent hover:text-gray-700'
                  }`}
              >
                Lead Quality Score
              </button>

              <button
                onClick={() => setActiveTab('leaderboard')}
                className={`px-3 lg:px-12 py-1 text-sm font-medium rounded-md transition-colors ${activeTab === 'leaderboard'
                  ? 'bg-white text-primary-text shadow-md'
                  : 'text-light-text bg-transparent hover:text-gray-700'
                  }`}
              >
                Leaderboard
              </button>
            </div>

            {/* Filter and Export buttons (Large screan: Right aligned | Small screan: New line) */}
            <div className="flex items-center justify-center lg:justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="text-secondary-text border-border-light bg-transparent hover:bg-gray-50"
              >
                <ListFilter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportData}
                disabled={isExporting}
                className="text-secondary-text border-border-light bg-transparent hover:bg-gray-50 disabled:opacity-50"
              >
                {isExporting ? 'Exporting...' : 'Export'}
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Filter Dropdown and Search Input for user to filter the data  */}
          {((showSearch || showFilterDropdown) && activeTab === 'leads') && (
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 space-y-4 lg:space-y-0">
              <div className="flex justify-center lg:justify-start">
                {showFilterDropdown && (
                  <select
                    className="px-3 py-2 border border-border-light rounded-md text-sm bg-white shadow-md"
                    value={selectedFilter}
                    autoFocus
                    onChange={(e) => setSelectedFilter(e.target.value)}
                  >
                    <option value="All">All Tags</option>
                    <option value="Team">Team</option>
                    <option value="Summit">Summit</option>
                    <option value="GITEX DUBAI">GITEX DUBAI</option>
                    <option value="No Tags">No tags added</option>
                  </select>
                )}
              </div>

              <div className="flex justify-center lg:justify-end">
                {showSearch && (
                  <div className="relative max-w-md animate-in slide-in-from-right-8 duration-300">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search leads..."
                      className="pl-10 border-border-light shadow-md"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      autoFocus
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Display Table based on the table type: Leads table/ Quality Score table/ Leaderboard table */}
          {activeTab === 'leads' && renderLeadsTable()}
          {activeTab === 'quality' && renderQualityTable()}
          {activeTab === 'leaderboard' && renderLeaderboardTable()}

          {/* display spinner/loader while exporting leads.csv */}
          {isExporting && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-700">Exporting filtered data...</p>
              </div>
            </div>
          )}

          {/*  show exported successfully shadcn/ui alert*/}
          {showExportAlert && (
            <div className="fixed top-4 right-4 z-50">
              <Alert className="w-[350px] border-green-200 bg-green-50 text-green-800">
                <AlertDescription>
                  Filtered data exported successfully!
                </AlertDescription>
              </Alert>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;