-- Create Dan Caufield Client with Credential Requests
-- Username: clientdan
-- Password: 123456

-- Insert the client user
INSERT INTO users (role, name, email, username, password, company_name)
VALUES ('client', 'Dan Caufield', 'me@dancaufield.com', 'clientdan', '123456', 'HQ Group')
ON CONFLICT (username) DO UPDATE 
SET name = EXCLUDED.name, email = EXCLUDED.email, company_name = EXCLUDED.company_name;

-- Get the client's user ID and create credential requests
DO $$
DECLARE
    client_id INTEGER;
BEGIN
    SELECT id INTO client_id FROM users WHERE username = 'clientdan';

    -- ============================================================
    -- CREDENTIAL REQUESTS
    -- ============================================================
    
    INSERT INTO client_api_credentials (
        client_id, 
        system_name, 
        system_category, 
        display_name, 
        description, 
        priority, 
        status, 
        setup_instructions, 
        estimated_time_minutes
    )
    VALUES 
    -- 1) Google Cloud Console – API access for Gmail, Drive, and Calendar
    (client_id, 
     'google_cloud_console', 
     'productivity', 
     'Google Cloud Console – API access for Gmail, Drive, and Calendar', 
     'Give Danny access to a Google Cloud project so he can connect Gmail, Drive, and Calendar via APIs.

Step 1 – Sign in and create (or choose) a project

Go to: https://console.cloud.google.com

Sign in with your company Google Workspace admin account.

At the top left, click the Project dropdown.

Either:
• Select an existing project you want to use, or
• Click New Project, name it (e.g., "AI Platform Integration"), and click Create.

Step 2 – Add Danny as a project member

With the correct project selected, click the ☰ (hamburger menu) in the top left.

Go to IAM & Admin → IAM.

Click Grant access / Add.

In New principals, enter: danny@nbrain.ai

In Roles, add:
• Viewer (or Editor if you''re comfortable), and
• Service Account Admin (or at least enough permissions to create and manage service accounts).

Click Save.

Step 3 – Enable required APIs

Still in the same project:

Go to APIs & Services → Library.

Enable the following APIs (search each by name and click Enable):
• Gmail API
• Google Drive API
• Google Calendar API

Once these are enabled, Danny can configure the correct OAuth / service accounts on his side.',
     'critical', 
     'pending', 
     'Follow the steps to add danny@nbrain.ai to your Google Cloud project and enable Gmail, Drive, and Calendar APIs.', 
     20),

    -- 2) Render.com – Add Danny as an admin
    (client_id, 
     'render_com', 
     'infrastructure', 
     'Render.com – Add Danny as an admin', 
     'Give Danny admin access to your Render account so he can deploy and manage services.

Step 1 – Sign up / sign in

Go to: https://render.com

Sign up with your company email if you don''t already have an account, or sign in.

Step 2 – Create or open your team

In Render, create a Team (if you don''t already have one).

Go to the Team Settings or Members section.

Step 3 – Invite Danny as an admin

Click Invite Member (or similar button).

Enter Danny''s email: danny@nbrain.ai

Choose role: Admin (or equivalent highest level you''re comfortable with).

Send the invite.

Danny will accept it from his email.',
     'critical', 
     'pending', 
     'Invite danny@nbrain.ai to your Render team with Admin access.', 
     10),

    -- 3) OpenAI API – Create API keys (or share project)
    (client_id, 
     'openai_api', 
     'ai_services', 
     'OpenAI API – Create API keys', 
     'Create an OpenAI account for your company and either give Danny access or share an API key.

Option A – Give Danny access (preferred, if you use Teams/Enterprise)

Go to: https://platform.openai.com

Sign up or sign in with your company email.

If using a Team/Organization:
• Go to Settings → Members (or similar).
• Invite danny@nbrain.ai with a role that allows managing API keys / projects.

Option B – Generate and share an API key

Sign in at https://platform.openai.com

Go to Dashboard → API Keys (or View API keys).

Click Create new secret key.

Give it a name like "AI Platform – Danny."

Copy the key once (you won''t see it again).

Send the API key to Danny securely (preferably via a secure password manager / encrypted message, not regular email if you can avoid it).',
     'critical', 
     'pending', 
     'Either invite danny@nbrain.ai to your OpenAI organization or create and share an API key securely.', 
     15),

    -- 4) Claude API (Anthropic) – Create and share key
    (client_id, 
     'claude_api', 
     'ai_services', 
     'Claude API (Anthropic) – Create and share key', 
     'Set up an Anthropic (Claude) account and provide API access.

Go to: https://console.anthropic.com

Sign up with your company email and complete any billing setup if needed.

Once signed in, go to API Keys.

Click Create Key.

Name it something like "AI Platform – Danny."

Copy the key and send it securely to Danny.

(If Anthropic supports team members / org users in your plan, you can also invite danny@nbrain.ai directly and let him create/manage keys.)',
     'critical', 
     'pending', 
     'Create a Claude API key and share it securely with danny@nbrain.ai, or invite him to your Anthropic account.', 
     10),

    -- 5) Pinecone – Vector database account & API access
    (client_id, 
     'pinecone', 
     'ai_services', 
     'Pinecone – Vector database account & API access', 
     'Create a Pinecone account and either invite Danny or send API keys.

Step 1 – Sign up

Go to: https://www.pinecone.io

Click Start for free / Sign up and create an account with your company email.

Step 2 – Create a project

After signing in, create a Project or Environment (Pinecone''s UI wording may vary a bit).

This is where the vector indexes will live.

Step 3 – Get API key

In the Pinecone console, go to API Keys.

Create a new key (e.g., "AI Platform – Danny").

Copy the API key and the Environment/Region info.

Send these to Danny securely.

(If Pinecone allows team members in your plan, you can also invite danny@nbrain.ai inside the account, with permissions to manage projects and keys.)',
     'high', 
     'pending', 
     'Create a Pinecone account, set up a project, and share API key + environment info with danny@nbrain.ai.', 
     15),

    -- 6) GitHub – Create org/repo and grant admin to danny-nbrain
    (client_id, 
     'github', 
     'development', 
     'GitHub – Create org/repo and grant admin to danny-nbrain', 
     'Give Danny admin-level access to your GitHub organization or repository.

Step 1 – Sign up / sign in

Go to: https://github.com

Sign in with your company GitHub account (or create one).

Step 2 – Create an organization (if you don''t have one)

Click your profile picture (top-right) → Your organizations → New organization.

Follow the steps to set up the organization for your company.

Step 3 – Add Danny as an owner/admin

In your organization, go to People (or Members).

Click Invite member.

Enter GitHub username: danny-nbrain

Select role:
• Owner (full org-level admin), or
• Member plus admin rights on specific repos.

Send the invite.

Step 4 – (Optional) Add him to specific repos with admin rights

If you prefer per-repo control:

Go to the repo in your organization.

Click Settings → Collaborators & teams.

Add danny-nbrain as a collaborator.

Set Permission to Admin.

Save.',
     'high', 
     'pending', 
     'Invite danny-nbrain to your GitHub organization with Owner or Admin access.', 
     15);

END $$;

