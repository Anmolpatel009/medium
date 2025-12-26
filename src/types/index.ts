
export interface Task {
  id: string;
  title: string;
  description: string;
  location: string;
  poster_name: string;
  poster_email: string;
  poster_phone: string;
  poster_will_pay: string;
  timeframe: string;
  status: 'open' | 'closed' | 'assigned';
  task_type: 'instant' | 'discuss';
  created_at: string;
  interested_count?: number;
  client_id?: string;
  assigned_to?: string;
  assigned_to_name?: string;
  poster_location?: {
    type: string;
    coordinates: [number, number];
  };
}

export interface User {
  id: string;
  uid: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  location?: {
    type: string;
    coordinates: [number, number];
  };
  role: 'freelancer' | 'client';
  created_at: string;
  updated_at: string;
  active_projects: number;
  completed_projects: number;
  tasks_applied: number;
  total_earnings: number;
  unread_messages: number;
  freelancer_profile?: {
    fullName: string;
    skills: string[];
    services: string;
    experience: number;
    hourlyRate: number;
  };
  client_profile?: {
    companyName: string;
    industry: string;
  };
}

export interface Interest {
  id: string;
  task_id: string;
  task_title: string;
  freelancer_id: string;
  interested_at: string;
}

    