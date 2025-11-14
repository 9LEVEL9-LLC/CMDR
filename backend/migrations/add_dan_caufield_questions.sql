-- Add Strategic Discovery Questions for Dan Caufield (clientdan)
-- General questions to understand the business and requirements

DO $$
DECLARE
    client_id INTEGER;
BEGIN
    -- Get Dan Caufield's client ID
    SELECT id INTO client_id FROM users WHERE username = 'clientdan';

    -- ============================================================
    -- BUSINESS CONTEXT & OVERVIEW
    -- ============================================================
    
    INSERT INTO client_questions (client_id, category, category_label, question, display_order)
    VALUES 
    (client_id, 'business_context', 'Business Context & Overview', 'What does HQ Group do? Please describe your core business, products, and services.', 1),
    (client_id, 'business_context', 'Business Context & Overview', 'Who are your primary customers or target market? (Industry, company size, location, etc.)', 2),
    (client_id, 'business_context', 'Business Context & Overview', 'What are your top 3 business goals for the next 12 months?', 3),
    (client_id, 'business_context', 'Business Context & Overview', 'What are the biggest challenges or pain points your business faces right now?', 4),
    (client_id, 'business_context', 'Business Context & Overview', 'How many employees do you have? What are the main departments/teams?', 5),
    (client_id, 'business_context', 'Business Context & Overview', 'What makes your company unique? What is your competitive advantage?', 6);
    
    -- ============================================================
    -- CURRENT OPERATIONS & PROCESSES
    -- ============================================================
    
    INSERT INTO client_questions (client_id, category, category_label, question, display_order)
    VALUES 
    (client_id, 'operations', 'Current Operations & Processes', 'What are your main business processes? (Sales, marketing, customer service, operations, etc.)', 101),
    (client_id, 'operations', 'Current Operations & Processes', 'What tools and software platforms does your team currently use? (CRM, project management, communication, etc.)', 102),
    (client_id, 'operations', 'Current Operations & Processes', 'Where is your company knowledge stored? (Google Drive, Notion, SharePoint, email, etc.)', 103),
    (client_id, 'operations', 'Current Operations & Processes', 'What tasks or processes take up the most time for your team? What feels inefficient?', 104),
    (client_id, 'operations', 'Current Operations & Processes', 'How do new employees get onboarded and trained? How long does it take them to become productive?', 105);
    
    -- ============================================================
    -- SALES & MARKETING
    -- ============================================================
    
    INSERT INTO client_questions (client_id, category, category_label, question, display_order)
    VALUES 
    (client_id, 'sales_marketing', 'Sales & Marketing', 'How do you currently generate leads or acquire new customers?', 201),
    (client_id, 'sales_marketing', 'Sales & Marketing', 'What is your typical sales process from first contact to closed deal?', 202),
    (client_id, 'sales_marketing', 'Sales & Marketing', 'What are the most common questions or objections you hear from prospects?', 203),
    (client_id, 'sales_marketing', 'Sales & Marketing', 'Do you have marketing campaigns running? What channels work best for you?', 204);
    
    -- ============================================================
    -- TECHNOLOGY & INTEGRATION
    -- ============================================================
    
    INSERT INTO client_questions (client_id, category, category_label, question, display_order)
    VALUES 
    (client_id, 'technical', 'Technology & Integration', 'Do you have a website? If so, what is the URL and what platform is it built on?', 301),
    (client_id, 'technical', 'Technology & Integration', 'What systems would you want an AI platform to integrate with? (Gmail, Slack, CRM, etc.)', 302),
    (client_id, 'technical', 'Technology & Integration', 'Do you have any existing automation or AI tools in place? What are they?', 303);
    
    -- ============================================================
    -- AI & AUTOMATION GOALS
    -- ============================================================
    
    INSERT INTO client_questions (client_id, category, category_label, question, display_order)
    VALUES 
    (client_id, 'ai_goals', 'AI & Automation Goals', 'What specific problems are you hoping AI or automation can solve for your business?', 401),
    (client_id, 'ai_goals', 'AI & Automation Goals', 'If you could automate or improve one thing about your business with AI, what would it be?', 402),
    (client_id, 'ai_goals', 'AI & Automation Goals', 'What does success look like for this project? How will you measure ROI?', 403);

END $$;

