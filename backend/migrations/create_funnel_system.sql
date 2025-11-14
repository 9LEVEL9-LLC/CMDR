-- Create funnel system for managing email sequences and marketing funnels

-- Funnels table (e.g., Webinar Funnel, Onboarding Funnel, etc.)
CREATE TABLE IF NOT EXISTS funnels (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  funnel_type TEXT NOT NULL, -- 'webinar', 'onboarding', 'sales', 'nurture'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Funnel steps (stages in the funnel)
CREATE TABLE IF NOT EXISTS funnel_steps (
  id SERIAL PRIMARY KEY,
  funnel_id INTEGER NOT NULL REFERENCES funnels(id) ON DELETE CASCADE,
  step_order INTEGER NOT NULL,
  step_name TEXT NOT NULL,
  step_type TEXT NOT NULL, -- 'email', 'landing_page', 'wait', 'conditional'
  delay_hours INTEGER DEFAULT 0, -- Hours after previous step
  template_id INTEGER REFERENCES email_templates(id),
  conditions JSONB, -- For conditional logic
  created_at TIMESTAMP DEFAULT NOW()
);

-- Funnel enrollments (track who's in which funnel)
CREATE TABLE IF NOT EXISTS funnel_enrollments (
  id SERIAL PRIMARY KEY,
  funnel_id INTEGER NOT NULL REFERENCES funnels(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  current_step INTEGER DEFAULT 1,
  status TEXT DEFAULT 'active', -- 'active', 'completed', 'paused', 'exited'
  enrolled_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  metadata JSONB, -- Store custom data like webinar_date, etc.
  UNIQUE(funnel_id, user_id)
);

-- Funnel step completions (track progress)
CREATE TABLE IF NOT EXISTS funnel_step_completions (
  id SERIAL PRIMARY KEY,
  enrollment_id INTEGER NOT NULL REFERENCES funnel_enrollments(id) ON DELETE CASCADE,
  step_id INTEGER NOT NULL REFERENCES funnel_steps(id) ON DELETE CASCADE,
  completed_at TIMESTAMP DEFAULT NOW(),
  email_sent_id INTEGER, -- Link to email_outbox if email was sent
  UNIQUE(enrollment_id, step_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_funnel_enrollments_user ON funnel_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_funnel_enrollments_funnel ON funnel_enrollments(funnel_id);
CREATE INDEX IF NOT EXISTS idx_funnel_steps_funnel ON funnel_steps(funnel_id);

COMMENT ON TABLE funnels IS 'Marketing and email funnels';
COMMENT ON TABLE funnel_steps IS 'Steps/stages in each funnel';
COMMENT ON TABLE funnel_enrollments IS 'Tracks which users are enrolled in which funnels';











