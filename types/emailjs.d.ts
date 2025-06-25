declare namespace emailjs {
  interface EmailJSResponseStatus {
    status: number;
    text: string;
  }
  
  interface EmailJSInit {
    publicKey: string;
  }
  
  function init(options: EmailJSInit): void;
  
  function send(
    serviceID: string,
    templateID: string,
    templateParams: Record<string, unknown>,
    publicKey?: string,
  ): Promise<EmailJSResponseStatus>;
}

export = emailjs;
export as namespace emailjs;
