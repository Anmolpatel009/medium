-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  uid TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  address TEXT,
  location GEOGRAPHY(POINT) DEFAULT NULL,
  role TEXT NOT NULL CHECK (role IN ('freelancer', 'client')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  active_projects INTEGER DEFAULT 0,
  completed_projects INTEGER DEFAULT 0,
  tasks_applied INTEGER DEFAULT 0,
  total_earnings NUMERIC DEFAULT 0,
  unread_messages INTEGER DEFAULT 0,
  freelancer_profile JSONB DEFAULT NULL,
  client_profile JSONB DEFAULT NULL
);

-- Create tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  poster_name TEXT NOT NULL,
  poster_email TEXT NOT NULL,
  poster_phone TEXT NOT NULL,
  poster_will_pay TEXT NOT NULL,
  timeframe TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed', 'assigned')),
  task_type TEXT NOT NULL CHECK (task_type IN ('instant', 'discuss')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  interested_count INTEGER DEFAULT 0,
  client_id UUID REFERENCES users(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  assigned_to_name TEXT DEFAULT NULL,
  poster_location GEOGRAPHY(POINT) DEFAULT NULL
);

-- Create interests table
CREATE TABLE interests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  task_title TEXT NOT NULL,
  freelancer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  interested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(task_id, freelancer_id)
);

-- Create indexes for better performance
CREATE INDEX idx_tasks_created_at ON tasks(created_at DESC);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_client_id ON tasks(client_id);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_interests_freelancer_id ON interests(freelancer_id);
CREATE INDEX idx_interests_task_id ON interests(task_id);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_email ON users(email);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE interests ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid()::text = uid);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid()::text = uid);

CREATE POLICY "Authenticated users can insert their own user row" ON users
  FOR INSERT
  WITH CHECK (uid = auth.uid());

-- Create RLS policies for tasks table (public read, authenticated write)
CREATE POLICY "Anyone can view tasks" ON tasks
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert tasks" ON tasks
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own tasks" ON tasks
  FOR UPDATE USING (client_id = (SELECT id FROM users WHERE uid = auth.uid()::text));

-- Create RLS policies for interests table
CREATE POLICY "Users can view interests on tasks" ON interests
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create interests" ON interests
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
