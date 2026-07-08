
-- Add more laboratories (inactive)
INSERT INTO laboratories (id, name, status) VALUES
  ('11111111-0000-0000-0000-000000000007', 'Lab. Mecânica', 'inactive'),
  ('11111111-0000-0000-0000-000000000008', 'Lab. Química', 'inactive'),
  ('11111111-0000-0000-0000-000000000009', 'Lab. Física', 'active'),
  ('11111111-0000-0000-0000-00000000000a', 'Lab. Redes', 'active')
ON CONFLICT (id) DO NOTHING;

-- Add computers for Lab Física (14 computers)
DO $$
DECLARE
  i int;
BEGIN
  FOR i IN 1..14 LOOP
    INSERT INTO computers (lab_id, name, is_online)
    VALUES ('11111111-0000-0000-0000-000000000009', 'PC-' || LPAD(i::text, 2, '0'), true);
  END LOOP;
END $$;

-- Add computers for Lab Redes (12 computers)
DO $$
DECLARE
  i int;
BEGIN
  FOR i IN 1..12 LOOP
    INSERT INTO computers (lab_id, name, is_online)
    VALUES ('11111111-0000-0000-0000-00000000000a', 'PC-' || LPAD(i::text, 2, '0'), true);
  END LOOP;
END $$;

-- Update/expand games table with more variety
INSERT INTO games (id, name, icon_color, is_permitted) VALUES
  ('22222222-0000-0000-0000-000000000009', 'Minecraft', '#8B6914', false),
  ('22222222-0000-0000-0000-00000000000a', 'Free Fire', '#FF8C00', false),
  ('22222222-0000-0000-0000-00000000000b', 'Fortnite', '#9B59B6', false),
  ('22222222-0000-0000-0000-00000000000c', 'Among Us', '#C0392B', false),
  ('22222222-0000-0000-0000-00000000000d', 'Warzone', '#2C3E50', false),
  ('22222222-0000-0000-0000-00000000000e', 'FIFA 24', '#27AE60', false),
  ('22222222-0000-0000-0000-00000000000f', 'Overwatch 2', '#E67E22', false),
  ('22222222-0000-0000-0000-000000000010', 'Apex Legends', '#E74C3C', false),
  ('22222222-0000-0000-0000-000000000011', 'Clash of Clans', '#F39C12', false),
  ('22222222-0000-0000-0000-000000000012', 'Steam', '#1B2838', false)
ON CONFLICT (id) DO NOTHING;

-- Add more alerts
INSERT INTO alerts (type, title, description, student_name, lab_name, computer_name, is_read, created_at) VALUES
  ('warning', 'Jogo não permitido detectado', 'Minecraft foi iniciado por Fernanda K. no PC-05.', 'Fernanda K. Alves', 'Lab. 02', 'PC05', false, now() - interval '5 minutes'),
  ('warning', 'Jogo não permitido detectado', 'Free Fire em execução por Carlos E.', 'Carlos E. Nunes', 'Lab. 03', 'PC11', false, now() - interval '12 minutes'),
  ('info', 'Atividade monitorada', 'Navegação na web permitida por Diego S. Ferreira.', 'Diego S. Ferreira', 'Lab. 01', 'PC03', true, now() - interval '35 minutes');
