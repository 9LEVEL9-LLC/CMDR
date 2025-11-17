#!/bin/bash
# Add mock communications and scheduling for Matt Meuli
# Run this AFTER seed-matt-meuli-ecosystem.sh

psql $DATABASE_URL << 'EOF'
-- Get Matt's IDs
DO $$
DECLARE
  matt_id INT;
  project_id INT;
  advisor_id INT;
BEGIN
  SELECT id INTO matt_id FROM users WHERE username = 'mattmeuli';
  SELECT id INTO project_id FROM projects WHERE client_id = matt_id LIMIT 1;
  SELECT id INTO advisor_id FROM users WHERE role = 'advisor' LIMIT 1;
  
  -- ===========================================
  -- PROJECT COMMUNICATIONS
  -- ===========================================
  
  -- Initial project kickoff message from advisor
  INSERT INTO project_messages (project_id, user_id, content, created_at) VALUES
    (project_id, advisor_id, 
     'Hi Matt! Welcome to the CMDR AI platform. I''m excited to work with you on the Legal Platform AI Integration project. 

I''ve set up your onboarding dashboard with everything we need to get started:

**Phase 1 - Discovery & Planning:**
- Team contacts and points of contact
- System access and API credentials
- Strategic questions about your practice
- Documentation gathering

Please take some time to review the onboarding tabs and start filling in the information. Don''t hesitate to reach out if you have any questions!

Looking forward to transforming your legal practice with AI! 🚀',
     NOW() - INTERVAL '3 days');
  
  -- Matt's response
  INSERT INTO project_messages (project_id, user_id, content, created_at) VALUES
    (project_id, matt_id,
     'Thanks for the warm welcome! I''ve been reviewing the onboarding materials and I''m impressed with how thorough the process is.

I have a few quick questions:
1. For the Google Workspace API access, should we create a dedicated service account or use an existing one?
2. I see you''re asking about our Clio integration - we have some custom workflows there. Should I document those separately?
3. What''s the typical timeline for Phase 1?

I''ll start filling out the team contacts today. Sarah Chen (our IT Director) will be handling most of the technical credential setup.',
     NOW() - INTERVAL '2 days' - INTERVAL '6 hours');
  
  -- Advisor's detailed response
  INSERT INTO project_messages (project_id, user_id, content, created_at) VALUES
    (project_id, advisor_id,
     'Great questions, Matt! Let me address each one:

**1. Google Workspace API:**
Yes, we recommend creating a dedicated service account for our integration. This gives us:
- Better security isolation
- Easier audit trails
- No impact if team member credentials change
Sarah will need domain-wide delegation rights to set this up.

**2. Clio Custom Workflows:**
Absolutely! Please document those custom workflows separately. You can add them as notes in the API Credentials section, or even better - upload a process document in the Documentation tab. Understanding your existing workflows is crucial for a smooth integration.

**3. Phase 1 Timeline:**
Typically 2-3 weeks, but it''s flexible based on your availability. The key milestones are:
- Week 1: Team contacts, credential setup, initial discovery
- Week 2: Strategic questions answered, documentation gathered
- Week 3: Technical integration planning, architecture review

Let me know if Sarah needs any technical guidance for the API setups. I''m here to help! 👍',
     NOW() - INTERVAL '2 days');
  
  -- Matt's update
  INSERT INTO project_messages (project_id, user_id, content, created_at) VALUES
    (project_id, matt_id,
     'Perfect, that timeline works well for us. Sarah has started on the Google Workspace setup - should have those credentials by end of week.

I''ve filled out the strategic questions in the onboarding section. Some highlights:
- We''re processing about 50-75 new client intakes per month
- Document generation is our biggest bottleneck (20-30 hours/week)
- Our knowledge base has 500+ legal templates that need better organization

Quick question: For the "magic wand" question about AI - I mentioned wanting automated client intake and document generation. Is that something we can tackle in Phase 1 or is that a Phase 2 item?',
     NOW() - INTERVAL '1 day' - INTERVAL '12 hours');
  
  -- Advisor's strategic response
  INSERT INTO project_messages (project_id, user_id, content, created_at) VALUES
    (project_id, advisor_id,
     'Excellent progress, Matt! Those metrics are super helpful.

**Re: Automated Intake & Document Generation:**
Great news - this is absolutely achievable, and we can start building the foundation in Phase 1:

**Phase 1 (Weeks 1-3):**
- Map your current intake workflow
- Analyze your 500+ templates for patterns
- Build data models for client information
- Design the document automation architecture

**Quick Win (Week 2-3):**
We can start with 5-10 of your most common templates and automate those first. This gives you immediate ROI while we build out the full system.

**Phase 2 (Weeks 4-8):**
- Full document automation engine
- Client intake portal with AI assistance
- Template management system
- Integration with Clio for seamless workflow

The 20-30 hours/week you mentioned on document generation? We should be able to reduce that by 70-80% within 6 weeks. 

Would you like to hop on a call this week to prioritize which templates to tackle first?',
     NOW() - INTERVAL '1 day' - INTERVAL '6 hours');
  
  -- Matt's enthusiastic response
  INSERT INTO project_messages (project_id, user_id, content, created_at) VALUES
    (project_id, matt_id,
     'That sounds incredible! A 70-80% reduction would be transformative for our practice. 

Yes, let''s definitely schedule a call to prioritize templates. I''m thinking we start with:
1. LLC Formation Documents (our most common service)
2. Operating Agreements 
3. Asset Protection Trust Templates
4. Client Intake Questionnaires
5. Estate Planning Worksheets

These 5 probably account for 60% of our document volume.

I''ll have David Thompson (our Senior Legal Counsel) join the call - he knows our template library inside and out.

When works for you? I''m flexible this week except Thursday afternoon.',
     NOW() - INTERVAL '16 hours');
  
  -- Advisor confirms
  INSERT INTO project_messages (project_id, user_id, content, created_at) VALUES
    (project_id, advisor_id,
     'Perfect! That''s an excellent starting set - high volume means high impact. 

**Let''s schedule for Tuesday at 2pm MST** - does that work for you and David?

I''ll send a calendar invite shortly. Come prepared with:
- Examples of each template type
- Notes on what typically varies between clients
- Pain points in the current process
- Any compliance/security requirements for Wyoming law

Looking forward to it! This is going to be a game-changer for Meuli & Associates. 🎯',
     NOW() - INTERVAL '12 hours');
  
  -- Matt's confirmation
  INSERT INTO project_messages (project_id, user_id, content, created_at) VALUES
    (project_id, matt_id,
     'Tuesday 2pm MST works perfectly! Calendar invite accepted.

David and I will gather those materials. Sarah also wants to join to discuss the technical integration points.

One more thing - I saw in the ecosystem documentation that you mentioned RAG (Retrieval-Augmented Generation) patterns. Is that something we''ll be using for our knowledge base? I''d love to learn more about how that works with legal content.

See you Tuesday! 👍',
     NOW() - INTERVAL '6 hours');
  
  -- ===========================================
  -- SCHEDULE REQUESTS / MEETINGS
  -- ===========================================
  
  -- Initial discovery call (completed)
  INSERT INTO schedule_requests (
    client_id, advisor_id, time_slot, meeting_description, status, created_at
  ) VALUES (
    matt_id, advisor_id,
    'Monday, Nov 18, 2024 - 10:00am MST',
    'Initial Discovery Call - Project Overview and Goals',
    'completed',
    NOW() - INTERVAL '5 days'
  );
  
  -- Upcoming template prioritization call
  INSERT INTO schedule_requests (
    client_id, advisor_id, time_slot, meeting_description, status, created_at
  ) VALUES (
    matt_id, advisor_id,
    'Tuesday, Nov 26, 2024 - 2:00pm MST',
    'Template Prioritization Workshop - Matt, David Thompson, Sarah Chen',
    'confirmed',
    NOW() - INTERVAL '6 hours'
  );
  
  -- Planned technical integration review
  INSERT INTO schedule_requests (
    client_id, advisor_id, time_slot, meeting_description, status, created_at
  ) VALUES (
    matt_id, advisor_id,
    'Thursday, Nov 28, 2024 - 11:00am MST',
    'Technical Integration Review - API Credentials & System Architecture',
    'pending',
    NOW() - INTERVAL '3 hours'
  );
  
  -- Weekly check-in (recurring)
  INSERT INTO schedule_requests (
    client_id, advisor_id, time_slot, meeting_description, status, created_at
  ) VALUES (
    matt_id, advisor_id,
    'Every Monday - 9:00am MST',
    'Weekly Progress Check-in - 30 minutes',
    'confirmed',
    NOW() - INTERVAL '4 days'
  );
  
  RAISE NOTICE 'Matt Meuli communications and scheduling seeded!';
END $$;

-- Verification
SELECT 'Project Messages Created:' as summary, COUNT(*)::text as count
FROM project_messages pm
JOIN projects p ON p.id = pm.project_id
WHERE p.client_id = (SELECT id FROM users WHERE username = 'mattmeuli');

SELECT 'Schedule Requests Created:' as summary, COUNT(*)::text as count
FROM schedule_requests
WHERE client_id = (SELECT id FROM users WHERE username = 'mattmeuli');
EOF

echo ""
echo "✅ Matt Meuli communications and scheduling seeded!"
echo ""
echo "Summary:"
echo "- Project Messages: 9 messages (conversation thread)"
echo "- Schedule Requests: 4 meetings (1 completed, 2 confirmed, 1 pending)"
echo ""

