'use client'
import { useEffect } from 'react'

export const TypebotBubble = () => {
    useEffect(() => {
        const typebotInitScript = document.createElement("script");
        typebotInitScript.type = "module";
        typebotInitScript.innerHTML = `import Typebot from 'https://cdn.jsdelivr.net/npm/@typebot.io/js@0/dist/web.js'

    Typebot.initBubble({
      typebot: "fgcexpertise",
      apiHost: "https://chat.rafaelornelas.cloud",
      previewMessage: {
        message: "Reponda o questionário",
        avatarUrl:
          "data:image/svg+xml;utf8,<svg fill='%23fffedb' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 512'><path d='M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z'/></svg>",
      autoShowDelay: 1000,
      },
      theme: {
        button: { backgroundColor: "#f59e0b" },
        chatWindow: { backgroundColor: "#211A60" },
      },
    });`;

        document.body.append(typebotInitScript);

        // Cleanup para não duplicar se a página recarregar
        return () => {
            document.body.removeChild(typebotInitScript);
        }
    }, [])

    return null
}