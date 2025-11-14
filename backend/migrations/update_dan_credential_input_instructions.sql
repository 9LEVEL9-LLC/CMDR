-- Update Dan Caufield's Credential Input Instructions
-- Allow clients to paste credentials OR confirm they provided access

DO $$
DECLARE
    dan_client_id INTEGER;
BEGIN
    SELECT id INTO dan_client_id FROM users WHERE username = 'clientdan';

    -- Update setup_instructions for each credential
    
    -- Google Cloud Console
    UPDATE client_api_credentials 
    SET setup_instructions = '📝 WHEN COMPLETE: Either paste the project details (Project ID, Project Name) here, OR simply confirm you''ve added danny@nbrain.ai to your Google Cloud project with the required permissions.'
    WHERE client_id = dan_client_id AND system_name = 'google_cloud_console';

    -- Render.com
    UPDATE client_api_credentials 
    SET setup_instructions = '📝 WHEN COMPLETE: Simply confirm you''ve sent the team invitation to danny@nbrain.ai with Admin access.'
    WHERE client_id = dan_client_id AND system_name = 'render_com';

    -- OpenAI API
    UPDATE client_api_credentials 
    SET setup_instructions = '📝 WHEN COMPLETE: Either paste the API key here (if using Option B), OR confirm you''ve invited danny@nbrain.ai to your OpenAI organization (if using Option A).'
    WHERE client_id = dan_client_id AND system_name = 'openai_api';

    -- Claude API
    UPDATE client_api_credentials 
    SET setup_instructions = '📝 WHEN COMPLETE: Either paste the Claude API key here, OR confirm you''ve invited danny@nbrain.ai to your Anthropic account.'
    WHERE client_id = dan_client_id AND system_name = 'claude_api';

    -- Pinecone
    UPDATE client_api_credentials 
    SET setup_instructions = '📝 WHEN COMPLETE: Either paste the Pinecone API key and environment details here, OR confirm you''ve invited danny@nbrain.ai to your Pinecone account.'
    WHERE client_id = dan_client_id AND system_name = 'pinecone';

    -- GitHub
    UPDATE client_api_credentials 
    SET setup_instructions = '📝 WHEN COMPLETE: Simply confirm you''ve sent the GitHub organization invitation to danny-nbrain with Owner/Admin access.'
    WHERE client_id = dan_client_id AND system_name = 'github';

END $$;

