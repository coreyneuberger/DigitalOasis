import { saveAs} from 'file-saver';
import { randomPrompts } from '../constant';

export async function downloadImage(_id, photo) {
  saveAs(photo, `${_id}.jpg`);
}

export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * randomPrompts.length);
  const randomPrompt = randomPrompts[randomIndex];

  if (randomPrompt === prompt) {
    return getRandomPrompt(prompt);
  }

  return randomPrompt;
}