
import { v4 as uuidv4 } from 'uuid';


// turns array from local storage into objects
export const migrateOldData = (oldData) => {
  return oldData.map(text => (
    createNewCopy(text)
  ));
};


export const loadTexts = () => {
    const savedTexts = localStorage.getItem('texts');
    let texts = savedTexts ? JSON.parse(savedTexts) : [];
  
    // Check if texts are in the old format (assuming old format is an array of strings)
    if (texts.length > 0 && typeof texts[0] === 'string') {
      texts = migrateOldData(texts);
      localStorage.setItem('texts', JSON.stringify(texts)); // Save migrated data
    }
  
    return texts;
  };


export const createNewCopy = (text,tag=null)=> {
    const newCopy = {
        text: text,
        id: uuidv4,
        tag: tag,
        created_at: new Date().toISOString()

    }
    return newCopy
}
