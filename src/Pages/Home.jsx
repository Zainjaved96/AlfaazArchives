import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import AllTextCards from '../components/AllTextCards';
import { loadTexts } from '../utils/textUtlis';
import { createNewCopy } from '../utils/textUtlis';

const Home = () => {

    const [inputText, setInputText] = useState('');
    const [tag, setTagText] = useState(null)
    const [texts, setTexts] = useState(loadTexts());
    console.log(texts)
    const [hasCopiedAll, setHasCopiedAll] = useState(false);
    const [hasDeletedAll, setHasDeletedAll] = useState(false)

    useEffect(() => {
        // Save texts to local storage
        localStorage.setItem('texts', JSON.stringify(texts));
    }, [texts]);

    const handleInput = (e) => {
        setInputText(e.target.value);
    };

    const handleAddText = () => {
        if (inputText.trim() !== '') {
            const newcopy = createNewCopy(inputText, tag)
            setTexts([...texts,newcopy ]);
            setInputText('');
            setTagText(null)
        }
    };

    const handleDeleteText = (id) => {
        const updatedTexts = texts.filter(text => text.id !== id);
        setTexts(updatedTexts);
        // Also update localStorage if you're storing texts there
        localStorage.setItem('texts', JSON.stringify(updatedTexts));
      };

    const handleDeleteAll = () => {
      setTexts([]);
      localStorage.removeItem('texts');
      setHasDeletedAll(true)
      setTimeout(() => setHasDeletedAll(false), 3000);
  };

  const handleCopyAll = async () => {
    // Adding copies one by one. 
    for (const text of texts) {
      await navigator.clipboard.writeText(text)
          .then(() => console.log(`Copied: ${text}`))
          .catch(err => console.error('Failed to copy text: ', err));

      await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for 1 second
  }
   setHasCopiedAll(true)
   setTimeout(setHasCopiedAll(true), 300)
   
};


    return (
        <>
            <Header />
            <Container className='py-3'>
                <Card className='mx-auto col-10 col-md-8 py-3'>
                    <Card.Body>
                        <Card.Title>Welcome to AlfaazArchives!</Card.Title>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control value={inputText} onChange={handleInput} as="textarea" rows={3} />
                        </Form.Group>
                        <Card.Text>
                            Quickly Save your text, copies, quotes tokens, codes and access them in a second.
                        </Card.Text>
                        <Button variant="primary" onClick={handleAddText}>Add</Button>
                    </Card.Body>
                </Card>
            </Container>
            <AllTextCards
             texts={texts} 
             onDeleteAll={handleDeleteAll}
             onCopyAll={handleCopyAll} 
             hasDeletedAll={hasDeletedAll}
             hasCopiedAll={hasCopiedAll}
             handleDeleteText={handleDeleteText}
              />
        </>
    );
}

export default Home;
