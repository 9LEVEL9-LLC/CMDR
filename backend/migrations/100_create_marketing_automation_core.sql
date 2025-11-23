-- Marketing Automation Module - Core Tables
-- Phase 1: Foundation tables for Newsletter Growth AI

-- ============================================
-- CAMPAIGNS TABLE (Main campaign management)
-- ============================================
CREATE TABLE IF NOT EXISTS ma_campaigns (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Basic Information
    campaign_name VARCHAR(255) NOT NULL,
    campaign_description TEXT,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed', 'archived')),
    
    -- Goal Metrics
    target_subscribers INTEGER DEFAULT 100000,
    target_open_rate DECIMAL(5,2) DEFAULT 40.00,
    target_conversion_rate DECIMAL(5,2) DEFAULT 3.00,
    target_ranking INTEGER DEFAULT 10,
    monthly_budget DECIMAL(10,2) DEFAULT 5000.00,
    
    -- Current Metrics (actual performance)
    current_subscribers INTEGER DEFAULT 0,
    current_open_rate DECIMAL(5,2) DEFAULT 0,
    current_conversion_rate DECIMAL(5,2) DEFAULT 0,
    current_ranking INTEGER,
    
    -- Baseline Metrics (before AI)
    baseline_manual_hours_per_week DECIMAL(5,2) DEFAULT 50.00,
    baseline_plateau_subscribers INTEGER DEFAULT 10000,
    baseline_conversion_rate DECIMAL(5,2) DEFAULT 0.30,
    baseline_analytics_score INTEGER DEFAULT 0,
    
    -- Investment & Timeline
    total_investment DECIMAL(10,2) DEFAULT 45000.00,
    timeline_months INTEGER DEFAULT 3,
    monthly_payment DECIMAL(10,2) DEFAULT 15000.00,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    launched_at TIMESTAMP,
    completed_at TIMESTAMP
);

CREATE INDEX idx_ma_campaigns_user ON ma_campaigns(user_id);
CREATE INDEX idx_ma_campaigns_status ON ma_campaigns(status);

-- ============================================
-- CAMPAIGN FEATURES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ma_campaign_features (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    feature_name VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT false,
    configuration JSONB DEFAULT '{}',
    activated_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ma_features_campaign ON ma_campaign_features(campaign_id);

-- ============================================
-- API INTEGRATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ma_integrations (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL CHECK (provider IN ('apollo', 'substack', 'sendgrid', 'claude', 'pinecone', 'stripe', 'calendly')),
    
    -- Credentials (encrypted at application layer)
    api_key_encrypted TEXT,
    api_secret_encrypted TEXT,
    additional_config JSONB DEFAULT '{}',
    
    -- Status
    is_connected BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    last_sync TIMESTAMP,
    sync_status VARCHAR(50) DEFAULT 'pending' CHECK (sync_status IN ('pending', 'success', 'error')),
    error_message TEXT,
    
    -- Health check
    last_health_check TIMESTAMP,
    health_status VARCHAR(50) DEFAULT 'unknown' CHECK (health_status IN ('healthy', 'degraded', 'error', 'unknown')),
    response_time_ms INTEGER,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ma_integrations_campaign ON ma_integrations(campaign_id);
CREATE INDEX idx_ma_integrations_provider ON ma_integrations(provider);
CREATE UNIQUE INDEX idx_ma_integrations_unique ON ma_integrations(campaign_id, provider);

-- ============================================
-- INTEGRATION LOGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ma_integration_logs (
    id SERIAL PRIMARY KEY,
    integration_id INTEGER NOT NULL REFERENCES ma_integrations(id) ON DELETE CASCADE,
    log_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    log_type VARCHAR(20) CHECK (log_type IN ('info', 'warning', 'error')),
    message TEXT NOT NULL,
    request_data JSONB,
    response_data JSONB,
    error_details TEXT
);

CREATE INDEX idx_ma_int_logs_integration ON ma_integration_logs(integration_id);
CREATE INDEX idx_ma_int_logs_timestamp ON ma_integration_logs(log_timestamp DESC);

-- ============================================
-- CAMPAIGN USERS (Team Permissions)
-- ============================================
CREATE TABLE IF NOT EXISTS ma_campaign_users (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('owner', 'manager', 'analyst', 'member')),
    permissions JSONB DEFAULT '{"view_dashboard": true, "edit_campaigns": false, "manage_budget": false, "view_reports": true, "configure_integrations": false, "manage_team": false}',
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    added_by_user_id INTEGER REFERENCES users(id)
);

CREATE INDEX idx_ma_campaign_users_campaign ON ma_campaign_users(campaign_id);
CREATE INDEX idx_ma_campaign_users_user ON ma_campaign_users(user_id);
CREATE UNIQUE INDEX idx_ma_campaign_users_unique ON ma_campaign_users(campaign_id, user_id);

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ma_notifications (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    notification_type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    
    read BOOLEAN DEFAULT false,
    action_url TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP
);

CREATE INDEX idx_ma_notifications_user ON ma_notifications(user_id);
CREATE INDEX idx_ma_notifications_campaign ON ma_notifications(campaign_id);
CREATE INDEX idx_ma_notifications_created ON ma_notifications(created_at DESC);
CREATE INDEX idx_ma_notifications_read ON ma_notifications(read, user_id);

-- ============================================
-- NOTIFICATION PREFERENCES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ma_notification_preferences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    notification_type VARCHAR(100) NOT NULL,
    email_enabled BOOLEAN DEFAULT true,
    platform_enabled BOOLEAN DEFAULT true,
    sms_enabled BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_ma_notif_prefs_unique ON ma_notification_preferences(user_id, notification_type);

-- ============================================
-- AI ACTIVITY LOG TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ma_ai_activity_log (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    
    activity_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activity_type VARCHAR(100) NOT NULL,
    activity_category VARCHAR(50) CHECK (activity_category IN ('audience_building', 'outreach', 'nurture', 'conversion', 'optimization', 'reporting')),
    
    description TEXT NOT NULL,
    results JSONB DEFAULT '{}',
    success BOOLEAN DEFAULT true,
    error_message TEXT,
    
    -- AI cost tracking
    tokens_used INTEGER,
    cost DECIMAL(10,4)
);

CREATE INDEX idx_ma_ai_log_campaign ON ma_ai_activity_log(campaign_id);
CREATE INDEX idx_ma_ai_log_timestamp ON ma_ai_activity_log(activity_timestamp DESC);
CREATE INDEX idx_ma_ai_log_category ON ma_ai_activity_log(activity_category);

-- ============================================
-- SYSTEM HEALTH TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ma_system_health (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    
    check_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    component VARCHAR(100) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('healthy', 'degraded', 'error')),
    response_time_ms INTEGER,
    error_message TEXT,
    details JSONB DEFAULT '{}'
);

CREATE INDEX idx_ma_health_campaign ON ma_system_health(campaign_id);
CREATE INDEX idx_ma_health_timestamp ON ma_system_health(check_timestamp DESC);

-- ============================================
-- USER TIME TRACKING TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ma_user_time_tracking (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    activity_type VARCHAR(100) NOT NULL,
    activity_category VARCHAR(50) CHECK (activity_category IN ('strategy', 'review', 'content', 'approval', 'other')),
    
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    duration_minutes INTEGER,
    notes TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ma_time_campaign ON ma_user_time_tracking(campaign_id);
CREATE INDEX idx_ma_time_user ON ma_user_time_tracking(user_id);
CREATE INDEX idx_ma_time_date ON ma_user_time_tracking(start_time DESC);

-- ============================================
-- PAYMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ma_payments (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    
    payment_number INTEGER NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    
    due_date DATE NOT NULL,
    paid_date DATE,
    
    payment_method VARCHAR(50),
    transaction_id VARCHAR(255),
    invoice_url TEXT,
    
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ma_payments_campaign ON ma_payments(campaign_id);
CREATE INDEX idx_ma_payments_status ON ma_payments(status);

-- ============================================
-- CAMPAIGN BUDGET TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ma_campaign_budget (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL UNIQUE REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    
    total_budget DECIMAL(10,2) NOT NULL DEFAULT 45000.00,
    currency VARCHAR(3) DEFAULT 'USD',
    payment_structure VARCHAR(20) DEFAULT 'monthly' CHECK (payment_structure IN ('monthly', 'upfront', 'custom')),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- BUDGET LINE ITEMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ma_budget_line_items (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    
    item_name VARCHAR(255) NOT NULL,
    description TEXT,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ma_budget_items_campaign ON ma_budget_line_items(campaign_id);

-- ============================================
-- ROI METRICS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ma_roi_metrics (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    
    calculation_date DATE NOT NULL,
    
    total_investment DECIMAL(10,2) NOT NULL,
    actual_revenue DECIMAL(10,2) DEFAULT 0,
    projected_revenue DECIMAL(10,2),
    
    net_return DECIMAL(10,2),
    roi_multiple DECIMAL(10,4),
    
    time_saved_hours DECIMAL(10,2),
    time_value_hourly_rate DECIMAL(10,2) DEFAULT 200.00,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ma_roi_campaign ON ma_roi_metrics(campaign_id);
CREATE INDEX idx_ma_roi_date ON ma_roi_metrics(calculation_date DESC);

-- ============================================
-- Success message
-- ============================================
DO $$
BEGIN
    RAISE NOTICE 'Marketing Automation Core Tables Created Successfully';
    RAISE NOTICE 'Tables created: ma_campaigns, ma_campaign_features, ma_integrations, ma_integration_logs';
    RAISE NOTICE 'Tables created: ma_campaign_users, ma_notifications, ma_notification_preferences';
    RAISE NOTICE 'Tables created: ma_ai_activity_log, ma_system_health, ma_user_time_tracking';
    RAISE NOTICE 'Tables created: ma_payments, ma_campaign_budget, ma_budget_line_items, ma_roi_metrics';
END $$;

