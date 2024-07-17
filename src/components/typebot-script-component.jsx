import { useEffect } from 'react';
import { BaseUrlTypeBotViewer } from 'src/constants';

const TypebotComponent = ({ typebotId }) => {

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://cdn.jsdelivr.net/npm/@typebot.io/js@0.2.85/dist/web.js';
    document.body.appendChild(script);

    script.onload = () => {
      window.Typebot.initStandard({
        apiHost: BaseUrlTypeBotViewer,
        typebot: typebotId,
      });
    }
  }, [typebotId]);

  return (
    <typebot-standard style={{ width: '100%', height: '700px' }}></typebot-standard>
  );
}

export default TypebotComponent;