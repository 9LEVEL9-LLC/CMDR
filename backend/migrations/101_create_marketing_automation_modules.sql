-- Marketing Automation Module - Module-Specific Tables
-- Phase 1: Tables for 6 core modules

-- ============================================
-- MODULE 1: APOLLO-POWERED AUDIENCE BUILDING
-- ============================================

-- Apollo Configuration
CREATE TABLE IF NOT EXISTS ma_apollo_config (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL UNIQUE REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    
    api_key_encrypted TEXT,
    api_secret_encrypted TEXT,
    
    total_budget DECIMAL(10,2) DEFAULT 5000.00,
    budget_allocation JSONB DEFAULT '{}', -- JSON object of segment allocations
    
    is_connected BOOLEAN DEFAULT false,
    last_sync TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audience Segments
CREATE TABLE IF NOT EXISTS ma_audience_segments (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    
    segment_name VARCHAR(255) NOT NULL,
    targeting_criteria JSONB DEFAULT '{"functions": [], "industries": [], "geos": [], "interests": []}',
    
    budget_allocated DECIMAL(10,2) DEFAULT 0,
    budget_spent DECIMAL(10,2) DEFAULT 0,
    
    leads_acquired INTEGER DEFAULT 0,
    conversion_rate DECIMAL(5,2) DEFAULT 0,
    
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed')),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ma_segments_campaign ON ma_audience_segments(campaign_id);

-- Lead Scoring Configuration
CREATE TABLE IF NOT EXISTS ma_lead_scoring_config (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL UNIQUE REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    
    scoring_rules JSONB DEFAULT '{}',
    threshold_minimum INTEGER DEFAULT 50,
    threshold_optimal INTEGER DEFAULT 80,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- MODULE 2: VERIFIED OPT-IN FUNNEL SYSTEM
-- ============================================

-- Opt-In Funnels
CREATE TABLE IF NOT EXISTS ma_optin_funnels (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    
    funnel_name VARCHAR(255) NOT NULL,
    segment_id INTEGER REFERENCES ma_audience_segments(id) ON DELETE SET NULL,
    funnel_type VARCHAR(20) CHECK (funnel_type IN ('free', 'premium')),
    
    sequence JSONB DEFAULT '[]', -- Array of email sequence steps
    is_active BOOLEAN DEFAULT true,
    
    -- Performance
    total_sent INTEGER DEFAULT 0,
    total_opened INTEGER DEFAULT 0,
    total_clicked INTEGER DEFAULT 0,
    total_converted INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ma_funnels_campaign ON ma_optin_funnels(campaign_id);

-- Opt-In Email Templates
CREATE TABLE IF NOT EXISTS ma_optin_templates (
    id SERIAL PRIMARY KEY,
    funnel_id INTEGER NOT NULL REFERENCES ma_optin_funnels(id) ON DELETE CASCADE,
    
    template_name VARCHAR(255) NOT NULL,
    subject_line TEXT NOT NULL,
    email_body TEXT NOT NULL,
    
    personalization_tokens JSONB DEFAULT '[]',
    send_delay_hours INTEGER DEFAULT 0,
    sequence_order INTEGER DEFAULT 1,
    
    -- Performance
    sent_count INTEGER DEFAULT 0,
    open_rate DECIMAL(5,2) DEFAULT 0,
    click_rate DECIMAL(5,2) DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ma_templates_funnel ON ma_optin_templates(funnel_id);

-- Compliance Settings
CREATE TABLE IF NOT EXISTS ma_compliance_settings (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL UNIQUE REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    
    gdpr_enabled BOOLEAN DEFAULT true,
    can_spam_compliant BOOLEAN DEFAULT true,
    
    privacy_policy_url TEXT,
    consent_language TEXT,
    opt_out_process JSONB DEFAULT '{}',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- MODULE 3: ARCHIVE-INDEXED PERSONALIZATION
-- ============================================

-- Content Archive
CREATE TABLE IF NOT EXISTS ma_content_archive (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    
    content_type VARCHAR(50) CHECK (content_type IN ('substack_post', 'podcast_episode')),
    
    title TEXT NOT NULL,
    content_url TEXT,
    published_date DATE,
    content_text TEXT,
    
    -- Vector embedding stored as JSONB for compatibility
    vector_embedding JSONB,
    
    engagement_score DECIMAL(5,2) DEFAULT 0,
    value_hooks JSONB DEFAULT '[]',
    tone_profile JSONB DEFAULT '{}',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ma_archive_campaign ON ma_content_archive(campaign_id);
CREATE INDEX idx_ma_archive_type ON ma_content_archive(content_type);
CREATE INDEX idx_ma_archive_date ON ma_content_archive(published_date DESC);

-- Podcast Configuration
CREATE TABLE IF NOT EXISTS ma_podcast_config (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL UNIQUE REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    
    rss_feed_url TEXT,
    auto_sync_enabled BOOLEAN DEFAULT true,
    last_sync_at TIMESTAMP,
    transcript_source VARCHAR(100),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Archive Sync Status
CREATE TABLE IF NOT EXISTS ma_archive_sync_status (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL UNIQUE REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    
    total_posts_indexed INTEGER DEFAULT 0,
    total_podcasts_indexed INTEGER DEFAULT 0,
    
    last_sync_at TIMESTAMP,
    sync_status VARCHAR(20) CHECK (sync_status IN ('syncing', 'completed', 'error')),
    error_log TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- MODULE 4: GROWTH FLYWHEEL AUTOMATION
-- ============================================

-- Product Drops
CREATE TABLE IF NOT EXISTS ma_product_drops (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    
    drop_name VARCHAR(255) NOT NULL,
    drop_date DATE NOT NULL,
    product_description TEXT,
    price DECIMAL(10,2),
    
    target_segment_ids INTEGER[] DEFAULT '{}',
    promo_sequence JSONB DEFAULT '{}',
    
    sales_count INTEGER DEFAULT 0,
    revenue DECIMAL(10,2) DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ma_drops_campaign ON ma_product_drops(campaign_id);
CREATE INDEX idx_ma_drops_date ON ma_product_drops(drop_date);

-- Membership Tiers
CREATE TABLE IF NOT EXISTS ma_membership_tiers (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    
    tier_name VARCHAR(255) NOT NULL,
    tier_description TEXT,
    
    price_monthly DECIMAL(10,2),
    price_annual DECIMAL(10,2),
    
    benefits JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    
    member_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ma_tiers_campaign ON ma_membership_tiers(campaign_id);

-- Welcome Surveys
CREATE TABLE IF NOT EXISTS ma_welcome_surveys (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    
    survey_name VARCHAR(255) NOT NULL,
    questions JSONB DEFAULT '[]',
    trigger_condition VARCHAR(255),
    
    completion_rate DECIMAL(5,2) DEFAULT 0,
    total_sent INTEGER DEFAULT 0,
    total_completed INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ma_surveys_campaign ON ma_welcome_surveys(campaign_id);

-- Upsell Rules
CREATE TABLE IF NOT EXISTS ma_upsell_rules (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    
    rule_name VARCHAR(255) NOT NULL,
    trigger_conditions JSONB DEFAULT '{}',
    
    target_tier VARCHAR(255),
    offer_copy TEXT,
    
    conversion_rate DECIMAL(5,2) DEFAULT 0,
    total_triggered INTEGER DEFAULT 0,
    total_converted INTEGER DEFAULT 0,
    
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ma_upsell_campaign ON ma_upsell_rules(campaign_id);

-- ============================================
-- MODULE 5: ADAPTIVE NURTURE CAMPAIGN ENGINE
-- ============================================

-- Nurture Sequences
CREATE TABLE IF NOT EXISTS ma_nurture_sequences (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    
    sequence_name VARCHAR(255) NOT NULL,
    source_segment_id INTEGER REFERENCES ma_audience_segments(id) ON DELETE SET NULL,
    
    emails_in_sequence INTEGER DEFAULT 0,
    adaptation_rules JSONB DEFAULT '{}',
    
    is_active BOOLEAN DEFAULT true,
    
    -- Performance
    total_subscribers INTEGER DEFAULT 0,
    avg_completion_rate DECIMAL(5,2) DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ma_nurture_campaign ON ma_nurture_sequences(campaign_id);

-- Nurture Emails
CREATE TABLE IF NOT EXISTS ma_nurture_emails (
    id SERIAL PRIMARY KEY,
    sequence_id INTEGER NOT NULL REFERENCES ma_nurture_sequences(id) ON DELETE CASCADE,
    
    email_order INTEGER NOT NULL,
    subject_line TEXT NOT NULL,
    email_body TEXT NOT NULL,
    
    send_conditions JSONB DEFAULT '{}',
    wait_time_hours INTEGER DEFAULT 24,
    
    -- Performance
    sent_count INTEGER DEFAULT 0,
    open_rate DECIMAL(5,2) DEFAULT 0,
    click_rate DECIMAL(5,2) DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ma_nurture_emails_sequence ON ma_nurture_emails(sequence_id);

-- Engagement Tracking
CREATE TABLE IF NOT EXISTS ma_engagement_tracking (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    
    subscriber_email VARCHAR(255) NOT NULL,
    email_id INTEGER REFERENCES ma_nurture_emails(id) ON DELETE SET NULL,
    
    opened_at TIMESTAMP,
    clicked_at TIMESTAMP,
    clicked_links TEXT[],
    
    engagement_score DECIMAL(5,2) DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ma_engagement_campaign ON ma_engagement_tracking(campaign_id);
CREATE INDEX idx_ma_engagement_email ON ma_engagement_tracking(subscriber_email);

-- A/B Tests
CREATE TABLE IF NOT EXISTS ma_ab_tests (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    
    test_name VARCHAR(255) NOT NULL,
    
    variant_a JSONB NOT NULL,
    variant_b JSONB NOT NULL,
    
    split_percentage INTEGER DEFAULT 50,
    winner VARCHAR(1) CHECK (winner IN ('a', 'b', NULL)),
    
    start_date DATE,
    end_date DATE,
    
    results JSONB DEFAULT '{}',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ma_tests_campaign ON ma_ab_tests(campaign_id);

-- Attribution Touchpoints
CREATE TABLE IF NOT EXISTS ma_attribution_touchpoints (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    
    subscriber_email VARCHAR(255) NOT NULL,
    touchpoint_type VARCHAR(100) NOT NULL,
    touchpoint_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    attributed_value DECIMAL(10,2) DEFAULT 0,
    
    metadata JSONB DEFAULT '{}'
);

CREATE INDEX idx_ma_attribution_campaign ON ma_attribution_touchpoints(campaign_id);
CREATE INDEX idx_ma_attribution_email ON ma_attribution_touchpoints(subscriber_email);

-- ============================================
-- MODULE 6: PERFORMANCE INTELLIGENCE
-- ============================================

-- Performance Metrics
CREATE TABLE IF NOT EXISTS ma_performance_metrics (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    
    date DATE NOT NULL,
    
    emails_sent INTEGER DEFAULT 0,
    emails_opened INTEGER DEFAULT 0,
    emails_clicked INTEGER DEFAULT 0,
    
    open_rate DECIMAL(5,2) DEFAULT 0,
    click_rate DECIMAL(5,2) DEFAULT 0,
    
    new_subscribers INTEGER DEFAULT 0,
    new_premium_subscribers INTEGER DEFAULT 0,
    
    revenue DECIMAL(10,2) DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ma_metrics_campaign ON ma_performance_metrics(campaign_id);
CREATE INDEX idx_ma_metrics_date ON ma_performance_metrics(date DESC);
CREATE UNIQUE INDEX idx_ma_metrics_unique ON ma_performance_metrics(campaign_id, date);

-- Segment Performance
CREATE TABLE IF NOT EXISTS ma_segment_performance (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    segment_id INTEGER NOT NULL REFERENCES ma_audience_segments(id) ON DELETE CASCADE,
    
    date DATE NOT NULL,
    
    spend DECIMAL(10,2) DEFAULT 0,
    leads_acquired INTEGER DEFAULT 0,
    cpa DECIMAL(10,2) DEFAULT 0,
    
    conversion_rate DECIMAL(5,2) DEFAULT 0,
    roi DECIMAL(10,4) DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ma_seg_perf_campaign ON ma_segment_performance(campaign_id);
CREATE INDEX idx_ma_seg_perf_segment ON ma_segment_performance(segment_id);
CREATE INDEX idx_ma_seg_perf_date ON ma_segment_performance(date DESC);

-- Budget Reallocations
CREATE TABLE IF NOT EXISTS ma_budget_reallocations (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    
    reallocation_date DATE DEFAULT CURRENT_DATE,
    
    from_segment_id INTEGER REFERENCES ma_audience_segments(id) ON DELETE SET NULL,
    to_segment_id INTEGER REFERENCES ma_audience_segments(id) ON DELETE SET NULL,
    
    amount DECIMAL(10,2) NOT NULL,
    reason TEXT,
    ai_recommended BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ma_realloc_campaign ON ma_budget_reallocations(campaign_id);

-- Automated Reports
CREATE TABLE IF NOT EXISTS ma_automated_reports (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    
    report_type VARCHAR(100) NOT NULL,
    frequency VARCHAR(20) CHECK (frequency IN ('daily', 'weekly', 'monthly')),
    
    recipients JSONB DEFAULT '[]',
    
    last_sent_at TIMESTAMP,
    next_send_at TIMESTAMP,
    
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ma_reports_campaign ON ma_automated_reports(campaign_id);

-- Performance Alerts
CREATE TABLE IF NOT EXISTS ma_performance_alerts (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER NOT NULL REFERENCES ma_campaigns(id) ON DELETE CASCADE,
    
    alert_type VARCHAR(100) NOT NULL,
    threshold_value DECIMAL(10,2),
    current_value DECIMAL(10,2),
    
    triggered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'acknowledged', 'resolved')),
    
    alert_message TEXT,
    recommendations JSONB DEFAULT '[]'
);

CREATE INDEX idx_ma_alerts_campaign ON ma_performance_alerts(campaign_id);
CREATE INDEX idx_ma_alerts_status ON ma_performance_alerts(status);

-- ============================================
-- Success message
-- ============================================
DO $$
BEGIN
    RAISE NOTICE 'Marketing Automation Module Tables Created Successfully';
    RAISE NOTICE 'Module 1 (Apollo): ma_apollo_config, ma_audience_segments, ma_lead_scoring_config';
    RAISE NOTICE 'Module 2 (Opt-In): ma_optin_funnels, ma_optin_templates, ma_compliance_settings';
    RAISE NOTICE 'Module 3 (Archive): ma_content_archive, ma_podcast_config, ma_archive_sync_status';
    RAISE NOTICE 'Module 4 (Flywheel): ma_product_drops, ma_membership_tiers, ma_welcome_surveys, ma_upsell_rules';
    RAISE NOTICE 'Module 5 (Nurture): ma_nurture_sequences, ma_nurture_emails, ma_engagement_tracking, ma_ab_tests, ma_attribution_touchpoints';
    RAISE NOTICE 'Module 6 (Performance): ma_performance_metrics, ma_segment_performance, ma_budget_reallocations, ma_automated_reports, ma_performance_alerts';
END $$;

