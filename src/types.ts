export interface Laboratory {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  student_count?: number;
}

export interface Computer {
  id: string;
  lab_id: string;
  name: string;
  is_online: boolean;
}

export interface Game {
  id: string;
  name: string;
  icon_color: string;
  is_permitted: boolean;
}

export interface Student {
  id: string;
  name: string;
  computer_id: string | null;
  lab_id: string | null;
  computer?: Computer;
  lab?: Laboratory;
}

export interface GameSession {
  id: string;
  student_id: string;
  game_id: string;
  computer_id: string | null;
  lab_id: string | null;
  start_time: string;
  end_time: string | null;
  status: 'active' | 'ended' | 'blocked';
  student?: Student;
  game?: Game;
  computer?: Computer;
  lab?: Laboratory;
}

export interface Alert {
  id: string;
  type: 'warning' | 'info';
  title: string;
  description: string;
  student_name: string | null;
  lab_name: string | null;
  computer_name: string | null;
  is_read: boolean;
  created_at: string;
}

export type Screen =
  | 'splash'
  | 'login'
  | 'home'
  | 'laboratories'
  | 'lab-detail'
  | 'game-detail'
  | 'games'
  | 'students'
  | 'alerts'
  | 'reports'
  | 'profile';
