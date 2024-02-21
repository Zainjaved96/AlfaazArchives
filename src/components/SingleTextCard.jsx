import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const SingleTextCard = (props) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(props.text)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000); // Reset after 3 seconds
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{props.text}</Card.Title>
          
          <Button  className='mt-auto'
            variant={isCopied ? "success" : "primary"} 
            onClick={handleCopy}
          >
            {isCopied ? "Copied!" : "Copy"}
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default SingleTextCard;
