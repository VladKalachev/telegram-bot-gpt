import OpenAI from 'openai';
import config from 'config';
import { createReadStream } from 'fs'
class OpenAi {
  roles = {
    ASSISTANT: 'assistant',
    USER: 'user',
    SYSTEM: 'system',
  }

  constructor(apiKey) {
    this.openai = new OpenAI({
      apiKey,
    });
  }

  async chat(messages) {
    try {
      const response = await this.openai.chat.completions({
        module: 'gpt-3.5-turbo',
        messages
      });
      return response.data.choices[0].message;
    } catch (error) {
      console.log('Error while chat', error.message);
    }
  }

  async transcription(filepath) {
    try {
      const response = await this.openai.audio.transcriptions.create({
        file: createReadStream(filepath),
        model: 'whisper-1'
      });
      return response.data.text;
    } catch (error) {
      console.log('Error while transcription', error.message);
    }
  }
}

export const openai = new OpenAi(config.get('OPENAI_API_KEY'));