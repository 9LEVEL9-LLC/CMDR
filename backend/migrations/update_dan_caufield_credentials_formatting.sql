-- Update Dan Caufield's Credential Request Instructions with Better Formatting
-- Individual lines instead of clumped paragraphs

DO $$
DECLARE
    dan_client_id INTEGER;
BEGIN
    SELECT id INTO dan_client_id FROM users WHERE username = 'clientdan';

    -- Update Google Cloud Console
    UPDATE client_api_credentials 
    SET description = 'Give Danny access to a Google Cloud project so he can connect Gmail, Drive, and Calendar via APIs.

📋 STEP 1 – Sign in and create (or choose) a project

• Go to: https://console.cloud.google.com
• Sign in with your company Google Workspace admin account
• At the top left, click the Project dropdown
• Either:
  - Select an existing project you want to use, OR
  - Click New Project, name it (e.g., "AI Platform Integration"), and click Create

📋 STEP 2 – Add Danny as a project member

• With the correct project selected, click the ☰ (hamburger menu) in the top left
• Go to IAM & Admin → IAM
• Click Grant access / Add
• In New principals, enter: danny@nbrain.ai
• In Roles, add:
  - Viewer (or Editor if you''re comfortable), AND
  - Service Account Admin (or at least enough permissions to create and manage service accounts)
• Click Save

📋 STEP 3 – Enable required APIs

• Still in the same project
• Go to APIs & Services → Library
• Enable the following APIs (search each by name and click Enable):
  - Gmail API
  - Google Drive API
  - Google Calendar API

✅ Once these are enabled, Danny can configure the correct OAuth / service accounts on his side.'
    WHERE client_id = dan_client_id AND system_name = 'google_cloud_console';

    -- Update Render.com
    UPDATE client_api_credentials 
    SET description = 'Give Danny admin access to your Render account so he can deploy and manage services.

📋 STEP 1 – Sign up / sign in

• Go to: https://render.com
• Sign up with your company email if you don''t already have an account, or sign in

📋 STEP 2 – Create or open your team

• In Render, create a Team (if you don''t already have one)
• Go to the Team Settings or Members section

📋 STEP 3 – Invite Danny as an admin

• Click Invite Member (or similar button)
• Enter Danny''s email: danny@nbrain.ai
• Choose role: Admin (or equivalent highest level you''re comfortable with)
• Send the invite

✅ Danny will accept it from his email.'
    WHERE client_id = dan_client_id AND system_name = 'render_com';

    -- Update OpenAI API
    UPDATE client_api_credentials 
    SET description = 'Create an OpenAI account for your company and either give Danny access or share an API key.

📋 OPTION A – Give Danny access (preferred, if you use Teams/Enterprise)

• Go to: https://platform.openai.com
• Sign up or sign in with your company email
• If using a Team/Organization:
  - Go to Settings → Members (or similar)
  - Invite danny@nbrain.ai with a role that allows managing API keys / projects

📋 OPTION B – Generate and share an API key

• Sign in at https://platform.openai.com
• Go to Dashboard → API Keys (or View API keys)
• Click Create new secret key
• Give it a name like "AI Platform – Danny"
• Copy the key once (you won''t see it again)
• Send the API key to Danny securely:
  - Preferably via a secure password manager / encrypted message
  - NOT regular email if you can avoid it

✅ Either option works – whichever you prefer!'
    WHERE client_id = dan_client_id AND system_name = 'openai_api';

    -- Update Claude API
    UPDATE client_api_credentials 
    SET description = 'Set up an Anthropic (Claude) account and provide API access.

📋 STEP 1 – Sign up

• Go to: https://console.anthropic.com
• Sign up with your company email
• Complete any billing setup if needed

📋 STEP 2 – Create API key

• Once signed in, go to API Keys
• Click Create Key
• Name it something like "AI Platform – Danny"
• Copy the key and send it securely to Danny

💡 ALTERNATIVE: If Anthropic supports team members / org users in your plan, you can also invite danny@nbrain.ai directly and let him create/manage keys.

✅ Send the key via secure password manager or encrypted message (not regular email).'
    WHERE client_id = dan_client_id AND system_name = 'claude_api';

    -- Update Pinecone
    UPDATE client_api_credentials 
    SET description = 'Create a Pinecone account and either invite Danny or send API keys.

📋 STEP 1 – Sign up

• Go to: https://www.pinecone.io
• Click Start for free / Sign up
• Create an account with your company email

📋 STEP 2 – Create a project

• After signing in, create a Project or Environment
  (Pinecone''s UI wording may vary a bit)
• This is where the vector indexes will live

📋 STEP 3 – Get API key

• In the Pinecone console, go to API Keys
• Create a new key (e.g., "AI Platform – Danny")
• Copy the API key and the Environment/Region info
• Send these to Danny securely

💡 ALTERNATIVE: If Pinecone allows team members in your plan, you can also invite danny@nbrain.ai inside the account with permissions to manage projects and keys.

✅ Either share the API key + environment info OR invite Danny directly.'
    WHERE client_id = dan_client_id AND system_name = 'pinecone';

    -- Update GitHub
    UPDATE client_api_credentials 
    SET description = 'Give Danny admin-level access to your GitHub organization or repository.

📋 STEP 1 – Sign up / sign in

• Go to: https://github.com
• Sign in with your company GitHub account (or create one)

📋 STEP 2 – Create an organization (if you don''t have one)

• Click your profile picture (top-right) → Your organizations → New organization
• Follow the steps to set up the organization for your company

📋 STEP 3 – Add Danny as an owner/admin

• In your organization, go to People (or Members)
• Click Invite member
• Enter GitHub username: danny-nbrain
• Select role:
  - Owner (full org-level admin), OR
  - Member plus admin rights on specific repos
• Send the invite

📋 STEP 4 (Optional) – Add him to specific repos with admin rights

If you prefer per-repo control:
• Go to the repo in your organization
• Click Settings → Collaborators & teams
• Add danny-nbrain as a collaborator
• Set Permission to Admin
• Save

✅ Danny will accept the GitHub invitation from his email.'
    WHERE client_id = dan_client_id AND system_name = 'github';

END $$;

