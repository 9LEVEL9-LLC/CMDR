import fs from 'fs';
import path from 'path';

export const metadata = {
  title: 'Launch Your Property Management Consulting Practice the Right Way',
  description: 'AI-Powered Property Management Consulting Launch Partnership Proposal for Aryn Thomez',
};

export default function ArynThomezProposal() {
  // Read the HTML file
  const htmlPath = path.join(process.cwd(), 'public', 'aryn-thomez-business-launch-proposal.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  // Extract just the body content (between <body> and </body>)
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const bodyContent = bodyMatch ? bodyMatch[1] : '';
  
  // Extract the styles
  const styleMatch = htmlContent.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  const styles = styleMatch ? styleMatch[1] : '';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
    </>
  );
}
