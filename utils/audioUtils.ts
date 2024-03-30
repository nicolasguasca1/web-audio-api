// utils/audioUtils.ts

let recognitionActive = false; // Flag to track recognition status

export const processAudio = async (audioFile: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    if (recognitionActive) {
      reject(new Error("Recognition is already active."));
      return;
    }

    recognitionActive = true; // Set recognition as active

    const audioContext = new AudioContext();
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const audioBuffer = await audioContext.decodeAudioData(
          reader.result as ArrayBuffer
        );
        const recognizer = new (window.SpeechRecognition ||
          window.webkitSpeechRecognition)();

        recognizer.lang = "es-ES";
        recognizer.interimResults = true;
        recognizer.maxAlternatives = 1;
        console.log("entered");

        recognizer.onresult = (event) => {
          let transcript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              console.log(event.results[i]);
              transcript += event.results[i][0].transcript;
            }
          }
          resolve(transcript);
        };

        recognizer.onerror = (event) => {
          recognitionActive = false; // Reset recognition status
          reject(event.error);
        };

        recognizer.onend = () => {
          recognitionActive = false; // Reset recognition status
        };

        const audioSource = audioContext.createBufferSource();
        audioSource.buffer = audioBuffer;

        recognizer.start();
      } catch (error) {
        recognitionActive = false; // Reset recognition status
        reject(error);
      }
    };

    reader.onerror = () => {
      recognitionActive = false; // Reset recognition status
      reject(new Error("Failed to read file."));
    };

    reader.readAsArrayBuffer(audioFile);
  });
};
