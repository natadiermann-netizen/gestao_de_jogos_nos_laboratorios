
-- Laboratories table
CREATE TABLE laboratories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE laboratories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_labs" ON laboratories FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_labs" ON laboratories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_labs" ON laboratories FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_labs" ON laboratories FOR DELETE TO authenticated USING (true);

-- Computers table
CREATE TABLE computers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lab_id uuid NOT NULL REFERENCES laboratories(id) ON DELETE CASCADE,
  name text NOT NULL,
  is_online boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE computers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_computers" ON computers FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_computers" ON computers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_computers" ON computers FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_computers" ON computers FOR DELETE TO authenticated USING (true);

-- Games table
CREATE TABLE games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon_color text DEFAULT '#ef4444',
  is_permitted boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE games ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_games" ON games FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_games" ON games FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_games" ON games FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_games" ON games FOR DELETE TO authenticated USING (true);

-- Students table
CREATE TABLE students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  computer_id uuid REFERENCES computers(id) ON DELETE SET NULL,
  lab_id uuid REFERENCES laboratories(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_students" ON students FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_students" ON students FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_students" ON students FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_students" ON students FOR DELETE TO authenticated USING (true);

-- Game sessions table
CREATE TABLE game_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  game_id uuid NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  computer_id uuid REFERENCES computers(id) ON DELETE SET NULL,
  lab_id uuid REFERENCES laboratories(id) ON DELETE SET NULL,
  start_time timestamptz DEFAULT now(),
  end_time timestamptz,
  status text DEFAULT 'active' CHECK (status IN ('active', 'ended', 'blocked')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_sessions" ON game_sessions FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_sessions" ON game_sessions FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_sessions" ON game_sessions FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_sessions" ON game_sessions FOR DELETE TO authenticated USING (true);

-- Alerts table
CREATE TABLE alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL DEFAULT 'warning' CHECK (type IN ('warning', 'info')),
  title text NOT NULL,
  description text NOT NULL,
  student_name text,
  lab_name text,
  computer_name text,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_alerts" ON alerts FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_alerts" ON alerts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_alerts" ON alerts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_alerts" ON alerts FOR DELETE TO authenticated USING (true);

-- Seed data: Laboratories
INSERT INTO laboratories (id, name, status) VALUES
  ('11111111-0000-0000-0000-000000000001', 'Lab. Informática 01', 'active'),
  ('11111111-0000-0000-0000-000000000002', 'Lab. Informática 02', 'active'),
  ('11111111-0000-0000-0000-000000000003', 'Lab. Informática 03', 'active'),
  ('11111111-0000-0000-0000-000000000004', 'Lab. Automação', 'active'),
  ('11111111-0000-0000-0000-000000000005', 'Lab. Eletrônica', 'active'),
  ('11111111-0000-0000-0000-000000000006', 'Lab. CAD / CAM', 'inactive');

-- Seed data: Games
INSERT INTO games (id, name, icon_color, is_permitted) VALUES
  ('22222222-0000-0000-0000-000000000001', 'Valorant', '#ef4444', false),
  ('22222222-0000-0000-0000-000000000002', 'Counter Strike 2', '#f97316', false),
  ('22222222-0000-0000-0000-000000000003', 'League of Legends', '#3b82f6', false),
  ('22222222-0000-0000-0000-000000000004', 'GTA V', '#1a1a1a', false),
  ('22222222-0000-0000-0000-000000000005', 'Roblox', '#22c55e', false),
  ('22222222-0000-0000-0000-000000000006', 'Courier-eettero', '#6b7280', false),
  ('22222222-0000-0000-0000-000000000007', 'League of Pegando', '#22c55e', false),
  ('22222222-0000-0000-0000-000000000008', 'Navegando na Web', '#3b82f6', true);

-- Seed computers for Lab 01 (24 computers)
DO $$
DECLARE
  i int;
BEGIN
  FOR i IN 1..24 LOOP
    INSERT INTO computers (lab_id, name, is_online)
    VALUES ('11111111-0000-0000-0000-000000000001', 'PC-' || LPAD(i::text, 2, '0'), true);
  END LOOP;
END $$;

-- Seed computers for Lab 02 (20 computers)
DO $$
DECLARE
  i int;
BEGIN
  FOR i IN 1..20 LOOP
    INSERT INTO computers (lab_id, name, is_online)
    VALUES ('11111111-0000-0000-0000-000000000002', 'PC-' || LPAD(i::text, 2, '0'), true);
  END LOOP;
END $$;

-- Seed computers for Lab 03 (18 computers)
DO $$
DECLARE
  i int;
BEGIN
  FOR i IN 1..18 LOOP
    INSERT INTO computers (lab_id, name, is_online)
    VALUES ('11111111-0000-0000-0000-000000000003', 'PC-' || LPAD(i::text, 2, '0'), true);
  END LOOP;
END $$;

-- Seed computers for Lab Automação (16 computers)
DO $$
DECLARE
  i int;
BEGIN
  FOR i IN 1..16 LOOP
    INSERT INTO computers (lab_id, name, is_online)
    VALUES ('11111111-0000-0000-0000-000000000004', 'PC-' || LPAD(i::text, 2, '0'), true);
  END LOOP;
END $$;

-- Seed computers for Lab Eletrônica (18 computers)
DO $$
DECLARE
  i int;
BEGIN
  FOR i IN 1..18 LOOP
    INSERT INTO computers (lab_id, name, is_online)
    VALUES ('11111111-0000-0000-0000-000000000005', 'PC-' || LPAD(i::text, 2, '0'), true);
  END LOOP;
END $$;

-- Seed students
INSERT INTO students (id, name, computer_id, lab_id)
SELECT
  gen_random_uuid(),
  name,
  c.id,
  c.lab_id
FROM (VALUES
  ('Lucas F. Oliveira'),
  ('Rafael M. Santos'),
  ('Gabriel A. Trein'),
  ('Matheus R. Costa'),
  ('João V. Pereira'),
  ('Ana C. R. Silva'),
  ('Pedro H. Souza')
) AS s(name)
CROSS JOIN LATERAL (
  SELECT id, lab_id FROM computers
  WHERE lab_id = '11111111-0000-0000-0000-000000000001'
  ORDER BY random()
  LIMIT 1
) c;

-- Seed alerts
INSERT INTO alerts (type, title, description, student_name, lab_name, computer_name, is_read, created_at) VALUES
  ('warning', 'Jogo não permitido detectado', 'Valorant esta em execução por Lucas F.', 'Lucas F. Oliveira', 'Lab. 01', 'PC12', false, now() - interval '28 minutes'),
  ('warning', 'Tempo excessivo de jogo', 'GTA V em execução por João V. há mais de 60 minutos.', 'João V. Pereira', 'Lab. 01', 'PC09', false, now() - interval '45 minutes'),
  ('warning', 'Novo jogo não permitido', 'Roblox foi iniciado por Matheus R.', 'Matheus R. Costa', 'Lab. 02', 'PC07', false, now() - interval '49 minutes'),
  ('info', 'Atividade monitorada', 'Navegação na web permitida por Ana C. K. Silva.', 'Ana C. R. Silva', 'Lab. 03', 'PC01', true, now() - interval '62 minutes');
