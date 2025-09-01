import { create } from 'zustand';

export interface Lead {
  id: number;
  name: string;
  email: string;
  tag: string | undefined;
  connected: boolean;
  date: string;
  day: string;
  selected: boolean;
}

interface LeadStore {
  leads: Lead[];
  filteredLeads: Lead[];
  searchTerm: string;
  selectedFilter: string;
  isLoading: boolean;
  showSearch: boolean;
  showFilterDropdown: boolean;
  activeTab: 'leads' | 'quality' | 'leaderboard';
  allSelected: boolean;
  setLeads: (leads: Lead[]) => void;
  setSearchTerm: (term: string) => void;
  setSelectedFilter: (filter: string) => void;
  setIsLoading: (loading: boolean) => void;
  setShowSearch: (show: boolean) => void;
  setShowFilterDropdown: (show: boolean) => void;
  setActiveTab: (tab: 'leads' | 'quality' | 'leaderboard') => void;
  toggleSelectAll: () => void;
  toggleSelectLead: (id: number) => void;
  filterLeads: () => void;
}

export const useLeadStore = create<LeadStore>((set, get) => ({
  leads: [],
  filteredLeads: [],
  searchTerm: '',
  selectedFilter: 'All',
  isLoading: false,
  showSearch: false,
  showFilterDropdown: false,
  activeTab: 'leads',
  allSelected: false,

  setLeads: (leads) => {
    set({ leads });
    get().filterLeads();
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterLeads();
  },

  setSelectedFilter: (filter) => {
    set({ selectedFilter: filter });
    get().filterLeads();
  },

  setIsLoading: (loading) => set({ isLoading: loading }),
  setShowSearch: (show) => set({ showSearch: show }),
  setShowFilterDropdown: (show) => set({ showFilterDropdown: show }),
  setActiveTab: (tab) => set({ activeTab: tab }),

  toggleSelectAll: () => {
    const { allSelected, filteredLeads } = get();
    const newAllSelected = !allSelected;
    const updatedLeads = get().leads.map(lead => {
      const isInFiltered = filteredLeads.some(fl => fl.id === lead.id);
      return isInFiltered ? { ...lead, selected: newAllSelected } : lead;
    });
    set({ leads: updatedLeads, allSelected: newAllSelected });
    get().filterLeads();
  },

  toggleSelectLead: (id) => {
    const updatedLeads = get().leads.map(lead =>
      lead.id === id ? { ...lead, selected: !lead.selected } : lead
    );
    const selectedCount = updatedLeads.filter(lead => lead.selected).length;
    const allSelected = selectedCount === get().filteredLeads.length && selectedCount > 0;
    set({ leads: updatedLeads, allSelected });
    get().filterLeads();
  },

  filterLeads: () => {
    const { leads, searchTerm, selectedFilter } = get();
    let filtered = [...leads];

    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedFilter !== 'All') {
      if (selectedFilter === 'No Tags') {
        // for empty tags
        filtered = filtered.filter(lead =>
          lead.tag === undefined
        );
      } else {
        // for non empty tags
        filtered = filtered.filter(lead =>
          lead.tag === selectedFilter
        );
      }

    }

    set({ filteredLeads: filtered });
  }
}));